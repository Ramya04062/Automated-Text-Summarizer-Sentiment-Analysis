//server.js
const express = require('express');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');
const cors = require('cors');
const summarize = require('node-summary');

const app = express();
app.use(bodyParser.json());

// Configure CORS to allow requests from Chrome extensions
app.use(cors());

const sentiment = new Sentiment();

app.post('/analyze', async (req, res) => {
  const review = req.body.review;
  if (review) {
    // Sentiment analysis
    const result = sentiment.analyze(review);
    const score = result.score;
    let sentimentLabel;
    if (score > 0) {
      sentimentLabel = 'Positive';
    } else if (score < 0) {
      sentimentLabel = 'Negative';
    } else {
      sentimentLabel = 'Neutral';
    }

    // Summarization
    summarize.summarize('', review, (err, summary) => {
      if (err) {
        console.error('Summarization Error:', err);
        res.status(500).json({ error: 'Error summarizing text' });
        return;
      }

      res.json({
        sentiment: sentimentLabel,
        summary: summary || 'No summary available'
      });
    });
  } else {
    res.status(400).json({ error: 'Review is required' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
