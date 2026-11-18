import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-extracted-raw.png');
const png = PNG.sync.read(data);

console.log(`Dimensions: ${png.width}x${png.height}`);

// Check Y from 250 to 450
for (let y = 280; y <= 450; y += 10) {
  let count = 0;
  for (let x = 0; x < png.width; x++) {
    const idx = (y * png.width + x) * 4;
    if (png.data[idx + 3] > 20) count++;
  }
  console.log(`y=${y}: non-transparent pixels = ${count}`);
}

// Check Y from 800 to 1000
for (let y = 800; y < png.height; y += 10) {
  let count = 0;
  for (let x = 0; x < png.width; x++) {
    const idx = (y * png.width + x) * 4;
    if (png.data[idx + 3] > 20) count++;
  }
  console.log(`y=${y}: non-transparent pixels = ${count}`);
}
