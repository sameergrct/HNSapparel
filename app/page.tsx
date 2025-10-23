import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';
import { Product, Category } from '@/types/database';

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(8);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data || []) as Product[];
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return (data || []) as Category[];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width Banner with Elegant Overlay */}
      <section className="relative h-[85vh] md:h-[90vh] bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        {/* Hero Image Placeholder - Replace with actual hero image */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>
<div className="relative z-20 h-full flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-tight">
                Affordable European-Style
                <span className="block mt-4 text-amber-100 font-light italic">Fashion for Men</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                Redefining affordable fashion for the modern man since 2011.
                <span className="block mt-2">Premium quality meets unbeatable pricing.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-black hover:bg-amber-50 transition-all duration-300 px-10 py-6 text-base font-medium tracking-wider border-2 border-white hover:border-amber-100"
                >
                  <Link href="/shop">
                    EXPLORE COLLECTION
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-black hover:bg-amber-50 transition-all duration-300 px-10 py-6 text-base font-medium tracking-wider border-2 border-white hover:border-amber-100"
                >
                  <Link href="/stores">FIND A STORE</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </section>
      {/* Featured Collections - Grid Layout with Overlay */}
      {categories.length > 0 && (
        <section className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block">
                <div className="h-px w-16 bg-black mb-6 mx-auto" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black tracking-wide mb-4">
                  Featured Collections
                </h2>
                <div className="h-px w-16 bg-black mt-6 mx-auto" />
              </div>
              <p className="text-gray-600 text-lg font-light tracking-wide mt-8">
                Explore our curated selection of premium menswear
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="group relative overflow-hidden bg-black aspect-[3/4] transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                        <span className="text-7xl font-serif text-white/20">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 tracking-wide">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                        {category.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-sm tracking-widest font-medium">DISCOVER</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Story Section - Elegant Typography */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-10">
            <div className="inline-block">
              <div className="h-px w-16 bg-amber-800 mb-6 mx-auto" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black tracking-wide">
                Our Story
              </h2>
              <div className="h-px w-16 bg-amber-800 mt-6 mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto space-y-8 text-gray-700 text-lg md:text-xl leading-relaxed font-light">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-amber-900">
                What began in a small room in 2011 has grown into one of Karachi's most trusted
                men's fashion brands. H&S Apparel was founded with a simple mission: to bring
                European-inspired design and premium quality to Pakistan at prices everyone can afford.
              </p>
              <p className="pt-4">
                Today, we serve thousands of satisfied customers across multiple locations,
                offering everything from branded trousers and cotton pants to linen trousers
                and designer shorts. Our commitment to quality, affordability, and customer
                satisfaction remains stronger than ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Featured Products - Fashion E-commerce Style */}
      {featuredProducts.length > 0 && (
        <section className="py-24 md:py-32 bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
              <div>
                <div className="h-px w-16 bg-amber-800 mb-6" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black tracking-wide mb-3">
                  Featured Products
                </h2>
                <p className="text-gray-600 text-lg font-light tracking-wide">
                  Our most popular items this season
                </p>
              </div>
              <Button
                variant="outline"
                asChild
                className="hidden sm:flex border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-6 text-sm tracking-widest font-medium"
              >
                <Link href="/shop">VIEW ALL</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center sm:hidden">
              <Button
                variant="outline"
                asChild
                className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-6 text-sm tracking-widest font-medium"
              >
                <Link href="/shop">VIEW ALL PRODUCTS</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section - Premium Dark Section */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="h-px w-16 bg-amber-600 mb-6 mx-auto" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide">
                Stay Updated
              </h2>
              <div className="h-px w-16 bg-amber-600 mt-6 mx-auto" />
            </div>

            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.
            </p>

            <div className="pt-6">
              <NewsletterForm />
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex items-center justify-center gap-2 text-sm text-gray-400 font-light tracking-wide">
              <span className="inline-block w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
              <span>Join 10,000+ fashion enthusiasts</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/*
  IMPORTANT: Add these styles to your global CSS file or tailwind.config.js:

  1. Add Google Fonts to your index.html or layout:
     <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

  2. Add to your tailwind.config.js:
     theme: {
       extend: {
         fontFamily: {
           serif: ['Playfair Display', 'serif'],
           sans: ['Inter', 'sans-serif'],
         },
         keyframes: {
           'fade-in': {
             '0%': { opacity: '0', transform: 'translateY(20px)' },
             '100%': { opacity: '1', transform: 'translateY(0)' },
           },
         },
         animation: {
           'fade-in': 'fade-in 1.2s ease-out',
         },
       },
     }

  Or add to your global CSS:
     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

     @keyframes fade-in {
       from {
         opacity: 0;
         transform: translateY(20px);
       }
       to {
         opacity: 1;
         transform: translateY(0);
       }
     }

     .animate-fade-in {
       animation: fade-in 1.2s ease-out;
     }

     .font-serif {
       font-family: 'Playfair Display', serif;
     }
*/
