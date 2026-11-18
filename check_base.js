import sharp from 'sharp';

async function checkBase() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  for (let y = 450; y < info.height; y += 3) {
    let nonZero = 0;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 0) nonZero++;
    }
    console.log(`y=${y}: nonZero=${nonZero}`);
  }
}

checkBase();
