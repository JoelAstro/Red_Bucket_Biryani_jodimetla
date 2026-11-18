import sharp from 'sharp';

async function cleanupStray() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const width = info.width;
  const height = info.height;
  const out = Buffer.from(data);
  
  // Tapered cylinder equation:
  // Top rim at y=158 to 198: left is 45, right is 338
  // Below y=198 to 468:
  // left: 56 + (y-198)*(66-56)/(468-198) = 56 + (y-198)*10/270
  // right: 337 - (y-198)*(337-322)/(468-198) = 337 - (y-198)*15/270
  // Below y=468: outside bucket
  
  for (let y = 0; y < height; y++) {
    let leftLimit = 0;
    let rightLimit = width;
    
    if (y < 155) {
      // Biryani: left ~55, right ~335
      leftLimit = 50;
      rightLimit = 340;
    } else if (y >= 155 && y <= 200) {
      leftLimit = 42;
      rightLimit = 339;
    } else if (y > 200 && y <= 468) {
      const t = (y - 200) / (468 - 200);
      leftLimit = 55 + t * 11;
      rightLimit = 337 - t * 15;
    } else {
      leftLimit = 999;
      rightLimit = -1;
    }
    
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (x < leftLimit || x > rightLimit || y > 468) {
        out[idx + 3] = 0;
      }
    }
  }
  
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png');
    
  console.log('Cleaned up duo bucket!');
}

cleanupStray();
