/**
 * Offline QR Code Generator (ISO/IEC 18004 Byte Mode, EC Level M)
 * Zero external requests. Renders scannable UPI payment QR codes onto HTML5 Canvas.
 */
(function (global) {
  'use strict';

  const EXP = new Uint8Array(512);
  const LOG = new Uint8Array(256);
  (function initGF() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) {
      EXP[i] = EXP[i - 255];
    }
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP[LOG[a] + LOG[b]];
  }

  function rsGeneratorPoly(deg) {
    let poly = [1];
    for (let i = 0; i < deg; i++) {
      const next = new Array(poly.length + 1).fill(0);
      const factor = EXP[i];
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gfMul(poly[j], factor);
      }
      poly = next;
    }
    return poly;
  }

  function rsRemainder(data, ecLen) {
    const gen = rsGeneratorPoly(ecLen);
    const res = new Uint8Array(ecLen);
    for (let i = 0; i < data.length; i++) {
      const factor = data[i] ^ res[0];
      res.copyWithin(0, 1);
      res[ecLen - 1] = 0;
      if (factor !== 0) {
        for (let j = 0; j < ecLen; j++) {
          res[j] ^= gfMul(gen[j + 1], factor);
        }
      }
    }
    return res;
  }

  // Version specs for EC Level M (versions 1..10)
  // [totalCodewords, ecPerBlock, g1Blocks, g1Data, g2Blocks, g2Data, alignCenters]
  const VERSION_SPECS_M = {
    1:  [26,  10, 1, 16, 0, 0,  []],
    2:  [44,  16, 1, 28, 0, 0,  [6, 18]],
    3:  [70,  26, 1, 44, 0, 0,  [6, 22]],
    4:  [100, 18, 2, 32, 0, 0,  [6, 26]],
    5:  [134, 24, 2, 43, 0, 0,  [6, 30]],
    6:  [172, 16, 4, 27, 0, 0,  [6, 34]],
    7:  [196, 18, 4, 31, 0, 0,  [6, 22, 38]],
    8:  [242, 22, 2, 38, 2, 39, [6, 24, 42]],
    9:  [292, 22, 3, 36, 2, 37, [6, 26, 46]],
    10: [346, 26, 4, 43, 1, 44, [6, 28, 50]]
  };

  function chooseVersion(byteLen) {
    for (let v = 1; v <= 10; v++) {
      const spec = VERSION_SPECS_M[v];
      const dataCap = spec[2] * spec[3] + spec[4] * spec[5];
      const charCountBits = v >= 10 ? 16 : 8;
      const neededBytes = Math.ceil((4 + charCountBits + byteLen * 8) / 8);
      if (neededBytes <= dataCap) return v;
    }
    throw new Error('Payload too long for QR versions 1-10');
  }

  function encodeDataBytes(bytes, version) {
    const spec = VERSION_SPECS_M[version];
    const totalDataCodewords = spec[2] * spec[3] + spec[4] * spec[5];
    const bits = [];
    const pushBits = (val, len) => {
      for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
    };

    // Byte mode indicator 0100
    pushBits(0b0100, 4);
    pushBits(bytes.length, version >= 10 ? 16 : 8);
    for (let i = 0; i < bytes.length; i++) pushBits(bytes[i], 8);

    const maxBits = totalDataCodewords * 8;
    const termLen = Math.min(4, maxBits - bits.length);
    pushBits(0, termLen);
    while (bits.length % 8 !== 0) bits.push(0);

    const padBytes = [0xec, 0x11];
    let padIdx = 0;
    while (bits.length < maxBits) {
      pushBits(padBytes[padIdx % 2], 8);
      padIdx++;
    }

    const codewords = new Uint8Array(totalDataCodewords);
    for (let i = 0; i < totalDataCodewords; i++) {
      let b = 0;
      for (let j = 0; j < 8; j++) b = (b << 1) | bits[i * 8 + j];
      codewords[i] = b;
    }

    // Split blocks & compute RS EC
    const ecLen = spec[1];
    const blocks = [];
    const ecBlocks = [];
    let offset = 0;
    for (let i = 0; i < spec[2]; i++) {
      const slice = codewords.slice(offset, offset + spec[3]);
      blocks.push(slice);
      ecBlocks.push(rsRemainder(slice, ecLen));
      offset += spec[3];
    }
    for (let i = 0; i < spec[4]; i++) {
      const slice = codewords.slice(offset, offset + spec[5]);
      blocks.push(slice);
      ecBlocks.push(rsRemainder(slice, ecLen));
      offset += spec[5];
    }

    // Interleave data and EC codewords
    const out = [];
    const maxDataLen = Math.max(spec[3], spec[5]);
    for (let i = 0; i < maxDataLen; i++) {
      for (let b = 0; b < blocks.length; b++) {
        if (i < blocks[b].length) out.push(blocks[b][i]);
      }
    }
    for (let i = 0; i < ecLen; i++) {
      for (let b = 0; b < ecBlocks.length; b++) {
        out.push(ecBlocks[b][i]);
      }
    }
    return new Uint8Array(out);
  }

  function buildMatrix(text) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const version = chooseVersion(bytes.length);
    const size = version * 4 + 17;
    const spec = VERSION_SPECS_M[version];
    const codewords = encodeDataBytes(bytes, version);

    // -1 = unset, 0 = white, 1 = black
    const mat = Array.from({ length: size }, () => new Int8Array(size).fill(-1));
    const isFunc = Array.from({ length: size }, () => new Uint8Array(size));

    const setFunc = (r, c, val) => {
      if (r >= 0 && r < size && c >= 0 && c < size) {
        mat[r][c] = val ? 1 : 0;
        isFunc[r][c] = 1;
      }
    };

    const drawFinder = (r0, c0) => {
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          const r = r0 + dr;
          const c = c0 + dc;
          if (r < 0 || r >= size || c < 0 || c >= size) continue;
          const inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
          const onBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
          const inInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
          setFunc(r, c, inOuter && (onBorder || inInner));
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
      setFunc(6, i, i % 2 === 0);
      setFunc(i, 6, i % 2 === 0);
    }

    // Alignment patterns
    const centers = spec[6];
    for (let i = 0; i < centers.length; i++) {
      for (let j = 0; j < centers.length; j++) {
        const r0 = centers[i];
        const c0 = centers[j];
        if ((r0 <= 8 && c0 <= 8) || (r0 <= 8 && c0 >= size - 8) || (r0 >= size - 8 && c0 <= 8)) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const onEdge = Math.abs(dr) === 2 || Math.abs(dc) === 2;
            const center = dr === 0 && dc === 0;
            setFunc(r0 + dr, c0 + dc, onEdge || center);
          }
        }
      }
    }

    // Dark module + reserve format info
    setFunc(size - 8, 8, 1);
    for (let i = 0; i < 9; i++) {
      if (!isFunc[8][i]) setFunc(8, i, 0);
      if (!isFunc[i][8]) setFunc(i, 8, 0);
    }
    for (let i = size - 8; i < size; i++) {
      if (!isFunc[8][i]) setFunc(8, i, 0);
      if (!isFunc[i][8]) setFunc(i, 8, 0);
    }

    // Version info if >= 7
    if (version >= 7) {
      let rem = version;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      const bits = (version << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const bit = (bits >>> i) & 1;
        const a = size - 11 + (i % 3);
        const b = Math.floor(i / 3);
        setFunc(a, b, bit);
        setFunc(b, a, bit);
      }
    }

    // Place data bits zig-zag
    let bitIdx = 0;
    const totalBits = codewords.length * 8;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) {
        for (let j = 0; j < 2; j++) {
          const c = right - j;
          const upward = ((right + 1) & 2) === 0;
          const r = upward ? size - 1 - vert : vert;
          if (!isFunc[r][c]) {
            let bit = 0;
            if (bitIdx < totalBits) {
              bit = (codewords[bitIdx >>> 3] >>> (7 - (bitIdx & 7))) & 1;
              bitIdx++;
            }
            mat[r][c] = bit;
          }
        }
      }
    }

    // Choose best mask (0..7)
    const maskPreds = [
      (r, c) => (r + c) % 2 === 0,
      (r, c) => r % 2 === 0,
      (r, c) => c % 3 === 0,
      (r, c) => (r + c) % 3 === 0,
      (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
      (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
      (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
      (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
    ];

    const applyMaskAndFormat = (grid, maskId) => {
      const pred = maskPreds[maskId];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!isFunc[r][c] && pred(r, c)) {
            grid[r][c] ^= 1;
          }
        }
      }
      // Format info for EC M (00) + maskId (3 bits)
      const data = (0b00 << 3) | maskId;
      let rem = data;
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const formatBits = ((data << 10) | rem) ^ 0x5412;

      for (let i = 0; i < 15; i++) {
        const bit = (formatBits >>> (14 - i)) & 1;
        // Top-left copy
        if (i < 6) grid[8][i] = bit;
        else if (i === 6) grid[8][7] = bit;
        else if (i === 7) grid[8][8] = bit;
        else if (i === 8) grid[7][8] = bit;
        else grid[14 - i][8] = bit;

        // Bottom-left & top-right copy
        if (i < 7) grid[size - 1 - i][8] = bit;
        else grid[8][size - 15 + i] = bit;
      }
      grid[size - 8][8] = 1;
    };

    const penaltyScore = (grid) => {
      let score = 0;
      for (let r = 0; r < size; r++) {
        let runColor = grid[r][0], runLen = 1;
        for (let c = 1; c < size; c++) {
          if (grid[r][c] === runColor) {
            runLen++;
            if (runLen === 5) score += 3;
            else if (runLen > 5) score += 1;
          } else {
            runColor = grid[r][c];
            runLen = 1;
          }
        }
      }
      for (let c = 0; c < size; c++) {
        let runColor = grid[0][c], runLen = 1;
        for (let r = 1; r < size; r++) {
          if (grid[r][c] === runColor) {
            runLen++;
            if (runLen === 5) score += 3;
            else if (runLen > 5) score += 1;
          } else {
            runColor = grid[r][c];
            runLen = 1;
          }
        }
      }
      for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size - 1; c++) {
          const sum = grid[r][c] + grid[r][c + 1] + grid[r + 1][c] + grid[r + 1][c + 1];
          if (sum === 0 || sum === 4) score += 3;
        }
      }
      return score;
    };

    let bestGrid = null;
    let bestScore = Infinity;
    for (let m = 0; m < 8; m++) {
      const candidate = mat.map(row => Int8Array.from(row));
      applyMaskAndFormat(candidate, m);
      const s = penaltyScore(candidate);
      if (s < bestScore) {
        bestScore = s;
        bestGrid = candidate;
      }
    }

    return { size, matrix: bestGrid };
  }

  function renderQrToCanvas(canvas, text, pixelSize) {
    if (!canvas) return;
    const qr = buildMatrix(text);
    const quiet = 4;
    const totalModules = qr.size + quiet * 2;
    const scale = Math.max(2, Math.floor((pixelSize || 220) / totalModules));
    const dim = totalModules * scale;

    canvas.width = dim;
    canvas.height = dim;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, dim, dim);
    ctx.fillStyle = '#000000';

    for (let r = 0; r < qr.size; r++) {
      for (let c = 0; c < qr.size; c++) {
        if (qr.matrix[r][c] === 1) {
          ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
        }
      }
    }
  }

  global.OfflineQr = { buildMatrix, renderQrToCanvas };
})(typeof window !== 'undefined' ? window : globalThis);
