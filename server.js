const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const localIp = getLocalIp();

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n========================================================');
  console.log('   TUSHU GYM PLAN - MOBILE INSTALL SERVER (ACTIVE)');
  console.log('========================================================\n');
  console.log('Apne Mobile Phone me install karne ke aasan steps:');
  console.log('1. Phone aur Laptop dono SAME Wi-Fi ya Phone Hotspot se connect karein.');
  console.log('2. Phone ke Chrome browser me ye URL open karein:\n');
  console.log(`     👉  http://${localIp}:${PORT}  👈\n`);
  console.log('3. Phone me screen khulte hi upar "Install App" par tap karein,');
  console.log('   ya Chrome ke 3-dots (⋮) par tap karke "Install app" chunein.');
  console.log('4. App aapke phone ki Home Screen par install ho jayegi!');
  console.log('   (Install hone ke baad internet band karke bhi 100% offline chalegi!)\n');
  console.log('Server chal raha hai... Press Ctrl+C to stop.\n');
});
