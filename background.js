// background.js
// Function to fetch summary from the API

function fetchSummary(textChunk) {
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
    throw error; // Rethrow the error to be caught by Promise.all
  });
}

// Function to analyze sentiment
function analyzeSentiment(selectedText) {
  return fetch('http://localhost:3001/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ review: selectedText }),
  })
  .then(response => response.json())
  .then(data => {
    return data.sentiment;
  })
  .catch(error => {
    console.error('Fetch Error:', error);
    return 'Error analyzing sentiment';
  });
}

// Function to handle summarization and sentiment analysis
function handleText(selectedText, tabId, pageX, pageY) {
  const paragraphs = selectedText.split('\n').filter(p => p.trim().length > 0);
  const chunkSize = Math.ceil(paragraphs.length / 3);

  const chunks = [];
  for (let i = 0; i < paragraphs.length; i += chunkSize) {
    chunks.push(paragraphs.slice(i, i + chunkSize).join('\n'));
  }

  Promise.all([
    analyzeSentiment(selectedText),
    Promise.all(chunks.map(chunk => fetchSummary(chunk))).then(results => results.join('\n\n'))
  ])
  .then(([sentiment, summary]) => {
    chrome.storage.local.set({
      sentiment: sentiment,
      summary: summary
    }, () => {
      chrome.action.openPopup(); // Open the popup to display the results
    });
  })
  .catch(error => {
    console.error('Error during summarization and sentiment analysis:', error);
    chrome.storage.local.set({
      sentiment: 'Error analyzing sentiment',
      summary: 'An error occurred during summarization'
    }, () => {
      chrome.action.openPopup(); // Open the popup to display the error
    });
  });
}

// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'analyzeAndSummarize',
    title: 'Analyze and Summarize Selection',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'analyzeAndSummarize') {
    handleText(info.selectionText, tab.id, info.pageX, info.pageY);
  }
});
