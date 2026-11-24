import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1_048_576;
const MAX_DIMENSION = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function assertValidPng(data: Buffer): { width: number; height: number; chunks: number } {
  if (data.length === 0 || data.length > MAX_BYTES) {
    throw new Error(`entry.png size ${data.length} bytes exceeds limit ${MAX_BYTES}`);
  }
  if (data.length < 33 || !data.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error('entry.png does not start with a valid PNG signature');
  }
  const ihdrType = data.subarray(12, 16).toString('ascii');
  if (ihdrType !== 'IHDR') {
    throw new Error(`expected IHDR chunk first, got ${ihdrType}`);
  }
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width < 1 || height < 1 || width > MAX_DIMENSION || height > MAX_DIMENSION) {
    throw new Error(`invalid PNG dimensions ${width}x${height}`);
  }

  let offset = 8;
  let chunks = 0;
  let sawIdat = false;
  let sawIend = false;
  while (offset + 12 <= data.length) {
    const length = data.readUInt32BE(offset);
    const chunkType = data.subarray(offset + 4, offset + 8).toString('ascii');
    const nextOffset = offset + 12 + length;
    if (nextOffset > data.length) {
      throw new Error(`truncated PNG chunk ${chunkType} at offset ${offset}`);
    }
    chunks += 1;
    if (chunkType === 'IDAT') sawIdat = true;
    offset = nextOffset;
    if (chunkType === 'IEND') {
      sawIend = true;
      break;
    }
  }
  if (!sawIdat || !sawIend || offset !== data.length) {
    throw new Error(`incomplete PNG chunk stream (idat=${sawIdat}, iend=${sawIend}, offset=${offset}/${data.length})`);
  }

  return { width, height, chunks };
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR || path.dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

  const sourcePath = path.join(botDir, 'entry.png');
  const payload = fs.readFileSync(sourcePath);
  const { width, height, chunks } = assertValidPng(payload);

  fs.mkdirSync(outDir, { recursive: true, mode: 0o755 });
  try {
    fs.chmodSync(outDir, 0o755);
  } catch {
    // Read-only parent or platform permission differences are ignored when mkdir succeeds.
  }

  const outPath = path.join(outDir, 'entry.png');
  fs.writeFileSync(outPath, payload, { mode: 0o644 });
  fs.chmodSync(outPath, 0o644);

  console.log(`Wrote ${outPath} (${payload.length} bytes, ${width}x${height} PNG, ${chunks} chunks)`);
}

main();
