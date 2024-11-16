**Automated sentiment analysis and text summarization**

**Overview**
This Chrome extension allows users to perform sentiment analysis and text summarization on selected text from a webpage. It features two main functionalities:

List View: Provides a summary of selected text, displaying key points in a list format.
Summarizer and Sentiment View: Analyzes both the sentiment of the selected text (positive, negative, neutral) and provides a concise summary of the content.
The extension leverages the Hugging Face API for summarization and integrates sentiment analysis using the Sentiment.js library. It provides results through a popup interface in the browser.

**Features:**
List View:
Context menu option for summarizing selected text in a list format.
Summarized text is broken into sentences and displayed as an HTML list in a popup.
Utilizes the Hugging Face BART-Large-CNN model for summarization.

Summarizer and Sentiment View:
Performs both sentiment analysis and text summarization of the selected content.
Displays the sentiment (positive, negative, neutral) and the summary in a popup.
Backend sentiment analysis handled by the Sentiment.js library.
Summarization provided via the Hugging Face BART-Large-CNN model.

**Usage:**
List View:
Highlight any text on a webpage.
Right-click and select View List from the context menu.
A popup will open, displaying the summarized content as a list of key sentences.

Summarizer and Sentiment View:
Highlight any text on a webpage.
Right-click and select Analyze and Summarize Selection from the context menu.
The popup will display both the sentiment of the selected text and a concise summary.
Alternatively, open the popup from the browser toolbar, enter custom text, and click Analyze and Summarize.

**API Keys:**
The extension uses the Hugging Face BART-Large-CNN model for text summarization. Ensure that you replace the API key in the background.js file with your own.

**Technologies Used:**
Hugging Face API: For text summarization.
Sentiment.js: For sentiment analysis.
Chrome Extensions API: For context menu and storage management.
Node.js: Backend for sentiment analysis.

**Permissions:**
The extension requires the following permissions:

activeTab: To interact with the current webpage.
contextMenus: To create context menu options.
storage: To store and retrieve summaries and sentiment analysis results.

**Files Structure:**
background.js: Manages API requests, context menus, and content interactions.
popup.html: Displays the results (summary and sentiment) in the popup window.
popup.js: Handles interactions between the popup and the background script.
server.js: Backend Node.js server for performing sentiment analysis using Sentiment.js.

**Future Improvements:**
Enhance summarization to handle larger text chunks more efficiently.
Add support for multiple languages for both summarization and sentiment analysis.

**Result:**
![Picture1](https://github.com/user-attachments/assets/6930a299-1932-4f1c-b2e2-73d857b3db3a)





