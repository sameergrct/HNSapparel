import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductDetail from '@/components/ProductDetail';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/database';

async function getProduct(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as any;
}

async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', currentProductId)
    .limit(4);

  return (data || []) as Product[];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category_id
    ? await getRelatedProducts(product.category_id, product.id)
    : [];

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />

      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
