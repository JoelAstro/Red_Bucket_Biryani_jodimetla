import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
  try {
    console.log('Testing background removal on SOLO BUCKET.webp...');
    const inputPath = 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\SOLO BUCKET.webp';
    const fileUrl = pathToFileURL(inputPath).href;
    console.log('File URL:', fileUrl);
    
    // Alternatively pass as blob
    const buffer = fs.readFileSync(inputPath);
    const blob = new Blob([buffer], { type: 'image/webp' });
    
    const resultBlob = await removeBackground(blob);
    const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
    fs.writeFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\solo-bucket-nobg.png', resultBuffer);
    console.log('Success! Saved to solo-bucket-nobg.png, size:', resultBuffer.length);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
