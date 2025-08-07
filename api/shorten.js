const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const dataPath = './data/links.json';

function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const data = JSON.parse(fs.readFileSync(dataPath));
  const code = generateCode();
  const short_url = `https://yourdomain.com/api/redirect/${code}`;

  data.links.push({ code, url, clicks: 0 });
  data.generated_count += 1;

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.json({ short_url, code });
});

app.listen(PORT, () => {
  console.log(`Shorten API running on http://localhost:${PORT}`);
});
