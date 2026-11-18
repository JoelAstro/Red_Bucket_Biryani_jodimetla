import sharp from 'sharp';

async function inspectPoster() {
  const meta = await sharp('c:\\PROJECTS\\Red_Bucket_Jodimetla\\public\\images\\hero-poster-source.jpg').metadata();
  console.log(`Poster: ${meta.width}x${meta.height}, format: ${meta.format}`);
}

inspectPoster();
