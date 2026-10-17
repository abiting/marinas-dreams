const controls = document.querySelector('[data-archive-controls]');
const searchInput = document.querySelector('[data-search-input]');
const reviews = Array.from(document.querySelectorAll('[data-review]'));
const resultCount = document.querySelector('[data-result-count]');
const noResults = document.querySelector('[data-no-results]');

if (controls instanceof HTMLElement && searchInput instanceof HTMLInputElement) {
  controls.hidden = false;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    reviews.forEach((review) => {
      if (!(review instanceof HTMLElement)) return;
      const matches = (review.dataset.search || '').includes(query);
      review.hidden = !matches;
      if (matches) visible += 1;
    });
    if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? 'review' : 'reviews'}`;
    if (noResults instanceof HTMLElement) noResults.hidden = visible !== 0;
  });
}

const copyButton = document.querySelector('[data-copy-link]');
const shareStatus = document.querySelector('[data-share-status]');
if (copyButton instanceof HTMLButtonElement && navigator.clipboard) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.hash = '';
    try {
      await navigator.clipboard.writeText(cleanUrl.toString());
      copyButton.textContent = 'Link copied ✓';
      if (shareStatus) shareStatus.textContent = 'Article link copied to clipboard.';
    } catch {
      copyButton.textContent = 'Copy from your address bar';
      if (shareStatus) shareStatus.textContent = 'Please copy the article URL from your browser’s address bar.';
    }
  });
}
