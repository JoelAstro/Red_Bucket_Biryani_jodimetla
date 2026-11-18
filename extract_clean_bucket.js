import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-food-platter.png');
const src = PNG.sync.read(data);

// Bucket boundaries:
// Left handle is at x ~100..170
// Right handle is at x ~530..600
// Food on top: y ~0..150, x ~110..570
// Bucket body: y ~140..470, x ~120..570

const bucketPng = new PNG({ width: src.width, height: src.height });
src.data.copy(bucketPng.data);

for (let y = 0; y < src.height; y++) {
  // Left wall of bucket roughly:
  // at y=150: x=120
  // at y=460: x=190
  const t = Math.max(0, Math.min(1, (y - 150) / (460 - 150)));
  const leftWall = 95 + t * 90;
  
  // Right wall of bucket roughly:
  // at y=150: x=580
  // at y=460: x=515
  const rightWall = 590 - t * 75;
  
  for (let x = 0; x < src.width; x++) {
    const idx = (y * src.width + x) * 4;
    
    // If outside the bucket + food
    if (x < leftWall || x > rightWall || y > 470) {
      bucketPng.data[idx + 3] = 0;
    }
  }
}

// Crop bounding box
let minY = 999, maxY = -1, minX = 999, maxX = -1;
for (let y = 0; y < bucketPng.height; y++) {
  for (let x = 0; x < bucketPng.width; x++) {
    const idx = (y * bucketPng.width + x) * 4;
    if (bucketPng.data[idx + 3] > 20) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}

console.log(`Bucket bounds: y=[${minY}, ${maxY}], x=[${minX}, ${maxX}]`);

const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;
const cropped = new PNG({ width: cropWidth, height: cropHeight });

for (let y = 0; y < cropHeight; y++) {
  for (let x = 0; x < cropWidth; x++) {
    const srcIdx = ((minY + y) * bucketPng.width + (minX + x)) * 4;
    const dstIdx = (y * cropWidth + x) * 4;
    cropped.data[dstIdx] = bucketPng.data[srcIdx];
    cropped.data[dstIdx + 1] = bucketPng.data[srcIdx + 1];
    cropped.data[dstIdx + 2] = bucketPng.data[srcIdx + 2];
    cropped.data[dstIdx + 3] = bucketPng.data[srcIdx + 3];
  }
}

fs.writeFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-bucket-clean.png', PNG.sync.write(cropped));
console.log('Saved hero-bucket-clean.png');
