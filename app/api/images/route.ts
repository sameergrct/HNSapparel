import { NextRequest, NextResponse } from 'next/server';
import { getImagesByCategory, getImageByName } from '@/lib/neonImages';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const name = searchParams.get('name');

    if (category) {
      const images = await getImagesByCategory(category);
      return NextResponse.json({ images });
    }

    if (name) {
      const image = await getImageByName(name);
      return NextResponse.json({ image });
    }

    return NextResponse.json({ error: 'Missing category or name parameter' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
