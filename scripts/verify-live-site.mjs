import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const racesDataset = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'races.json'), 'utf8'));
const BASE_URL = 'https://ballot-watch.vercel.app';

// Routes to test with cache-busting
const routes = [
  { path: '/', expectInBody: ['Ken Paxton', 'James Talarico'] },
  { path: '/senate', expectInBody: ['Senate', 'Majority'] },
  { path: '/senate/2026-SEN-TX', expectInBody: ['Ken Paxton', 'James Talarico', 'John Cornyn'] },
  { path: '/coverage', expectInBody: ['35', '36', '435'] },
  { path: '/polls', expectInBody: ['University of Texas', 'Marist College'] },
  { path: '/rating-changes', expectInBody: ['Cook Political Report', 'Sabato'] },
  { path: '/local', expectInBody: ['Local Races Directory', 'Treasurer'] },
  { path: '/api/cron/ingest', isJson: true, expectKey: 'total_races', expectVal: 537 },
  { path: '/api/cron/recompute', isJson: true, expectKey: 'races_evaluated', expectVal: 537 },
  { path: '/api/cron/digest', isJson: true, expectKey: 'status', expectVal: 'ok' },
];

function fetchRoute(routeObj) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${routeObj.path}?_cb=${Date.now()}`;
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          resolve({ path: routeObj.path, pass: false, error: `HTTP status ${res.statusCode}` });
          return;
        }

        if (routeObj.isJson) {
          try {
            const parsed = JSON.parse(data);
            if (routeObj.expectKey && parsed[routeObj.expectKey] !== routeObj.expectVal) {
              resolve({
                path: routeObj.path,
                pass: false,
                error: `JSON key "${routeObj.expectKey}" expected ${routeObj.expectVal}, got ${parsed[routeObj.expectKey]}`
              });
              return;
            }
          } catch (e) {
            resolve({ path: routeObj.path, pass: false, error: `Invalid JSON response: ${e.message}` });
            return;
          }
        }

        if (routeObj.expectInBody) {
          for (const str of routeObj.expectInBody) {
            if (!data.includes(str)) {
              resolve({ path: routeObj.path, pass: false, error: `Missing expected string "${str}" in rendered HTML` });
              return;
            }
          }
        }

        resolve({ path: routeObj.path, pass: true });
      });
    });

    req.on('error', (err) => {
      resolve({ path: routeObj.path, pass: false, error: err.message });
    });
  });
}

async function runLiveAudit() {
  console.log(`📡 [Rule 13 Live Site Audit] Checking live routes on ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;
  const failures = [];

  for (const r of routes) {
    const res = await fetchRoute(r);
    if (res.pass) {
      passed++;
      console.log(`  ✓ ${r.path}: PASS`);
    } else {
      failed++;
      failures.push(res);
      console.log(`  ❌ ${r.path}: FAIL (${res.error})`);
    }
  }

  console.log(`\n📊 Live Audit Summary: ${passed} passed, ${failed} failed out of ${routes.length} routes.`);
  if (failed > 0) {
    console.error('❌ Failures detected on live production URL:');
    failures.forEach(f => console.error(`  - ${f.path}: ${f.error}`));
    process.exit(1);
  } else {
    console.log('✅ All routes match dataset. Rule 13 audit passed.');
    process.exit(0);
  }
}

runLiveAudit();
