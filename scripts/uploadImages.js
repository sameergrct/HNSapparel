import dotenv from "dotenv";
import path from "path";
import { neon } from "@neondatabase/serverless";
import fs from "fs";

dotenv.config({ path: path.resolve(".env") });
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Create a Neon connection
const sql = neon(process.env.DATABASE_URL);

async function uploadImages() {
  try {
    const assetsDir = path.join(process.cwd(), "public", "assests");

    const categories = fs.readdirSync(assetsDir);

    for (const category of categories) {
      const categoryPath = path.join(assetsDir, category);
      const images = fs.readdirSync(categoryPath);

      for (const image of images) {
        const imagePath = path.join(categoryPath, image);
        const buffer = fs.readFileSync(imagePath);

        // Store image as bytea in Neon
        await sql`
          INSERT INTO images_table (category, name, data)
          VALUES (${category}, ${image}, ${buffer})
        `;
        console.log(`✅ Uploaded ${category}/${image}`);
      }
    }

    console.log("🌿 All images uploaded!");
  } catch (err) {
    console.error("❌ Error uploading images:", err);
  }
}

uploadImages();
