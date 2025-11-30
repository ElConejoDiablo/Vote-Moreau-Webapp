const fs = require('fs').promises;
const path = require('path');
let cached = null;

async function loadIndex() {
  if (cached) return cached;
  const indexPath = path.join(__dirname, '..', 'index.html');
  cached = await fs.readFile(indexPath, 'utf-8');
  return cached;
}

module.exports = async function handler(req, res) {
  const cookie = req.headers.cookie || '';
  if (!cookie.includes('auth_token=authenticated')) {
    res.writeHead(302, { Location: '/password.html' });
    return res.end();
  }

  const html = await loadIndex();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
};
