const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create PNG without external dependencies using pure Node.js and zlib
function createSolidPng(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data with scanlines
  const lineLength = width * 4 + 1;
  const rawData = Buffer.alloc(lineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.45;
  const innerRadius = width * 0.38;

  for (let y = 0; y < height; y++) {
    const lineOffset = y * lineLength;
    rawData[lineOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = lineOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gradient background + dumbbell design
      if (dist <= innerRadius) {
        // Inner circle
        // Dumbbell bar or lightning center
        const isCenterBar = Math.abs(dy) < height * 0.06 && Math.abs(dx) < width * 0.28;
        const isLeftPlate1 = Math.abs(dx + width * 0.22) < width * 0.05 && Math.abs(dy) < height * 0.22;
        const isLeftPlate2 = Math.abs(dx + width * 0.3) < width * 0.035 && Math.abs(dy) < height * 0.16;
        const isRightPlate1 = Math.abs(dx - width * 0.22) < width * 0.05 && Math.abs(dy) < height * 0.22;
        const isRightPlate2 = Math.abs(dx - width * 0.3) < width * 0.035 && Math.abs(dy) < height * 0.16;

        if (isCenterBar || isLeftPlate1 || isLeftPlate2 || isRightPlate1 || isRightPlate2) {
          // Emerald glow
          rawData[pixelOffset] = 16;     // R
          rawData[pixelOffset + 1] = 185; // G
          rawData[pixelOffset + 2] = 129; // B
          rawData[pixelOffset + 3] = 255; // Alpha
        } else {
          // Dark background inside
          rawData[pixelOffset] = 15;
          rawData[pixelOffset + 1] = 23;
          rawData[pixelOffset + 2] = 42;
          rawData[pixelOffset + 3] = 255;
        }
      } else if (dist <= radius) {
        // Border ring
        rawData[pixelOffset] = 16;
        rawData[pixelOffset + 1] = 185;
        rawData[pixelOffset + 2] = 129;
        rawData[pixelOffset + 3] = 255;
      } else {
        // Outside rounded corners
        rawData[pixelOffset] = 9;
        rawData[pixelOffset + 1] = 13;
        rawData[pixelOffset + 2] = 22;
        rawData[pixelOffset + 3] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const body = Buffer.concat([typeBuf, data]);
  const crc = crc32(body);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([len, body, crcBuf]);
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }

  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), createSolidPng(192, 192, 16, 185, 129));
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), createSolidPng(512, 512, 16, 185, 129));
console.log('Icons generated successfully!');
