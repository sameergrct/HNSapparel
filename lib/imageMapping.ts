import { Product } from '@/types/database';
import { getNeonProductImage, getNeonProductGallery } from './neonImages';

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
  if (lower.includes('branded') && lower.includes('trouser')) return 'Branded trousers';
  if (lower.includes('cotton') || lower.includes('pant')) return 'Cotton pants';
  // default to trousers
  return 'Linen trousers';
}

export async function getProductImage(product: Product): Promise<string> {
  const folder = inferFolderFromName(product.name);
  const idx = hashStringToNumber(product.slug || product.id, 6);
  return await getNeonProductImage(folder, idx);
}

export async function getProductGallery(product: Product, count = 4): Promise<string[]> {
  const folder = inferFolderFromName(product.name);
  const baseIndex = hashStringToNumber(product.slug || product.id, 6);
  return await getNeonProductGallery(folder, count);
}

// Placeholder functions for backward compatibility (will show error state)
export function getLocalProductImage(product: Product): string {
  // Return a placeholder that will show an error state
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
}

export function getLocalProductGallery(product: Product, count = 4): string[] {
  // Return placeholder images
  const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
  return Array(count).fill(placeholder);
}


