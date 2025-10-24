import { neon } from "@neondatabase/serverless";

// Check if DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('⚠️ DATABASE_URL environment variable is not set. Neon images will not be available.');
}

const sql = databaseUrl ? neon(databaseUrl) : null;

// Server-side functions (for API routes)
export async function getImagesByCategory(category: string) {
  if (!sql) {
    throw new Error('Database connection not available. Please set DATABASE_URL environment variable.');
  }
  
  const images = await sql`
    SELECT name, data
    FROM images_table
    WHERE category = ${category}
    ORDER BY id ASC
  `;
  return images;
}

export async function getImageByName(name: string) {
  if (!sql) {
    throw new Error('Database connection not available. Please set DATABASE_URL environment variable.');
  }
  
  const images = await sql`
    SELECT name, data
    FROM images_table
    WHERE name = ${name}
    LIMIT 1
  `;
  return images[0] || null;
}

// Client-side functions (for components)
export async function fetchImagesByCategory(category: string) {
  try {
    const response = await fetch(`/api/images?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error fetching images by category:', error);
    return [];
  }
}

export async function fetchImageByName(name: string) {
  try {
    const response = await fetch(`/api/images?name=${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const data = await response.json();
    return data.image || null;
  } catch (error) {
    console.error('Error fetching image by name:', error);
    return null;
  }
}

export function convertImageToBase64(imageData: Buffer): string {
  const base64 = Buffer.from(imageData).toString("base64");
  return `data:image/png;base64,${base64}`;
}

export async function getNeonProductImage(category: string, imageIndex: number): Promise<string> {
  try {
    const images = await fetchImagesByCategory(category);
    if (images.length === 0) {
      throw new Error(`No images found for category: ${category}`);
    }
    
    const imageIndex_1 = (imageIndex - 1) % images.length;
    const image = images[imageIndex_1];
    return convertImageToBase64(image.data);
  } catch (error) {
    console.error('Error fetching image from Neon:', error);
    throw error; // Re-throw to let components handle the error
  }
}

export async function getNeonProductGallery(category: string, count: number = 4): Promise<string[]> {
  try {
    const images = await fetchImagesByCategory(category);
    if (images.length === 0) {
      throw new Error(`No images found for category: ${category}`);
    }
    
    const galleryImages: string[] = [];
    for (let i = 0; i < Math.min(count, images.length); i++) {
      const image = images[i];
      galleryImages.push(convertImageToBase64(image.data));
    }
    return galleryImages;
  } catch (error) {
    console.error('Error fetching gallery from Neon:', error);
    throw error; // Re-throw to let components handle the error
  }
}

export async function getNeonStoreImage(): Promise<string> {
  try {
    const image = await fetchImageByName('store-picture');
    if (!image) {
      throw new Error('Store picture not found in Neon database');
    }
    return convertImageToBase64(image.data);
  } catch (error) {
    console.error('Error fetching store image from Neon:', error);
    throw error; // Re-throw to let components handle the error
  }
}
