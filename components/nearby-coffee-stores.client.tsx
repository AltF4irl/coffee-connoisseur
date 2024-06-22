'use client';
import { useTrackLocation } from '@/hooks/useTrackLocation';
import Banner from './banner.client';

export default function NearbyCoffeStores() {
  const { handleTrackLocation } = useTrackLocation();

  const onClickHandler = () => {
    handleTrackLocation();
  }
  return (
    <div>
      <Banner onClickHandler={onClickHandler} />
    </div>
  );
}
