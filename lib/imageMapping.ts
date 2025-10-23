import { Product } from '@/types/database';

function hashStringToNumber(input: string, modulo: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const positive = Math.abs(hash);
  return (positive % modulo) + 1; // 1..modulo
}

function inferFolderFromName(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('short')) return 'Branded shorts';
  if (lower.includes('linen')) return 'Linen trousers';
  if (lower.includes('branded') && lower.includes('trouser')) return 'Branded trouser';
  if (lower.includes('cotton') || lower.includes('pant')) return 'cotton pants';
  // default to trousers
  return 'Linen trousers';
}

export function getLocalProductImage(product: Product): string {
  // Always use local assets instead of database images
  const folder = inferFolderFromName(product.name);
  const idx = hashStringToNumber(product.slug || product.id, 6);
  return `/assests/${folder}/img-${idx}.jpg`;
}

export function getLocalProductGallery(product: Product, count = 4): string[] {
  const folder = inferFolderFromName(product.name);
  const baseIndex = hashStringToNumber(product.slug || product.id, 6);
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = ((baseIndex + i - 1) % 6) + 1; // 1..6 wrap
    images.push(`/assests/${folder}/img-${idx}.jpg`);
  }
  return images;
}


