function displayResult(summary, x, y) {
    // Remove any existing result box
    let existingBox = document.getElementById('resultBox');
    if (existingBox) {
      existingBox.remove();
    }
  
    // Create a new result box
    const box = document.createElement('div');
    box.id = 'resultBox';
    box.style.position = 'absolute';
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
    box.style.backgroundColor = '#f0f0f0';
    box.style.border = '1px solid #ccc';
    box.style.padding = '10px';
    box.style.zIndex = '9999';
    box.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
    box.style.maxWidth = '300px';
    box.style.maxHeight = '200px';
    box.style.overflowY = 'auto';
    box.style.fontSize = '14px';
    box.style.color = '#333';
  
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
      box.remove();
    });
  
    // Set the content of the result box
    box.innerHTML = `
      <div><strong>Summaries:</strong></div>
      ${summary}
    `;
  
    // Append the close button to the box
    box.appendChild(closeButton);
  
    document.body.appendChild(box);
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'displayResult') {
      const { summary, x, y } = request;
      displayResult(summary, x, y);
    }
  });
  