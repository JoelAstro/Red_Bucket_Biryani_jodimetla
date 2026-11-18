import sharp from 'sharp';

async function findBottom() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\bucket biryani.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  for (let y = 430; y < 500; y += 5) {
    const idx = (y * info.width + 200) * info.channels;
    console.log(`y=${y} x=200: [${data[idx]}, ${data[idx+1]}, ${data[idx+2]}]`);
  }
}

findBottom();
