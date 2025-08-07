const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

const dataPath = './data/links.json';

app.get('/api/stats', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  res.json({
    total_links: data.generated_count,
    total_clicks: data.clicks
  });
});

app.listen(PORT, () => {
  console.log(`Stats API running on http://localhost:${PORT}`);
});
