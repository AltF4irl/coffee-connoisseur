import { CoffePlace } from '@/types/types';
import { unsplash } from './unsplash.config';

const fetchImageUrls = async () => {
  try {
    const coffeeImages = await unsplash.search.getPhotos({
      query: 'coffee',
      page: 1,
      perPage: 6,
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

let mapboxIdToImageUrl: {
  mapbox_id: string;
  imageUrl: string;
}[] = [];

export const fetchCoffeePlaces = async () => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=caf%C3%A9&country=fr&limit=6&proximity=2.350083309599455%2C48.85438887421063&worldview=tr&access_token=${process.env.MAPBOX_KEY}`
    );

    const data = await res.json();
    const imageUrls = await fetchImageUrls();

    if (!imageUrls) {
      throw new Error('no images available');
    }

    mapboxIdToImageUrl = [];

    return data.features.map(
      (feature: { properties: CoffePlace }, index: number) => {
        mapboxIdToImageUrl.push({
          mapbox_id: feature.properties.mapbox_id,
          imageUrl: imageUrls[index],
        });

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
    if (!mapboxIdToImageUrl) {
      throw new Error();
    }
    const imageUrl = mapboxIdToImageUrl.find(
      (object) => object.mapbox_id === id
    )?.imageUrl;

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
          imageUrl: imageUrl,
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
