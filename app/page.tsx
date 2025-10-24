import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

  // ✅ 4 fallback images for different categories
  const fallbackImages = [
    'https://shopduer.eu/cdn/shop/files/MSTS1013-LIVE-LITE-JOURNEY-SHORT-SAPPHIRE_7___FT_1.jpg?v=1741105380',
    'https://indusrobe.com/cdn/shop/files/men-s-grey-slim-fit-fleece-trousers-indusrobe-1.jpg?v=1714114730&width=600',
    'https://img.drz.lazcdn.com/static/pk/p/5f7d6f2e8ca06bac2eff789406fdf1a1.jpg_960x960q80.jpg_.webp',
    'https://www.sainly.com/cdn/shop/files/men_selegantweddingsuit-2023-08-11T161615.464_efd7af66-9df9-46d8-90ab-1e43f1f8b187_1024x1024.png?v=1691756385',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] md:h-[90vh] bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-tight">
                Affordable European-Style
                <span className="block mt-4 text-amber-100 font-light italic">
                  Fashion for Men
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                Redefining affordable fashion for the modern man since 2011.
                <span className="block mt-2">
                  Premium quality meets unbeatable pricing.
                </span>
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

      {/* FEATURED COLLECTIONS */}
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
              {categories.map((category, index) => {
                const imageUrl =
                  category.image_url || fallbackImages[index % fallbackImages.length];
                return (
                  <Link
                    key={category.id}
                    href={`/shop?category=${category.slug}`}
                    className="group relative overflow-hidden aspect-[3/4] rounded-2xl transition-all duration-500 hover:shadow-2xl"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-8 text-center">
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 tracking-wide">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-sm tracking-widest font-medium">
                          DISCOVER
                        </span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* OUR STORY SECTION */}
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

      {/* FEATURED PRODUCTS */}
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

      {/* NEWSLETTER SECTION */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
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
