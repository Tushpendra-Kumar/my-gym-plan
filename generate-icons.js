const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper: Signed Distance Function for a Rounded Rectangle (crisp smooth edges)
function inRoundedRect(dx, dy, cx, cy, halfW, halfH, radius) {
  const qx = Math.abs(dx - cx) - (halfW - radius);
  const qy = Math.abs(dy - cy) - (halfH - radius);
  const outside = Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2);
  const inside = Math.min(Math.max(qx, qy), 0);
  return (outside + inside - radius) <= 0;
}

// Ultra-Premium Circular Black & White Gym Logo Generator (Zero Square Corners)
function createMonochromeGymIcon(width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const ihdrChunk = makeChunk('IHDR', ihdr);

  const lineLength = width * 4 + 1;
  const rawData = Buffer.alloc(lineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const outerCircleRadius = width * 0.485;
  const ringOuter = width * 0.435;
  const ringInner = width * 0.415;

  for (let y = 0; y < height; y++) {
    const lineOffset = y * lineLength;
    rawData[lineOffset] = 0;

    for (let x = 0; x < width; x++) {
      const pixelOffset = lineOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let r = 0, g = 0, b = 0, a = 0;

      if (dist <= outerCircleRadius + 1.2) {
        // Smooth anti-aliased circular edge (100% transparent outside circle)
        const edgeAlpha = dist <= outerCircleRadius
          ? 255
          : Math.max(0, Math.round(255 * (1 - (dist - outerCircleRadius) / 1.2)));

        // Matte obsidian black disc with soft radial center sheen
        const sheen = Math.max(0, 1 - dist / outerCircleRadius);
        const baseV = Math.floor(10 + sheen * 16);
        r = baseV; g = baseV; b = baseV; a = edgeAlpha;

        // Crisp pure-white inner precision circle ring
        if (dist >= ringInner && dist <= ringOuter) {
          r = 248; g = 248; b = 250; a = edgeAlpha;
        } else if (dist < ringInner) {
          const isBar = inRoundedRect(dx, dy, 0, 0, width * 0.16, height * 0.036, width * 0.018);
          const isLeftPrimary = inRoundedRect(dx, dy, -width * 0.175, 0, width * 0.044, height * 0.185, width * 0.02);
          const isRightPrimary = inRoundedRect(dx, dy, width * 0.175, 0, width * 0.044, height * 0.185, width * 0.02);
          const isLeftSec = inRoundedRect(dx, dy, -width * 0.255, 0, width * 0.032, height * 0.135, width * 0.016);
          const isRightSec = inRoundedRect(dx, dy, width * 0.255, 0, width * 0.032, height * 0.135, width * 0.016);
          const isLeftEnd = inRoundedRect(dx, dy, -width * 0.305, 0, width * 0.018, height * 0.048, width * 0.01);
          const isRightEnd = inRoundedRect(dx, dy, width * 0.305, 0, width * 0.018, height * 0.048, width * 0.01);

          if (isBar || isLeftPrimary || isRightPrimary) {
            r = 255; g = 255; b = 255;
          } else if (isLeftSec || isRightSec) {
            r = 232; g = 234; b = 238;
          } else if (isLeftEnd || isRightEnd) {
            r = 205; g = 208; b = 214;
          }
        }
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
console.log('✅ Circular Monochrome Black & White Gym Logos generated successfully!');
