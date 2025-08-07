const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

const dataPath = './data/links.json';

app.get('/api/redirect/:code', (req, res) => {
  const code = req.params.code;
  const data = JSON.parse(fs.readFileSync(dataPath));

  const link = data.links.find(l => l.code === code);
  if (!link) return res.status(404).send('Link not found');

  link.clicks += 1;
  data.clicks += 1;

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  // Redirect to custom ad page
  res.redirect(`/public/redirect.html?target=${encodeURIComponent(link.url)}`);
});

app.listen(PORT, () => {
  console.log(`Redirect API running on http://localhost:${PORT}`);
});
