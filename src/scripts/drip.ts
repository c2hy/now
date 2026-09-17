type DripEventName =
  'page_view' | 'product_view' | 'store_click' | 'link_click';

type DripEvent = {
  schema_version: 1;
  id: string;
  name: DripEventName;
  occurred_at: string;
  session_id: string;
  anonymous_id: string;
  path: string;
  product?: string;
  destination?: 'app_store' | 'google_play' | 'direct' | 'other';
  properties: Record<string, string>;
};

const UUID_V7_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
