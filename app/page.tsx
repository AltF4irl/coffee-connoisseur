import Banner from '@/components/banner.client';
import Card from '@/components/card.server';
import { coffeeStores } from '@/lib/tempData';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Banner />
      <div className=''>
        <h2 className='my-8 text-4xl font-bold text-white'>Istanbul Coffee Shops</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores.map((store, index) => (
            <Card
              key={index}
              name={store.name}
              link={`/coffee-store/${store.name}-${index}`}
              imageUrl={store.imgUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
