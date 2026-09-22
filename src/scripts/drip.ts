type DripEventName =
  'page_view' | 'product_view' | 'store_click' | 'link_click';

type DripEvent = {
  schema_version: 1;
  id: string;
  name: DripEventName;
  occurred_at: string;
  session_id: string;
  anonymous_id: string;
  attribution_id?: string;
  path: string;
  referrer_host?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  product?: string;
  destination?: 'app_store' | 'google_play' | 'direct' | 'other';
  properties: Record<string, string>;
};

const UUID_V7_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ATTRIBUTION_ID_KEY = 'drip_attribution_id_v1';
const MAX_CAMPAIGN_VALUE_LENGTH = 128;
const INTERNAL_HOSTS = new Set(['willopc.com', 'now.willopc.com']);
const X_REFERRER_HOSTS = new Set([
  'x.com',
  'www.x.com',
  'twitter.com',
  'www.twitter.com',
  'mobile.twitter.com',
  't.co',
]);

type AttributionContext = {
  attribution_id?: string;
  referrer_host?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
};

function uuidV7(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const timestamp = BigInt(Date.now());

  bytes[0] = Number((timestamp >> 40n) & 0xffn);
  bytes[1] = Number((timestamp >> 32n) & 0xffn);
  bytes[2] = Number((timestamp >> 24n) & 0xffn);
  bytes[3] = Number((timestamp >> 16n) & 0xffn);
  bytes[4] = Number((timestamp >> 8n) & 0xffn);
  bytes[5] = Number(timestamp & 0xffn);
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function storedId(storage: Storage | null, key: string): string {
  if (!storage) return uuidV7();
  try {
    const existing = storage.getItem(key);
    if (existing && UUID_V7_PATTERN.test(existing)) return existing;
    const created = uuidV7();
    storage.setItem(key, created);
    return created;
  } catch {
    return uuidV7();
  }
}

function campaignValue(url: URL, name: string): string | undefined {
  const value = url.searchParams.get(name)?.trim().toLowerCase();
  return value ? value.slice(0, MAX_CAMPAIGN_VALUE_LENGTH) : undefined;
}

function canonicalSource(value: string): string {
  const normalized = value.toLowerCase();
  return ['x', 'x.com', 'twitter', 'twitter.com', 't.co'].includes(normalized)
    ? 'x'
    : normalized;
}

function sourceFromReferrerHost(host: string): string {
  // Keep every unknown referrer recognizable by its normalized hostname.
  return X_REFERRER_HOSTS.has(host) ? 'x' : host;
}

function externalReferrer(): { host: string; source: string } | undefined {
  if (!document.referrer) return undefined;
  try {
    const referrer = new URL(document.referrer);
    const host = referrer.hostname.toLowerCase().replace(/\.$/, '');
    if (!host || INTERNAL_HOSTS.has(host)) return undefined;
    return { host, source: sourceFromReferrerHost(host) };
  } catch {
    return undefined;
  }
}

function attributionId(
  storage: Storage | null,
  hasAcquisitionSignal: boolean,
): string | undefined {
  if (!hasAcquisitionSignal) return undefined;
  if (storage) {
    try {
      const existing = storage.getItem(ATTRIBUTION_ID_KEY);
      if (existing && UUID_V7_PATTERN.test(existing)) return existing;
    } catch {
      // Continue with an in-memory attribution ID for this page.
    }
  }
  const created = uuidV7();
  try {
    storage?.setItem(ATTRIBUTION_ID_KEY, created);
  } catch {
    // A blocked session storage area must not prevent analytics.
  }
  return created;
}

function readAttributionContext(
  storage: Storage | null,
): AttributionContext {
  const landingUrl = new URL(window.location.href);
  const referrer = externalReferrer();
  const utmSource = campaignValue(landingUrl, 'utm_source');
  const utmMedium = campaignValue(landingUrl, 'utm_medium');
  const source = utmSource ? canonicalSource(utmSource) : undefined;
  const hasAcquisitionSignal = Boolean(source || referrer);

  return {
    attribution_id: attributionId(storage, hasAcquisitionSignal),
    ...(referrer ? { referrer_host: referrer.host } : {}),
    ...(source || referrer
      ? { source: source ?? referrer?.source }
      : {}),
    ...(utmMedium || referrer
      ? { medium: utmMedium ?? 'referral' }
      : {}),
    ...(campaignValue(landingUrl, 'utm_campaign')
      ? { campaign: campaignValue(landingUrl, 'utm_campaign') }
      : {}),
    ...(campaignValue(landingUrl, 'utm_content')
      ? { content: campaignValue(landingUrl, 'utm_content') }
      : {}),
  };
}

function startDrip(): void {
  if (!import.meta.env.PROD) return;

  const endpoint = document.body.dataset.dripEndpoint;
  const writeKey = document.body.dataset.dripWriteKey;
  if (!endpoint || !writeKey) return;

  let persistentStorage: Storage | null = null;
  let sessionStorageArea: Storage | null = null;
  try {
    persistentStorage = window.localStorage;
  } catch {
    // Private browsing modes may deny access to local storage.
  }
  try {
    sessionStorageArea = window.sessionStorage;
  } catch {
    // Continue with in-memory IDs when session storage is unavailable.
  }
  const anonymousId = storedId(persistentStorage, 'drip_anonymous_id_v1');
  const sessionId = storedId(sessionStorageArea, 'drip_session_id_v1');
  const attribution = readAttributionContext(sessionStorageArea);
  const path = window.location.pathname;
  const product = document.body.dataset.dripProduct;
  const pageTitle = document.body.dataset.dripPageTitle;

  const send = (event: DripEvent): void => {
    const body = JSON.stringify({ write_key: writeKey, events: [event] });

    try {
      if (
        navigator.sendBeacon(
          endpoint,
          new Blob([body], { type: 'text/plain;charset=UTF-8' }),
        )
      ) {
        return;
      }
    } catch {
      // Fall back to fetch when Beacon is unavailable or rejects the request.
    }

    try {
      void fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'omit',
      }).catch(() => undefined);
    } catch {
      // Analytics must never affect navigation or page interaction.
    }
  };

  const eventBase = () => ({
    schema_version: 1 as const,
    occurred_at: new Date().toISOString(),
    session_id: sessionId,
    anonymous_id: anonymousId,
    ...attribution,
    path,
  });

  send({
    ...eventBase(),
    id: uuidV7(),
    name: 'page_view',
    properties: pageTitle ? { page_title: pageTitle } : {},
  });

  if (product) {
    send({
      ...eventBase(),
      id: uuidV7(),
      name: 'product_view',
      product,
      properties: {},
    });
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>(
      'a[data-drip-placement]',
    );
    const placement = link?.dataset.dripPlacement?.trim();
    if (!link || !placement) return;

    const linkProduct = link.dataset.dripProduct || undefined;
    const destination = link.dataset.dripDestination as
      DripEvent['destination'] | undefined;
    const eventName: DripEventName = destination ? 'store_click' : 'link_click';
    send({
      ...eventBase(),
      id: uuidV7(),
      name: eventName,
      ...(linkProduct ? { product: linkProduct } : {}),
      ...(destination ? { destination } : {}),
      properties: { placement },
    });
  });
}

startDrip();
