type DripEventName =
  'page_view' | 'product_view' | 'store_click' | 'link_click';
type Attribution = Partial<
  Record<
    | 'attribution_id'
    | 'referrer_host'
    | 'source'
    | 'medium'
    | 'campaign'
    | 'content',
    string
  >
>;
type Session = { id: string; last_activity: number; attribution: Attribution };
type DripEvent = Attribution & {
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
const SESSION_KEY = 'drip_session_v2';
const SESSION_TIMEOUT = 30 * 60 * 1000;
const INTERNAL_HOSTS = new Set(['willopc.com']);
const X_SOURCES = new Set([
  'x',
  'x.com',
  'www.x.com',
  'twitter',
  'twitter.com',
  'www.twitter.com',
  'mobile.twitter.com',
  't.co',
]);

function uuidV7(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const timestamp = BigInt(Date.now());
  for (let index = 0; index < 6; index += 1) {
    bytes[index] = Number((timestamp >> BigInt((5 - index) * 8)) & 0xffn);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function storage(kind: 'localStorage' | 'sessionStorage'): Storage | null {
  try {
    return window[kind];
  } catch {
    return null;
  }
}

function anonymousId(area: Storage | null): string {
  try {
    const existing = area?.getItem('drip_anonymous_id_v1');
    if (existing && UUID_V7_PATTERN.test(existing)) return existing;
  } catch {
    /* Storage can be denied independently of access to window.localStorage. */
  }
  const id = uuidV7();
  try {
    area?.setItem('drip_anonymous_id_v1', id);
  } catch {
    /* Use the in-memory ID. */
  }
  return id;
}

function canonicalSource(value: string): string {
  const lower = value.toLowerCase();
  return X_SOURCES.has(lower) ? 'x' : lower;
}

function acquisition(): Attribution | undefined {
  const url = new URL(location.href);
  const value = (name: string) =>
    url.searchParams.get(name)?.trim().slice(0, 128) || undefined;
  const source = value('utm_source');
  const medium = value('utm_medium');
  const campaign = value('utm_campaign');
  const content = value('utm_content');
  let host: string | undefined;
  try {
    const referrer = new URL(document.referrer);
    const candidate = referrer.hostname.toLowerCase().replace(/\.$/, '');
    if (
      ['http:', 'https:'].includes(referrer.protocol) &&
      candidate &&
      candidate.length <= 253 &&
      candidate !== location.hostname &&
      !INTERNAL_HOSTS.has(candidate)
    )
      host = candidate;
  } catch {
    /* Missing or invalid referrer. */
  }
  const hasUtm = Boolean(source || medium || campaign || content);
  if (!hasUtm && !host) return undefined;
  return {
    attribution_id: uuidV7(),
    ...(host ? { referrer_host: host } : {}),
    ...(source
      ? { source: canonicalSource(source) }
      : !hasUtm && host
        ? { source: canonicalSource(host) }
        : {}),
    ...(medium
      ? { medium: medium.toLowerCase() }
      : !hasUtm && host
        ? { medium: 'referral' }
        : {}),
    ...(campaign ? { campaign } : {}),
    ...(content ? { content } : {}),
  };
}

function readSession(area: Storage | null): Session {
  try {
    const saved = JSON.parse(area?.getItem(SESSION_KEY) || 'null');
    const age = Date.now() - saved?.last_activity;
    if (
      UUID_V7_PATTERN.test(saved?.id) &&
      Number.isFinite(age) &&
      age >= 0 &&
      age < SESSION_TIMEOUT
    ) {
      const attribution: Attribution = {};
      // Persisted context is still subject to the public API's field limits.
      for (const key of [
        'attribution_id',
        'referrer_host',
        'source',
        'medium',
        'campaign',
        'content',
      ] as const) {
        const value = saved.attribution?.[key];
        if (typeof value !== 'string') continue;
        if (
          key === 'attribution_id'
            ? UUID_V7_PATTERN.test(value)
            : value.length <= (key === 'referrer_host' ? 253 : 128)
        )
          attribution[key] = value;
      }
      return { id: saved.id, last_activity: saved.last_activity, attribution };
    }
  } catch {
    /* Missing, corrupt or inaccessible storage starts a fresh session. */
  }
  return { id: uuidV7(), last_activity: Date.now(), attribution: {} };
}

function startDrip(): void {
  if (!import.meta.env.PROD) return;
  const {
    dripEndpoint: endpoint,
    dripWriteKey: writeKey,
    dripOrigins,
  } = document.body.dataset;
  if (
    !endpoint ||
    !writeKey?.startsWith('pk_') ||
    !dripOrigins?.split(',').includes(location.origin)
  )
    return;
  const persistentStorage = storage('localStorage');
  const sessionStorageArea = storage('sessionStorage');
  const visitor = anonymousId(persistentStorage);
  let session = readSession(sessionStorageArea);
  session.attribution = acquisition() ?? session.attribution;
  const touch = () => {
    if (Date.now() - session.last_activity >= SESSION_TIMEOUT) {
      session = { id: uuidV7(), last_activity: Date.now(), attribution: {} };
    }
    session.last_activity = Date.now();
    try {
      sessionStorageArea?.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      /* Use in-memory state. */
    }
  };
  touch();
  // Activity extends the session even when the reader stays on one long article.
  for (const name of ['pointerdown', 'keydown', 'scroll'] as const) {
    document.addEventListener(
      name,
      () => {
        if (Date.now() - session.last_activity > 60_000) touch();
      },
      { passive: true },
    );
  }

  const queue: DripEvent[] = [];
  let inFlight = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let failures = 0;
  let warned = false;
  const warn = (status?: number) => {
    if (warned) return;
    warned = true;
    // Never log the write key, payload, URLs or raw response body.
    console.warn(
      `[Drip] Collection failed${status ? ` (HTTP ${status})` : ''}; check the project, key and event definitions.`,
    );
  };
  const batch = () => {
    const events: DripEvent[] = [];
    for (const event of queue.slice(0, 20)) {
      if (
        new TextEncoder().encode(
          JSON.stringify({ write_key: writeKey, events: [...events, event] }),
        ).length > 48_000
      )
        break;
      events.push(event);
    }
    return events;
  };
  const schedule = (delay = 50) => {
    if (timer !== undefined) return;
    timer = setTimeout(() => {
      timer = undefined;
      void flush();
    }, delay);
  };
  const flush = async () => {
    if (inFlight || queue.length === 0 || !navigator.onLine) return;
    const events = batch();
    if (!events.length) {
      queue.shift();
      schedule();
      return;
    }
    inFlight = true;
    let retry = true;
    let status: number | undefined;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ write_key: writeKey, events }),
        keepalive: true,
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      });
      status = response.status;
      if (status === 202) {
        const acknowledgement = await response.json();
        if (acknowledgement.accepted === events.length) {
          queue.splice(0, events.length);
          failures = 0;
          retry = false;
        }
      } else if (status !== 408 && status !== 429 && status < 500) {
        // Contract and authentication errors require a configuration fix.
        queue.splice(0, events.length);
        failures = 0;
        retry = false;
        warn(status);
      }
    } catch {
      /* Network failures use the same event IDs on retry. */
    }
    inFlight = false;
    if (retry) {
      failures += 1;
      if (failures >= 3) {
        queue.splice(0, events.length);
        failures = 0;
        warn(status);
      }
    }
    if (queue.length)
      schedule(failures ? Math.min(1000 * 2 ** (failures - 1), 8000) : 50);
  };
  const send = (
    name: DripEventName,
    fields: Pick<DripEvent, 'properties'> &
      Partial<Pick<DripEvent, 'product' | 'destination'>>,
  ) => {
    touch();
    if (queue.length >= 100) return;
    queue.push({
      schema_version: 1,
      id: uuidV7(),
      name,
      occurred_at: new Date().toISOString(),
      session_id: session.id,
      anonymous_id: visitor,
      ...session.attribution,
      path: location.pathname.slice(0, 512),
      ...fields,
    });
    schedule();
  };
  const onHide = () => {
    if (!queue.length) return;
    const events = batch();
    const body = JSON.stringify({ write_key: writeKey, events });
    try {
      // Also resend an in-flight batch: Drip deduplicates by (project, id).
      if (navigator.sendBeacon(endpoint, body)) return;
    } catch {
      /* Beacon is optional. */
    }
    void flush();
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') onHide();
    else void flush();
  });
  window.addEventListener('pagehide', onHide);
  window.addEventListener('online', () => void flush());
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) recordPageView();
    void flush();
  });

  const pageTitle = document.body.dataset.dripPageTitle;
  const product = document.body.dataset.dripProduct;
  const recordPageView = () => {
    send('page_view', {
      properties: pageTitle ? { page_title: pageTitle.slice(0, 512) } : {},
    });
    if (product) send('product_view', { product, properties: {} });
  };
  recordPageView();

  const click = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      (event.type === 'auxclick' && event.button !== 1) ||
      !(event.target instanceof Element)
    )
      return;
    const link = event.target.closest<HTMLAnchorElement>(
      'a[data-drip-placement]',
    );
    const placement = link?.dataset.dripPlacement?.trim();
    if (!link || !placement) return;
    const linkProduct = link.dataset.dripProduct;
    const destination = link.dataset.dripDestination;
    const storeDestination =
      destination === 'app_store' ||
      destination === 'google_play' ||
      destination === 'direct' ||
      destination === 'other'
        ? destination
        : undefined;
    send(storeDestination && linkProduct ? 'store_click' : 'link_click', {
      ...(linkProduct ? { product: linkProduct } : {}),
      ...(storeDestination && linkProduct
        ? { destination: storeDestination }
        : {}),
      properties: { placement: placement.slice(0, 128) },
    });
  };
  document.addEventListener('click', click);
  document.addEventListener('auxclick', click);
}

startDrip();
