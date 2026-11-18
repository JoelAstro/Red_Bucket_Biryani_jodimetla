import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-extracted-raw.png');
const png = PNG.sync.read(data);

for (let y = 345; y <= 375; y++) {
  let colors = [];
  for (let x = 0; x < png.width; x++) {
    const idx = (y * png.width + x) * 4;
    if (png.data[idx + 3] > 30) {
      colors.push(`x=${x}:[${png.data[idx]},${png.data[idx+1]},${png.data[idx+2]}]`);
    }
  }
  console.log(`y=${y} (count=${colors.length}): ${colors.slice(0, 5).join(' ')}`);
}
