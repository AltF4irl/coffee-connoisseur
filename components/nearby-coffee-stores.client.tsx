'use client';
import { useTrackLocation } from '@/hooks/useTrackLocation';
import Banner from './banner.client';
import { CoffePlace } from '@/types/types';
import Card from './card.server';
import { useEffect, useState } from 'react';
import { fetchCoffeePlaces } from '@/lib/apiService';

export default function NearbyCoffeStores() {
  const [coffeStores, setCoffeStores] = useState([]);
  const {
    handleTrackLocation,
    isLoacationLoading,
    locationErrorMessage,
    longLat,
  } = useTrackLocation();
  const buttonContent = isLoacationLoading
    ? 'Locating...'
    : 'View Coffee Shops Near Me';

  const onClickHandler = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const generateShops  = async () => {
        try {
            if (longLat) {
                const res = await fetchCoffeePlaces(longLat, 2);
                setCoffeStores(res);
                console.log(res);
            } else {
                throw new Error('Coordinates are not provided.');
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    };
    generateShops();
  }, [longLat])

  return (
    <div>
      <Banner
        onClickHandler={onClickHandler}
        buttonContent={buttonContent}
      />
      {longLat && `Location: ${longLat.longitude}, ${longLat.latitude}`}
      {locationErrorMessage && <p>Error: {locationErrorMessage}</p>}
      <div>
        <h2 className="my-8 text-4xl font-bold text-white">
          Coffee Shops Near Me
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeStores.map((store: CoffePlace) => (
            <Card
              key={store.mapbox_id}
              name={store.name}
              link={`/coffee-store/${store.mapbox_id}`}
              imageUrl={store.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
