const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Ultra-Premium Luxury Black & White Gym Icon Generator (Apple / Nike Aesthetic)
function createMonochromeGymIcon(width, height) {
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
  const outerRadius = width * 0.46;
  const ringRadius = width * 0.42;
  const innerRadius = width * 0.40;

  for (let y = 0; y < height; y++) {
    const lineOffset = y * lineLength;
    rawData[lineOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pixelOffset = lineOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default: Deep Matte Onyx Background (#0b0c10)
      let r = 11, g = 12, b = 16, a = 255;

      // Outer delicate silver highlight ring
      if (dist >= innerRadius && dist <= ringRadius) {
        // Brushed Silver border
        r = 210; g = 215; b = 225; a = 255;
      } else if (dist < innerRadius) {
        // Dark metallic interior (#121318 with subtle gradient)
        const v = Math.floor(18 + (y / height) * 12);
        r = v; g = v; b = v + 3; a = 255;

        // Dumbbell / Gym Emblem Geometry
        // Center Grip Bar
        const isCenterBar = Math.abs(dy) <= height * 0.048 && Math.abs(dx) <= width * 0.22;
        
        // Inner Plate Collars
        const isLeftCollar = Math.abs(dx + width * 0.14) <= width * 0.02 && Math.abs(dy) <= height * 0.09;
        const isRightCollar = Math.abs(dx - width * 0.14) <= width * 0.02 && Math.abs(dy) <= height * 0.09;

        // Big Primary Plates
        const isLeftPlatePrimary = Math.abs(dx + width * 0.21) <= width * 0.045 && Math.abs(dy) <= height * 0.22;
        const isRightPlatePrimary = Math.abs(dx - width * 0.21) <= width * 0.045 && Math.abs(dy) <= height * 0.22;

        // Secondary Outer Plates
        const isLeftPlateSec = Math.abs(dx + width * 0.285) <= width * 0.032 && Math.abs(dy) <= height * 0.165;
        const isRightPlateSec = Math.abs(dx - width * 0.285) <= width * 0.032 && Math.abs(dy) <= height * 0.165;

        // End Lock Nut
        const isLeftNut = Math.abs(dx + width * 0.33) <= width * 0.018 && Math.abs(dy) <= height * 0.06;
        const isRightNut = Math.abs(dx - width * 0.33) <= width * 0.018 && Math.abs(dy) <= height * 0.06;

        if (isCenterBar) {
          // Titanium White Bar with subtle knurl grip highlight
          const isKnurl = (Math.floor(x / 4) % 2 === 0);
          const c = isKnurl ? 245 : 255;
          r = c; g = c; b = c;
        } else if (isLeftCollar || isRightCollar) {
          // Brushed Platinum collar
          r = 230; g = 232; b = 238;
        } else if (isLeftPlatePrimary || isRightPlatePrimary) {
          // Crisp Pure White Heavy Plates with beveled edges
          const edgeY = Math.abs(dy) > height * 0.20;
          r = edgeY ? 220 : 255;
          g = edgeY ? 222 : 255;
          b = edgeY ? 228 : 255;
        } else if (isLeftPlateSec || isRightPlateSec) {
          // Sleek Silver Outer Plates
          const edgeY = Math.abs(dy) > height * 0.15;
          r = edgeY ? 210 : 242;
          g = edgeY ? 212 : 245;
          b = edgeY ? 218 : 250;
        } else if (isLeftNut || isRightNut) {
          // End Lock
          r = 200; g = 205; b = 215;
        }
      } else {
        // Outside squircle background (Onyx black for smooth edge blending)
        r = 10; g = 11; b = 14; a = 255;
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
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

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), createMonochromeGymIcon(192, 192));
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), createMonochromeGymIcon(512, 512));
console.log('✅ Ultra-Luxury Monochrome Black & White Gym Icons generated successfully!');
