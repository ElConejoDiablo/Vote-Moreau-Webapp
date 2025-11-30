const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT_DIR = path.join(__dirname, '..');
const INDEX_PATH = path.join(ROOT_DIR, 'index.html');
const OUTPUT_DIR = path.join(ROOT_DIR, 'qr-codes');

function slugifyForId(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getQrPayloadForAction(action) {
  const base = action.url;
  const rawId = action.id || slugifyForId(action.label) || 'card';
  const id = rawId.toLowerCase();

  if (base.includes('#')) {
    return `${base}-${id}`;
  }

  return `${base}#card-${id}`;
}

function getIdForAction(action) {
  return (action.id || slugifyForId(action.label) || 'card').toLowerCase();
}

async function loadActionsFromIndex() {
  const html = await fs.promises.readFile(INDEX_PATH, 'utf8');
  const match = html.match(/const actions = \[[\s\S]*?\];/);
  if (!match) {
    throw new Error('Could not find actions array in index.html');
  }

  const snippet = match[0];
  const wrapped = `
    ${snippet}
    module.exports = actions;
  `;

  const module = { exports: [] };
  const fn = new Function('module', 'exports', wrapped);
  fn(module, module.exports);
  return module.exports;
}

async function ensureOutputDir() {
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
}

function downloadQrPng(url, outPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);

    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(outPath, () => {});
          return reject(
            new Error(`Failed to download QR (${res.statusCode}): ${url}`)
          );
        }

        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(outPath, () => {});
        reject(err);
      });
  });
}

async function generateAll() {
  await ensureOutputDir();
  const actions = await loadActionsFromIndex();

  console.log(`Found ${actions.length} actions. Generating QR PNGs...`);

  for (const action of actions) {
    const id = getIdForAction(action);
    const payload = getQrPayloadForAction(action);
    const encoded = encodeURIComponent(payload);
    const size = 1024;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=4`;
    const outPath = path.join(OUTPUT_DIR, `${id}.png`);

    console.log(`- ${id}: ${qrUrl}`);
    await downloadQrPng(qrUrl, outPath);
  }

  console.log('Done. QR PNGs written to:', OUTPUT_DIR);
}

generateAll().catch((err) => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});


