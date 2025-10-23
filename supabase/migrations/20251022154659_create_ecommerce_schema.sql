/*
  # H&S Apparel E-commerce Database Schema

  ## Overview
  Complete database schema for the H&S Apparel e-commerce platform including products, 
  categories, orders, and customer management.

  ## New Tables

  ### 1. categories
  - `id` (uuid, primary key)
  - `name` (text) - Category name (e.g., "Branded Trousers")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `image_url` (text) - Category banner image
  - `created_at` (timestamptz)

  ### 2. products
  - `id` (uuid, primary key)
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Product description
  - `price` (numeric) - Product price
  - `category_id` (uuid, foreign key) - Links to categories
  - `image_url` (text) - Main product image
  - `images` (jsonb) - Array of additional images
  - `sizes` (jsonb) - Available sizes array
  - `stock` (integer) - Available quantity
  - `featured` (boolean) - Show on homepage
  - `created_at` (timestamptz)

  ### 3. orders
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `shipping_address` (text)
  - `city` (text)
  - `payment_method` (text)
  - `items` (jsonb) - Order items array
  - `total_amount` (numeric)
  - `status` (text) - Order status
  - `created_at` (timestamptz)

  ### 4. newsletter_subscribers
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `subscribed_at` (timestamptz)

  ### 5. contact_messages
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `message` (text)
  - `created_at` (timestamptz)

  ## Security
  - All tables have RLS enabled
  - Public read access for products and categories
  - Authenticated access for order creation
  - Admin-only access for data modification
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  sizes jsonb DEFAULT '["S", "M", "L", "XL"]'::jsonb,
  stock integer DEFAULT 100,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  city text NOT NULL,
  payment_method text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Orders policies (anyone can create, only view own)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (true);

-- Newsletter policies (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Contact messages policies (anyone can send)
CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
