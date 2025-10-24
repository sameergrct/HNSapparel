const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Product data based on your assets folders
const productCategories = {
  'Branded shorts': {
    categoryName: 'Branded Shorts',
    categorySlug: 'branded-shorts',
    description: 'Premium branded shorts for casual and semi-formal occasions',
    imageCount: 12,
    basePrice: 2500,
    priceVariation: 500
  },
  'Branded trousers': {
    categoryName: 'Branded Trousers', 
    categorySlug: 'branded-trousers',
    description: 'High-quality branded trousers for professional and formal wear',
    imageCount: 10,
    basePrice: 3500,
    priceVariation: 800
  },
  'Cotton pants': {
    categoryName: 'Cotton Pants',
    categorySlug: 'cotton-pants', 
    description: 'Comfortable cotton pants perfect for everyday wear',
    imageCount: 9,
    basePrice: 2000,
    priceVariation: 400
  },
  'Linen trousers': {
    categoryName: 'Linen Trousers',
    categorySlug: 'linen-trousers',
    description: 'Breathable linen trousers ideal for summer and warm weather',
    imageCount: 15,
    basePrice: 3000,
    priceVariation: 600
  }
};

// Generate product names and descriptions
function generateProductName(category, index) {
  const names = {
    'Branded shorts': [
      'Classic Denim Shorts', 'Cargo Shorts', 'Chino Shorts', 'Athletic Shorts',
      'Casual Shorts', 'Board Shorts', 'Cargo Denim Shorts', 'Khaki Shorts',
      'Sport Shorts', 'Beach Shorts', 'Work Shorts', 'Weekend Shorts'
    ],
    'Branded trousers': [
      'Formal Dress Trousers', 'Business Chinos', 'Classic Trousers', 'Slim Fit Pants',
      'Cargo Trousers', 'Dress Pants', 'Casual Trousers', 'Office Pants',
      'Smart Trousers', 'Professional Pants'
    ],
    'Cotton pants': [
      'Cotton Chinos', 'Cotton Cargo Pants', 'Cotton Trousers', 'Cotton Work Pants',
      'Cotton Casual Pants', 'Cotton Dress Pants', 'Cotton Utility Pants',
      'Cotton Relaxed Fit', 'Cotton Straight Leg'
    ],
    'Linen trousers': [
      'Linen Dress Pants', 'Linen Chinos', 'Linen Casual Trousers', 'Linen Summer Pants',
      'Linen Office Trousers', 'Linen Relaxed Fit', 'Linen Straight Leg', 'Linen Cargo Pants',
      'Linen Work Pants', 'Linen Formal Trousers', 'Linen Beach Pants', 'Linen Travel Pants',
      'Linen Weekend Trousers', 'Linen Smart Pants', 'Linen Comfort Fit'
    ]
  };
  
  return names[category][index] || `${category} Product ${index + 1}`;
}

function generateDescription(category, productName) {
  const descriptions = {
    'Branded shorts': 'Premium quality branded shorts crafted from high-grade materials. Perfect for casual outings, beach trips, and weekend activities. Features comfortable fit and durable construction.',
    'Branded trousers': 'Professional branded trousers designed for the modern gentleman. Excellent for office wear, business meetings, and formal occasions. Tailored fit with premium finishing.',
    'Cotton pants': 'Comfortable cotton pants made from 100% cotton fabric. Ideal for everyday wear, casual outings, and relaxed settings. Breathable and easy to care for.',
    'Linen trousers': 'Lightweight linen trousers perfect for warm weather. Made from premium linen fabric that is breathable and comfortable. Great for summer events and casual occasions.'
  };
  
  return descriptions[category] || `High-quality ${category.toLowerCase()} designed for comfort and style.`;
}

async function createCategories() {
  console.log('Creating categories...');
  
  for (const [folderName, categoryData] of Object.entries(productCategories)) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({
        name: categoryData.categoryName,
        slug: categoryData.categorySlug,
        description: categoryData.description,
        image_url: `neon://${folderName}/img-1.jpg`
      }, { onConflict: 'slug' })
      .select();
    
    if (error) {
      console.error(`Error creating category ${categoryData.categoryName}:`, error);
    } else {
      console.log(`✅ Category created: ${categoryData.categoryName}`);
    }
  }
}

async function createProducts() {
  console.log('Creating products...');
  
  for (const [folderName, categoryData] of Object.entries(productCategories)) {
    // Get category ID
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categoryData.categorySlug)
      .single();
    
    if (!category) {
      console.error(`Category not found: ${categoryData.categoryName}`);
      continue;
    }
    
    // Create products for this category
    for (let i = 0; i < categoryData.imageCount; i++) {
      const productName = generateProductName(folderName, i);
      const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const price = categoryData.basePrice + (Math.random() * categoryData.priceVariation);
      const description = generateDescription(folderName, productName);
      
      // Generate image array (use first 4 images for gallery)
      const images = [];
      for (let j = 1; j <= Math.min(4, categoryData.imageCount); j++) {
        images.push(`neon://${folderName}/img-${j}.jpg`);
      }
      
      const { data, error } = await supabase
        .from('products')
        .upsert({
          name: productName,
          slug: slug,
          description: description,
          price: Math.round(price),
          category_id: category.id,
          image_url: `neon://${folderName}/img-${(i % categoryData.imageCount) + 1}.jpg`,
          images: images,
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
          featured: i < 3 // First 3 products in each category are featured
        }, { onConflict: 'slug' });
      
      if (error) {
        console.error(`Error creating product ${productName}:`, error);
      } else {
        console.log(`✅ Product created: ${productName}`);
      }
    }
  }
}

async function main() {
  try {
    await createCategories();
    await createProducts();
    console.log('🎉 All products created successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
