import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

const images = [
  {
    input: 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\bucket biryani.jpg',
    output: 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\duo-bucket-nobg.png',
    type: 'image/jpeg',
    name: 'DUO BUCKET (bucket biryani.jpg)'
  },
  {
    input: 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\b05f420a-4b08-423c-8091-2475e5163652.webp',
    output: 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\party-pack-nobg.png',
    type: 'image/webp',
    name: 'PARTY PACK (b05f420a-4b08-423c-8091-2475e5163652.webp)'
  },
  {
    input: 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images\\4 bukcets.jpg',
    output: 'c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\buckets\\mighty-sixty-nobg.png',
    type: 'image/jpeg',
    name: 'MIGHTY SIXTY (4 bukcets.jpg)'
  }
];

async function processAll() {
  for (const item of images) {
    console.log(`Processing ${item.name}...`);
    const buffer = fs.readFileSync(item.input);
    const blob = new Blob([buffer], { type: item.type });
    
    const startTime = Date.now();
    const resultBlob = await removeBackground(blob);
    const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
    fs.writeFileSync(item.output, resultBuffer);
    console.log(`Completed ${item.name} in ${((Date.now() - startTime) / 1000).toFixed(1)}s! Output size: ${resultBuffer.length} bytes`);
  }
  console.log('All images processed successfully!');
}

processAll();
