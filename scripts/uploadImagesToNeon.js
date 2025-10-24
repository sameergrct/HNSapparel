const { neon } = require("@neondatabase/serverless");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is not set');
  console.log('💡 Make sure you have a .env file with DATABASE_URL=your_neon_connection_string');
  process.exit(1);
}

const sql = neon(databaseUrl);

// Create the images table if it doesn't exist
async function createImagesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS images_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        data BYTEA NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Images table created or already exists');
  } catch (error) {
    console.error('Error creating images table:', error);
  }
}

// Upload images from a directory to Neon
async function uploadImagesFromDirectory(directoryPath, category) {
  try {
    const files = fs.readdirSync(directoryPath);
    const imageFiles = files.filter(file => 
      file.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
    );

    console.log(`Found ${imageFiles.length} images in ${directoryPath}`);

    for (const file of imageFiles) {
      const filePath = path.join(directoryPath, file);
      const imageBuffer = fs.readFileSync(filePath);
      
      // Extract image name without extension
      const imageName = path.parse(file).name;
      
      try {
        await sql`
          INSERT INTO images_table (name, category, data)
          VALUES (${imageName}, ${category}, ${imageBuffer})
          ON CONFLICT (name, category) DO UPDATE SET
            data = EXCLUDED.data,
            created_at = CURRENT_TIMESTAMP
        `;
        console.log(`✅ Uploaded: ${file} as ${imageName}`);
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directoryPath}:`, error);
  }
}

// Upload store picture
async function uploadStorePicture() {
  const storeImagePath = path.join(__dirname, '../public/assests/store picture/Untitled.png');
  
  if (fs.existsSync(storeImagePath)) {
    try {
      const imageBuffer = fs.readFileSync(storeImagePath);
      
      await sql`
        INSERT INTO images_table (name, category, data)
        VALUES ('store-picture', 'store', ${imageBuffer})
        ON CONFLICT (name, category) DO UPDATE SET
          data = EXCLUDED.data,
          created_at = CURRENT_TIMESTAMP
      `;
      console.log('✅ Uploaded store picture');
    } catch (error) {
      console.error('❌ Error uploading store picture:', error);
    }
  } else {
    console.log('⚠️ Store picture not found at:', storeImagePath);
  }
}

async function main() {
  try {
    console.log('🚀 Starting image upload to Neon...');
    
    // Create table
    await createImagesTable();
    
    // Upload product images
    const assetDirectories = [
      { path: '../public/assests/Branded shorts', category: 'Branded shorts' },
      { path: '../public/assests/Branded trousers', category: 'Branded trousers' },
      { path: '../public/assests/Cotton pants', category: 'Cotton pants' },
      { path: '../public/assests/Linen trousers', category: 'Linen trousers' }
    ];
    
    for (const dir of assetDirectories) {
      const fullPath = path.join(__dirname, dir.path);
      if (fs.existsSync(fullPath)) {
        console.log(`\n📁 Processing ${dir.category}...`);
        await uploadImagesFromDirectory(fullPath, dir.category);
      } else {
        console.log(`⚠️ Directory not found: ${fullPath}`);
      }
    }
    
    // Upload store picture
    console.log('\n🏪 Processing store picture...');
    await uploadStorePicture();
    
    console.log('\n🎉 Image upload completed!');
  } catch (error) {
    console.error('❌ Error in main:', error);
  }
}

main();
