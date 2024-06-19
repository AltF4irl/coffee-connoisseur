import Banner from '@/components/banner.client';
import Card from '@/components/card.server';
import { fetchCoffeePlaces } from '@/lib/apiService';
import { CoffePlace } from '@/types/types';

export default async function Home() {
  const coffeeStores = await fetchCoffeePlaces();
  console.log(coffeeStores);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Banner />
      <div className=''>
        <h2 className='my-8 text-4xl font-bold text-white'>Paris Coffee Shops</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((store: CoffePlace, index: number) => (
            <Card
              key={store.mapbox_id}
              name={store.name}
              link={`/coffee-store/${store.mapbox_id}-${index}`}
              imageUrl={store.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
