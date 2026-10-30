// Renders each photo to public/_img/<width>/<path>.webp, skipping existing ones.
import fs from 'fs/promises';
import { createRequire } from 'module';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { images } = require('../next.config.js');

const SOURCE_DIR = path.resolve('public/images');
const OUTPUT_DIR = path.resolve('public/_img');
const WIDTHS = [...images.deviceSizes, ...images.imageSizes];
const QUALITY = 75;

async function main() {
  const files = (await fs.readdir(SOURCE_DIR, { recursive: true })).filter(
    file => /\.jpe?g$/i.test(file),
  );

  const expected = new Set(
    files.flatMap(file => WIDTHS.map(width => outputPath(width, file))),
  );
  if (expected.size !== files.length * WIDTHS.length) {
    throw new Error('Two photos map to the same output name');
  }

  const queue = [...files];
  let rendered = 0;

  await Promise.all(
    Array.from({ length: os.availableParallelism() }, async () => {
      while (queue.length > 0) {
        // Not `rendered += await …`, which reads `rendered` before awaiting.
        const count = await render(queue.shift());
        rendered += count;
      }
    }),
  );

  const removed = await prune(expected);

  console.log(
    `images: ${files.length} photos, ${rendered} rendered, ${removed} pruned`,
  );
}

function outputPath(width, file) {
  return path.join(
    OUTPUT_DIR,
    String(width),
    file.replace(/\.[^.]+$/, '.webp'),
  );
}

async function render(file) {
  const missing = [];
  for (const width of WIDTHS) {
    if (!(await exists(outputPath(width, file)))) {
      missing.push(width);
    }
  }

  if (missing.length === 0) {
    return 0;
  }

  const source = await fs.readFile(path.join(SOURCE_DIR, file));

  for (const width of missing) {
    const target = outputPath(width, file);
    // An interrupted write must not look like a finished render.
    const temp = `${target}.tmp`;

    await fs.mkdir(path.dirname(target), { recursive: true });
    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(temp);
    await fs.rename(temp, target);
  }

  return missing.length;
}

function exists(file) {
  return fs.access(file).then(
    () => true,
    () => false,
  );
}

// Drop renders of deleted photos, e.g. from a restored CI cache.
async function prune(expected) {
  const entries = await fs.readdir(OUTPUT_DIR, { recursive: true });
  let removed = 0;

  for (const entry of entries) {
    const file = path.join(OUTPUT_DIR, entry);

    if ((await fs.stat(file)).isFile() && !expected.has(file)) {
      await fs.rm(file);
      removed++;
    }
  }

  return removed;
}

await main();
