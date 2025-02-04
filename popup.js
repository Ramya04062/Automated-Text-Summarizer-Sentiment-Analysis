//popup.js
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['sentiment', 'summary'], (result) => {
    document.getElementById('sentiment').textContent = result.sentiment || 'No sentiment data';
    document.getElementById('summary').textContent = result.summary || 'No summary available';
  });
});
