// Function to fetch summary from the API
function fetchSummary(textChunk, retries = 3) {
    return fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Replace with your actual API key
      },
      body: JSON.stringify({ inputs: textChunk })
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 503 && retries > 0) {
          // Retry after a short delay
          return new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => fetchSummary(textChunk, retries - 1));
        }
        console.error('API response error:', response.status, response.statusText);
        return response.json().then(errorData => {
          throw new Error(`HTTP error! Status: ${response.status}. ${errorData.error}`);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data) && data[0] && data[0].summary_text) {
        return data[0].summary_text;
      } else {
        console.error('Summary text not found in response:', data);
        return 'Summary not available';
      }
    })
    .catch(error => {
      console.error('Error fetching summary:', error);
      throw error;
    });
  }
  
  // Function to handle summarization
  function handleText(selectedText, tabId, pageX, pageY) {
    const paragraphs = selectedText.split('\n').filter(p => p.trim().length > 0);
    const chunkSize = Math.ceil(paragraphs.length / 3);
  
    const chunks = [];
    for (let i = 0; i < paragraphs.length; i += chunkSize) {
      chunks.push(paragraphs.slice(i, i + chunkSize).join('\n'));
    }
  
    Promise.all(chunks.map(chunk => fetchSummary(chunk)))
      .then(results => {
        // Flatten and process results
        const summaryList = results.flatMap((summary) => {
          // Split each summary into individual sentences
          return summary.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim().length > 0)
                        .map(sentence => `<li>${sentence.trim()}</li>`);
        }).join('');
        chrome.storage.local.set({
          summary: `<ul style="max-height: 300px; overflow-y: auto;">${summaryList}</ul>`
        }, () => {
          chrome.action.openPopup(); // Open the popup to display the results
        });
      })
      .catch(error => {
        console.error('Error during summarization:', error);
        chrome.storage.local.set({
          summary: 'An error occurred during summarization'
        }, () => {
          chrome.action.openPopup(); // Open the popup to display the error
        });
      });
  }
  
  // Create context menu items
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'summarizeSelection',
      title: 'List view',
      contexts: ['selection']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Context menu creation error:', chrome.runtime.lastError);
      } else {
        console.log('Context menu item created successfully.');
      }
    });
  });
  
  // Handle context menu clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'summarizeSelection') {
      handleText(info.selectionText, tab.id, info.pageX, info.pageY);
    }
  });
  
  
  
  
  
  
  
  
  