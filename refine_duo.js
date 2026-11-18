import sharp from 'sharp';

async function refineDuo() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const width = info.width;
  const height = info.height;
  
  // Create refined buffer
  const out = Buffer.from(data);
  
  for (let y = 0; y < height; y++) {
    // Determine the valid bucket left and right bounds for this row
    let minAllowedX = 0;
    let maxAllowedX = width;
    
    if (y < 150) {
      // Biryani top area - already well segmented by AI model, keep as is
      continue;
    } else if (y >= 150 && y <= 215) {
      // Rim and handle area
      minAllowedX = 42;
      maxAllowedX = 352;
    } else if (y > 215 && y <= 472) {
      // Tapered bucket body:
      // at y=215: left is ~56, right is ~336
      // at y=470: left is ~66, right is ~323
      const t = (y - 215) / (470 - 215);
      const leftEdge = 55 + t * 11;
      const rightEdge = 337 - t * 14;
      
      minAllowedX = leftEdge;
      maxAllowedX = rightEdge;
    } else {
      // y > 472: Below the bucket base
      minAllowedX = 999;
      maxAllowedX = -1;
    }
    
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      if (x < minAllowedX - 2 || x > maxAllowedX + 2 || y > 473) {
        // Completely outside bucket boundary
        out[idx + 3] = 0; // Transparent
      } else if (x < minAllowedX) {
        // Smooth anti-aliased transition on left edge
        const dist = minAllowedX - x;
        const factor = Math.max(0, 1 - dist / 2);
        out[idx + 3] = Math.round(out[idx + 3] * factor);
      } else if (x > maxAllowedX) {
        // Smooth anti-aliased transition on right edge
        const dist = x - maxAllowedX;
        const factor = Math.max(0, 1 - dist / 2);
        out[idx + 3] = Math.round(out[idx + 3] * factor);
      } else if (y >= 471 && y <= 473) {
        // Smooth bottom edge
        const dist = y - 471;
        out[idx + 3] = Math.round(out[idx + 3] * (1 - dist / 3));
      }
    }
  }
  
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png');
    
  console.log('Successfully refined duo-bucket-nobg.png!');
}

refineDuo();
