const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/convert-results');
const THUMBNAILS_DIR = path.join(IMAGES_DIR, 'thumbnails');
const OPTIMIZED_DIR = path.join(IMAGES_DIR, 'optimized');

// Ensure directories exist
if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}
if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

async function optimizeImages() {
    const files = fs.readdirSync(IMAGES_DIR).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
    });

    console.log(`Found ${files.length} images to process...`);

    let processed = 0;

    for (const file of files) {
        const inputPath = path.join(IMAGES_DIR, file);
        const thumbnailPath = path.join(THUMBNAILS_DIR, file);
        const optimizedPath = path.join(OPTIMIZED_DIR, file);

        try {
            // 1. Generate Thumbnail (400x400 cover)
            if (!fs.existsSync(thumbnailPath)) {
                await sharp(inputPath)
                    .resize(400, 400, { fit: 'cover' })
                    .toFile(thumbnailPath);
            }

            // 2. Generate Optimized Full Size (max 1920px width/height)
            if (!fs.existsSync(optimizedPath)) {
                await sharp(inputPath)
                    .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
                    .toFile(optimizedPath);
            }

            processed++;
            if (processed % 10 === 0) {
                console.log(`Processed ${processed}/${files.length} images...`);
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    }

    console.log('Optimization complete!');
}

optimizeImages();
