import Card from '@/components/card.server';
import { fetchCoffeePlaces, fetchImageUrls } from '@/lib/apiService';
import { CoffePlace } from '@/types/types';
import NearbyCoffeStores from '@/components/nearby-coffee-stores.client';



export default async function Home() {
  const parisCoordinates = {
    longitude: 2.350083309599455,
    latitude: 48.85438887421063,
  }

  const coffeeStores = await fetchCoffeePlaces(parisCoordinates, 1, 6);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NearbyCoffeStores />
      <div>
        <h2 className='my-8 text-4xl font-bold text-white'>Coffee Shops Arround the world</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((store: CoffePlace, idx: number) => (
            <Card
              key={store.mapbox_id}
              name={store.name}
              link={`/coffee-store/${store.mapbox_id}`}
              imageUrl={store.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
