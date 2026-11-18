import sharp from 'sharp';

async function analyze() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  console.log(`Dimensions: ${info.width}x${info.height}, channels: ${info.channels}`);
  
  // Find leftmost and rightmost non-zero alpha at different Y coordinates
  for (let y = 0; y < info.height; y += 40) {
    let minX = -1;
    let maxX = -1;
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const alpha = data[idx + 3];
      if (alpha > 20) {
        if (minX === -1) minX = x;
        maxX = x;
      }
    }
    console.log(`y=${y}: minX=${minX}, maxX=${maxX}, width=${maxX - minX}`);
  }
}

analyze();
