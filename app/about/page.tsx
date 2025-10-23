import { Button } from '@/components/ui/button';
import { Award, Heart, ShieldCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Story
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a single room to multiple locations, H&S Apparel has been redefining
            affordable fashion for men across Karachi since 2011.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                What Began in a Small Room
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In 2011, H&S Apparel started with a simple vision: to bring European-inspired
                  fashion to Pakistani men at prices that don't break the bank. What began as
                  a modest operation in a small room has now grown into one of Karachi's most
                  trusted menswear brands.
                </p>
                <p>
                  Our founder recognized a gap in the market—men wanted quality clothing with
                  contemporary designs, but most options were either too expensive or lacked
                  the style they desired. H&S Apparel was born to bridge that gap.
                </p>
                <p>
                  Over the years, we've served thousands of satisfied customers, expanded to
                  multiple retail locations across Karachi, and built a reputation for reliability,
                  quality, and unbeatable value.
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-6xl font-bold">H&S</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Premium Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                European-inspired designs crafted with attention to detail and superior materials.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Unbeatable Pricing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Affordable fashion that doesn't compromise on style or quality.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Customer Trust</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Building lasting relationships through honest service and reliable products.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-black">Consistency</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Delivering the same high standards across all our products and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Our Product Range
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From formal trousers to casual shorts, we offer a complete wardrobe solution
              for the modern man who values both style and affordability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { name: 'Branded Trousers', desc: 'Premium formal wear for the professional man' },
                { name: 'Cotton Pants', desc: 'Comfortable everyday essentials' },
                { name: 'Linen Trousers', desc: 'Breathable style for warm weather' },
                { name: 'Branded Shorts', desc: 'Casual comfort meets contemporary design' },
              ].map((item) => (
                <div key={item.name} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join the H&S Family
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of European style, premium quality, and unbeatable
            prices. Visit our stores or shop online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-black text-black hover:bg-gray-400 hover:text-black">
              <Link href="/stores">Visit Our Stores</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
