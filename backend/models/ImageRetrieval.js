// In Node.js (backend):
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.get('/retrieve', async (req, res) => {
  const query = req.query.query || 'The Princess Bride';
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching from DuckDuckGo');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
