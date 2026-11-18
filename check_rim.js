import sharp from 'sharp';

async function checkRim() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\bucket biryani.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  for (let y = 140; y <= 200; y += 10) {
    const row = [];
    for (let x = 320; x <= 365; x += 5) {
      const idx = (y * info.width + x) * info.channels;
      row.push(`${x}:[${data[idx]},${data[idx+1]},${data[idx+2]}]`);
    }
    console.log(`y=${y}: ${row.join(' ')}`);
  }
}

checkRim();
