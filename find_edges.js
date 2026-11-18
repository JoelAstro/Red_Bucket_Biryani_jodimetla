import sharp from 'sharp';

async function findEdges() {
  const { data, info } = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\bucket biryani.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  console.log(`Original: ${info.width}x${info.height}`);
  
  // At y=190, y=250, y=300, y=350, y=400, y=440
  // Let's sample colors across x from 0 to 100 on the left, and 300 to 399 on the right
  for (const y of [180, 220, 260, 300, 340, 380, 420, 440]) {
    const leftPixels = [];
    for (let x = 35; x <= 95; x += 5) {
      const idx = (y * info.width + x) * info.channels;
      leftPixels.push(`${x}:[${data[idx]},${data[idx+1]},${data[idx+2]}]`);
    }
    const rightPixels = [];
    for (let x = 300; x <= 360; x += 5) {
      const idx = (y * info.width + x) * info.channels;
      rightPixels.push(`${x}:[${data[idx]},${data[idx+1]},${data[idx+2]}]`);
    }
    console.log(`y=${y} Left: ${leftPixels.join(' ')}`);
    console.log(`y=${y} Right: ${rightPixels.join(' ')}`);
  }
}

findEdges();
