import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-extracted-raw.png');
const png = PNG.sync.read(data);

// Inspect the bottom region
for (let y = 820; y <= 980; y += 15) {
  let minX = 999, maxX = -1;
  let count = 0;
  for (let x = 0; x < png.width; x++) {
    const idx = (y * png.width + x) * 4;
    if (png.data[idx + 3] > 30) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      count++;
    }
  }
  console.log(`y=${y}: minX=${minX}, maxX=${maxX}, count=${count}`);
}
