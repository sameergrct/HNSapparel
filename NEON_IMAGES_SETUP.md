# Neon Database Images Setup

This document explains how to set up and use images from Neon database instead of local assets.

## Prerequisites

1. Neon database with `DATABASE_URL` environment variable set
2. Images uploaded to the `images_table` in your Neon database

## Database Schema

The images are stored in a table called `images_table` with the following structure:

```sql
CREATE TABLE images_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  data BYTEA NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Uploading Images to Neon

### 1. Run the Upload Script

```bash
node scripts/uploadImagesToNeon.js
```

This script will:
- Create the `images_table` if it doesn't exist
- Upload all images from `public/assests/` directories to Neon
- Upload the store picture
- Handle conflicts by updating existing records

### 2. Manual Upload (Alternative)

You can also upload images manually using the Neon console or any PostgreSQL client:

```sql
INSERT INTO images_table (name, category, data)
VALUES ('img-1', 'Branded shorts', <binary_data>);
```

## Image Categories

The system expects images to be organized by these categories:
- `Branded shorts`
- `Branded trousers` 
- `Cotton pants`
- `Linen trousers`
- `store` (for store pictures)

## How It Works

### 1. Image Loading Process

1. **Fallback Strategy**: The app first tries to load images from Neon database
2. **Local Fallback**: If Neon images are not available, it falls back to local assets
3. **Loading States**: Shows loading animations while fetching images

### 2. Components Updated

- **ProductCard**: Now loads product images from Neon
- **ProductDetail**: Loads product gallery images from Neon  
- **About Page**: Loads store picture from Neon

### 3. Utility Functions

- `getImagesByCategory(category)`: Fetches all images for a category
- `getImageByName(name)`: Fetches a specific image by name
- `getNeonProductImage(category, index)`: Gets a product image from Neon
- `getNeonProductGallery(category, count)`: Gets multiple images for gallery
- `getNeonStoreImage()`: Gets the store picture from Neon

## Environment Variables

Make sure you have the following environment variable set:

```env
DATABASE_URL=your_neon_database_url
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to product pages to see images loading from Neon
3. Check browser console for any errors
4. Images should load with a slight delay as they're fetched from the database

## Troubleshooting

### Images Not Loading
- Check if `DATABASE_URL` is set correctly
- Verify images are uploaded to Neon database
- Check browser console for errors
- Ensure the `images_table` exists in your database

### Performance Issues
- Consider implementing image caching
- Use appropriate image sizes for web
- Consider using a CDN for better performance

### Fallback Behavior
- If Neon images fail to load, the app automatically falls back to local assets
- This ensures the app continues to work even if the database is unavailable

## Migration from Local Assets

The system is designed to work alongside local assets during migration:

1. Upload images to Neon database
2. Update components to use Neon images
3. Keep local assets as fallback
4. Remove local assets once everything is working

## Database Connection

The Neon connection is established using:

```javascript
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
```

This provides a serverless connection to your Neon database that works in both server and client environments.
