import { fetchCoffeePlaces } from '@/lib/apiService';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const long = searchParams.get('long') || '';
    const lat = searchParams.get('lat') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 6;
    const longLat = {
      longitude: Number(long),
      latitude: Number(lat),
    };

    if (longLat && !isNaN(longLat.latitude) && !isNaN(longLat.longitude)) {
      const response = await fetchCoffeePlaces(longLat, page, limit);
      return NextResponse.json(response);
    }
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(`Something went wrong ${err.message}`, {
        status: 500,
      });
    }
  }
};
