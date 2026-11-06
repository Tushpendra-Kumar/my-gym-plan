const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORTS = [3000, 5000, 8000, 8888, 9000];
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

function startServer(portIndex = 0) {
  if (portIndex >= PORTS.length) {
    console.error('\n❌ Error: Koi bhi standard port khali nahi mila. Kripya open-in-android-studio.bat se APK generate karein.\n');
    return;
  }

  const port = PORTS[portIndex];

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    const filePath = path.join(__dirname, reqPath);

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

  server.on('error', (err) => {
    if (err.code === 'EACCES' || err.code === 'EADDRINUSE') {
      console.log(`Port ${port} busy ya restricted hai, agla port try kiya jaa raha hai...`);
      startServer(portIndex + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log('\n========================================================');
    console.log('   TUSHU GYM PLAN - MOBILE INSTALL SERVER (ACTIVE)');
    console.log('========================================================\n');
    console.log('Apne Mobile Phone me install karne ke aasan steps:');
    console.log('1. Phone aur Laptop dono SAME Wi-Fi (ya Phone Hotspot) se connect rakhein.');
    console.log('2. Apne phone ke Chrome browser me ye URL open karein:\n');
    console.log(`     👉  http://${localIp}:${port}  👈\n`);
    console.log('3. Phone me screen khulte hi upar "Install App" button par tap karein,');
    console.log('   ya Chrome ke 3-dots (⋮) par tap karke "Install app" / "Add to Home screen" chunein.');
    console.log('4. App aapke phone ki Home Screen par install ho jayegi!');
    console.log('   (Install hone ke baad internet band karke bhi 100% offline chalegi!)\n');
    console.log(`Server chal raha hai (Port ${port})... Window ko band na karein.\n`);
  });
}

startServer(0);
