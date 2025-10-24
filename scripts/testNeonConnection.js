const { neon } = require("@neondatabase/serverless");
require('dotenv').config();

async function testConnection() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('❌ DATABASE_URL environment variable is not set');
      console.log('💡 Make sure you have a .env file with DATABASE_URL=your_neon_connection_string');
      return;
    }
    
    const sql = neon(databaseUrl);
    
    console.log('🔍 Testing Neon database connection...');
    
    // Test basic connection
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Basic connection successful:', result[0]);
    
    // Check if images_table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'images_table'
      ) as table_exists
    `;
    
    console.log('📊 Images table exists:', tableCheck[0].table_exists);
    
    if (tableCheck[0].table_exists) {
      // Count images in each category
      const categoryCounts = await sql`
        SELECT category, COUNT(*) as count
        FROM images_table
        GROUP BY category
        ORDER BY category
      `;
      
      console.log('📈 Images by category:');
      categoryCounts.forEach(row => {
        console.log(`  ${row.category}: ${row.count} images`);
      });
      
      // Check for store picture
      const storePicture = await sql`
        SELECT name, category
        FROM images_table
        WHERE name = 'store-picture'
      `;
      
      if (storePicture.length > 0) {
        console.log('🏪 Store picture found:', storePicture[0]);
      } else {
        console.log('⚠️ Store picture not found');
      }
    } else {
      console.log('⚠️ Images table does not exist. Run uploadImagesToNeon.js first.');
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.message.includes('DATABASE_URL')) {
      console.log('💡 Make sure DATABASE_URL environment variable is set in your .env file');
    } else if (error.message.includes('connection')) {
      console.log('💡 Check your Neon database connection string');
    }
  }
}

testConnection();
