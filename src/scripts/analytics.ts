import mixpanel from 'mixpanel-browser';

const token = document.body.dataset.analyticsToken;

if (token) {
  mixpanel.init(token, {
    track_pageview: false,
    autocapture: false,
    persistence: 'localStorage',
    stop_utm_persistence: true,
    save_referrer: false,
    property_blacklist: [
      '$current_url',
      '$referrer',
      '$initial_referrer',
      'current_url_search',
    ],
  });

  const page = {
    page_path: location.pathname,
    page_title: document.title,
  };
  mixpanel.register(page);
  mixpanel.track_pageview(page);

  const product = document.body.dataset.analyticsProduct;
  if (product) mixpanel.track('product_viewed', { product_slug: product });

  const trackClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      (event.type === 'auxclick' && event.button !== 1) ||
      !(event.target instanceof Element)
    )
      return;
    const link = event.target.closest<HTMLAnchorElement>(
      'a[data-analytics-placement]',
    );
    const placement = link?.dataset.analyticsPlacement?.trim();
    if (!link || !placement) return;
    const productSlug = link.dataset.analyticsProduct;
    const store = link.dataset.analyticsStore;
    if (store && productSlug)
      mixpanel.track('store_clicked', {
        product_slug: productSlug,
        store,
        placement,
      });
    else
      mixpanel.track('link_clicked', {
        ...(productSlug ? { product_slug: productSlug } : {}),
        placement,
      });
  };
  document.addEventListener('click', trackClick);
  document.addEventListener('auxclick', trackClick);
}
