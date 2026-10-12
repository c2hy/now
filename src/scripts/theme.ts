// Keeps the manual color-theme choice in sync with the toggle in the header.
// The initial theme is applied by the inline script in BaseLayout before paint.
const STORAGE_KEY = 'theme';
const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');

if (toggle) {
  const sync = () =>
    toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  sync();
  toggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable; the theme still applies for this page.
    }
    sync();
  });
}
