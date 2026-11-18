import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\promo-poster.png');
const png = PNG.sync.read(data);
console.log(`Poster: ${png.width}x${png.height}`);
