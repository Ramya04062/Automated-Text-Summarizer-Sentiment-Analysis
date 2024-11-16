document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['summary'], (result) => {
      document.getElementById('summary').innerHTML = result.summary || 'No summary available';
    });
  });
  
  
  