import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">H&S APPAREL</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Affordable European-style fashion for men since 2011. Quality you can trust, prices you can afford.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Our Stores
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=branded-trousers" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Branded Trousers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=cotton-pants" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cotton Pants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=linen-trousers" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Linen Trousers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=branded-shorts" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Branded Shorts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:03009227425" className="text-sm text-gray-400 hover:text-white transition-colors">
                  0300-9227425
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:career@hnsapparel.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  career@hnsapparel.com
                </a>
              </li>
              <li className="flex items-center space-x-4 mt-4">
                <a
                  href="https://facebook.com/hsapparelco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/hsapparelco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} H&S Apparel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
