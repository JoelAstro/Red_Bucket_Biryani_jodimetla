import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function extractBucket() {
  console.log('Testing background removal on poster...');
  const inputPath = 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-poster-source.jpg';
  const buffer = fs.readFileSync(inputPath);
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  
  const startTime = Date.now();
  const resultBlob = await removeBackground(blob);
  const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
  fs.writeFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-extracted-raw.png', resultBuffer);
  console.log(`Saved raw extraction in ${((Date.now() - startTime) / 1000).toFixed(1)}s! Size: ${resultBuffer.length}`);
}

extractBucket();
