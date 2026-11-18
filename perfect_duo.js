import sharp from 'sharp';

async function perfectDuo() {
  const original = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\bucket biryani.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const nobg = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const width = nobg.info.width;
  const height = nobg.info.height;
  const origData = original.data;
  const nobgData = Buffer.from(nobg.data);
  
  // Background yellow color in original: R: 245-255, G: 165-185, B: 0-15
  // Background red color in original: R: 215-225, G: 0-10, B: 0-10
  
  for (let y = 0; y < height; y++) {
    // 1. Precise bucket profile:
    let minAllowedX = 0;
    let maxAllowedX = width;
    
    if (y < 155) {
      // Biryani top
      minAllowedX = 0;
      maxAllowedX = width;
    } else if (y >= 155 && y <= 205) {
      // Top rim & handle ear
      minAllowedX = 42;
      maxAllowedX = 342;
    } else if (y > 205 && y <= 471) {
      // Bucket wall:
      const t = (y - 205) / (471 - 205);
      minAllowedX = 55 + t * 11;
      maxAllowedX = 338 - t * 15;
    } else {
      minAllowedX = 999;
      maxAllowedX = -1;
    }
    
    for (let x = 0; x < width; x++) {
      const idx4 = (y * width + x) * 4;
      const idx3 = (y * width + x) * 3;
      
      const r = origData[idx3];
      const g = origData[idx3 + 1];
      const b = origData[idx3 + 2];
      
      // Outside boundary:
      if (x < minAllowedX || x > maxAllowedX || y > 471) {
        nobgData[idx4 + 3] = 0;
        continue;
      }
      
      // Check if pixel in original is the solid yellow background:
      // Solid yellow has r > 240, g in [165, 185], b < 15
      const isSolidYellow = (r > 240 && g >= 165 && g <= 188 && b <= 15);
      const isSolidRed = (r >= 215 && r <= 223 && g <= 5 && b <= 7);
      
      if (y < 160 && isSolidYellow) {
        nobgData[idx4 + 3] = 0;
      } else if (isSolidRed && (x < 65 || x > 330 || y > 465)) {
        nobgData[idx4 + 3] = 0;
      }
    }
  }
  
  await sharp(nobgData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png');
    
  console.log('perfectDuo complete!');
}

perfectDuo();
