import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-extracted-raw.png');
const src = PNG.sync.read(data);

// 1. Version 1: Bucket on Platter (Top text removed y < 366, bottom badge removed y > 838 & x in 200..485)
const v1 = new PNG({ width: src.width, height: src.height });
src.data.copy(v1.data);

for (let y = 0; y < v1.height; y++) {
  for (let x = 0; x < v1.width; x++) {
    const idx = (y * v1.width + x) * 4;
    
    // Clear top text
    if (y < 366) {
      v1.data[idx + 3] = 0;
    }
    
    // Clear bottom "LOCATION: JODIMETLA" button
    if (y >= 835 && x >= 195 && x <= 490) {
      v1.data[idx + 3] = 0;
    }
    
    // Clear any stray pixels below y = 925
    if (y > 925) {
      v1.data[idx + 3] = 0;
    }
  }
}

// Crop v1 bounding box
let minY = 999, maxY = -1, minX = 999, maxX = -1;
for (let y = 0; y < v1.height; y++) {
  for (let x = 0; x < v1.width; x++) {
    const idx = (y * v1.width + x) * 4;
    if (v1.data[idx + 3] > 20) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}

console.log(`v1 bounds: y=[${minY}, ${maxY}], x=[${minX}, ${maxX}]`);

const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;
const v1Cropped = new PNG({ width: cropWidth, height: cropHeight });

for (let y = 0; y < cropHeight; y++) {
  for (let x = 0; x < cropWidth; x++) {
    const srcIdx = ((minY + y) * v1.width + (minX + x)) * 4;
    const dstIdx = (y * cropWidth + x) * 4;
    v1Cropped.data[dstIdx] = v1.data[srcIdx];
    v1Cropped.data[dstIdx + 1] = v1.data[srcIdx + 1];
    v1Cropped.data[dstIdx + 2] = v1.data[srcIdx + 2];
    v1Cropped.data[dstIdx + 3] = v1.data[srcIdx + 3];
  }
}

fs.writeFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-food-platter.png', PNG.sync.write(v1Cropped));
console.log('Saved hero-food-platter.png');
