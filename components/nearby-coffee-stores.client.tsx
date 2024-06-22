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
    const generateShops = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/coffee-stores?long=${
            longLat?.longitude
          }&lat=${longLat?.latitude}&page=${2}&limit=${12}`
        );
        setCoffeStores(await res.json());
        console.log(await res.json());
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    generateShops();
  }, [longLat]);

  return (
    <>
      <Banner
        onClickHandler={onClickHandler}
        buttonContent={buttonContent}
      />
      {/* {locationErrorMessage && <p>Error: {locationErrorMessage}</p>} */}
      {coffeStores.length > 0 && (
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
      )}
    </>
  );
}
