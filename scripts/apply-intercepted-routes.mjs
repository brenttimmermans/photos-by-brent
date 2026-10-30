// Next serves `(.)` intercepted routes via a Next-Url header rewrite, which
// static assets can't do. Client navigations always send that header, so the
// out/(.)<route> payloads replace out/<route>'s; direct visits use the .html.
import fs from 'fs/promises';
import path from 'path';

const OUT_DIR = path.resolve('out');

const intercepted = (await fs.readdir(OUT_DIR)).filter(dir =>
  dir.startsWith('(.)'),
);

let copied = 0;
for (const dir of intercepted) {
  const files = await fs.readdir(path.join(OUT_DIR, dir), { recursive: true });

  for (const file of files.filter(file => file.endsWith('.txt'))) {
    const target = path.join(OUT_DIR, dir.slice(3), file);

    await fs.access(target);
    await fs.copyFile(path.join(OUT_DIR, dir, file), target);
    copied++;
  }
}

console.log(`intercepted routes: ${copied} payloads applied`);
