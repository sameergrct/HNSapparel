import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'H&S Apparel - Affordable European-Style Fashion for Men',
  description: 'Discover premium quality men\'s fashion at unbeatable prices. European-inspired designs including branded trousers, cotton pants, linen trousers, and shorts. Based in Karachi since 2011.',
  keywords: 'men fashion, European style, affordable clothing, trousers, pants, shorts, Karachi, Pakistan',
  openGraph: {
    title: 'H&S Apparel - Affordable European-Style Fashion for Men',
    description: 'Discover premium quality men\'s fashion at unbeatable prices.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
