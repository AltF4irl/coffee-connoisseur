import { CoffePlace } from '@/types/types';
import { unsplash } from './unsplash.config';

export const fetchImageUrls = async (nbr: number, page: number = 1) => {
  try {
    const coffeeImages = await unsplash.search.getPhotos({
      query: 'coffee',
      page: page,
      perPage: nbr,
      orientation: 'portrait',
    });

    if (!coffeeImages.response) {
      throw new Error('No results for your query');
    }

    return coffeeImages.response.results.map((result, index) => {
      return result.urls.small;
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const fetchCoffeePlaces = async (coordinates: {longitude: number, latitude: number}, page: number = 0, limit: number) => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=caf%C3%A9&limit=${limit}&proximity=${coordinates.longitude}%2C${coordinates.latitude}&worldview=tr&access_token=${process.env.MAPBOX_KEY}`
    );

    const data = await res.json();
    const imageUrls = await fetchImageUrls(data.length, page);

    if (!imageUrls) {
      throw new Error('no images available');
    }

    return data.features.map(
      (feature: { properties: CoffePlace }, index: number) => {
        return {
          mapbox_id: feature.properties.mapbox_id,
          name: feature.properties.name,
          full_address: feature.properties.full_address,
          imageUrl: imageUrls[index],
        };
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error('Something went wrong', err.message);
    }
  }
};

export const fetchCoffeePlace = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${id}&proximity=ip&access_token=${process.env.MAPBOX_KEY}`
    );

    const data = await res.json();

    if (data.features.length === 0) {
      throw new Error('nothing in conresponding query');
    }
    const dataToReturn = data.features.map(
      (feature: { properties: CoffePlace }) => {
        return {
          mapbox_id: feature.properties.mapbox_id,
          name: feature.properties.name,
          full_address: feature.properties.full_address,
        };
      }
    )[0];

    return dataToReturn;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
