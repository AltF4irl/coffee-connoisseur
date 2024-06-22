import Card from '@/components/card.server';
import { fetchCoffeePlaces } from '@/lib/apiService';
import { CoffePlace } from '@/types/types';
import { unsplash } from '@/lib/unsplash.config';
import NearbyCoffeStores from '@/components/nearby-coffee-stores.client';



export default async function Home() {
  const coffeeImgaes = await unsplash.search.getPhotos({
    query: 'coffee',
    page: 1,
    perPage: 6,
    orientation: 'portrait',
  });
  const coffeeStores = await fetchCoffeePlaces();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NearbyCoffeStores />
      <div className=''>
        <h2 className='my-8 text-4xl font-bold text-white'>Paris Coffee Shops</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((store: CoffePlace) => (
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
