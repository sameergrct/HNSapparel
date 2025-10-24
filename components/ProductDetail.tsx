'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/types/database";
import {
  getLocalProductGallery,
  getLocalProductImage,
  getProductGallery,
} from "@/lib/imageMapping";

interface ProductDetailProps {
  product: Product & { categories?: { name: string; slug: string } };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const loadNeonImages = async () => {
      try {
        const neonImages = await getProductGallery(product, 4);
        setImages(neonImages);
        setMainImage(neonImages[0]);
        setHasError(false);
      } catch (error) {
        console.error("Error loading Neon images:", error);
        setHasError(true);
        // Set placeholder images
        const placeholder =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+";
        setImages([placeholder]);
        setMainImage(placeholder);
      } finally {
        setIsLoading(false);
      }
    };

    loadNeonImages();
  }, [product]);

  // images already computed above

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image_url: product.image_url,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 group">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    mainImage === image
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-6">
          {product.categories && (
            <Link
              href={`/shop?category=${product.categories.slug}`}
              className="text-sm text-gray-600 hover:text-black transition-colors w-fit"
            >
              {product.categories.name}
            </Link>
          )}

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-black">
              PKR {product.price}
            </p>
          </div>

          {product.description && (
            <div className="prose prose-sm text-gray-600">
              <p className="leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full text-base"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>

          <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-medium text-black">Free delivery</span> on
              orders over PKR 2,000
            </p>
            <p>
              <span className="font-medium text-black">Easy returns</span>{" "}
              within 7 days
            </p>
            <p>
              <span className="font-medium text-black">Secure payment</span>{" "}
              with multiple options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
