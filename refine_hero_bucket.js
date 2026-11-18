import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-food-platter.png');
const src = PNG.sync.read(data);

// Width is 682, Height is 560
const out = new PNG({ width: src.width, height: 490 });

for (let y = 0; y < out.height; y++) {
  // Let's define the precise bucket boundary
  let leftLimit = 0;
  let rightLimit = src.width;
  
  if (y < 130) {
    // Rice top: roughly x in [105, 575]
    leftLimit = 100;
    rightLimit = 580;
  } else if (y >= 130 && y <= 210) {
    // Upper rim and handle attachments
    leftLimit = 95;
    rightLimit = 585;
  } else if (y > 210 && y <= 480) {
    // Tapered bucket wall
    const t = (y - 210) / (480 - 210);
    // At y=210: left ~105, right ~575
    // At y=480: left ~195, right ~485
    leftLimit = 105 + t * 90;
    rightLimit = 575 - t * 90;
  } else {
    leftLimit = 999;
    rightLimit = -1;
  }
  
  for (let x = 0; x < out.width; x++) {
    const srcIdx = (y * src.width + x) * 4;
    const dstIdx = (y * out.width + x) * 4;
    
    // Copy color
    out.data[dstIdx] = src.data[srcIdx];
    out.data[dstIdx + 1] = src.data[srcIdx + 1];
    out.data[dstIdx + 2] = src.data[srcIdx + 2];
    let alpha = src.data[srcIdx + 3];
    
    // Check boundary
    if (x < leftLimit || x > rightLimit || y > 475) {
      alpha = 0;
    } else {
      // Smooth edges
      if (x < leftLimit + 3) {
        alpha = Math.round(alpha * ((x - leftLimit) / 3));
      } else if (x > rightLimit - 3) {
        alpha = Math.round(alpha * ((rightLimit - x) / 3));
      }
      
      // Bottom soft fade for seamless integration
      if (y >= 430 && y <= 475) {
        const fade = (475 - y) / 45;
        alpha = Math.round(alpha * Math.pow(fade, 1.2));
      }
    }
    
    out.data[dstIdx + 3] = Math.max(0, Math.min(255, alpha));
  }
}

// Crop bounding box
let minY = 999, maxY = -1, minX = 999, maxX = -1;
for (let y = 0; y < out.height; y++) {
  for (let x = 0; x < out.width; x++) {
    const idx = (y * out.width + x) * 4;
    if (out.data[idx + 3] > 10) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}

console.log(`Final bounds: y=[${minY}, ${maxY}], x=[${minX}, ${maxX}]`);

const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;
const finalCropped = new PNG({ width: cropWidth, height: cropHeight });

for (let y = 0; y < cropHeight; y++) {
  for (let x = 0; x < cropWidth; x++) {
    const srcIdx = ((minY + y) * out.width + (minX + x)) * 4;
    const dstIdx = (y * cropWidth + x) * 4;
    finalCropped.data[dstIdx] = out.data[srcIdx];
    finalCropped.data[dstIdx + 1] = out.data[srcIdx + 1];
    finalCropped.data[dstIdx + 2] = out.data[srcIdx + 2];
    finalCropped.data[dstIdx + 3] = out.data[srcIdx + 3];
  }
}

fs.writeFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-biryani-bucket.png', PNG.sync.write(finalCropped));
console.log('Saved hero-biryani-bucket.png successfully!');
