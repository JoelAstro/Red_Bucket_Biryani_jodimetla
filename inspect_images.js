import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const files = [
  'SOLO BUCKET.webp',
  'bucket biryani.jpg',
  'b05f420a-4b08-423c-8091-2475e5163652.webp',
  '4 bukcets.jpg'
];

async function inspect() {
  for (const f of files) {
    const filePath = path.join('c:\\PROJECTS\\Red_Bucket_Jodimetla\\Images', f);
    const meta = await sharp(filePath).metadata();
    console.log(`${f}: ${meta.width}x${meta.height}, format: ${meta.format}, channels: ${meta.channels}`);
  }
}

inspect();
