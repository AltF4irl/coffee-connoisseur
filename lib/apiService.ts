import { CoffePlace } from '@/types/types';

export const fetchCoffeePlaces = async () => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=caf%C3%A9&country=fr&limit=6&proximity=2.350083309599455%2C48.85438887421063&worldview=tr&access_token=${process.env.MAPBOX_KEY}`
    );

    const data = await res.json();

    return data.features.map((feature: { properties: CoffePlace }) => {
      return {
        mapbox_id: feature.properties.mapbox_id,
        name: feature.properties.name,
        full_address: feature.properties.full_address,
        imageUrl:
          'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80',
      };
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Something went wrong', err.message);
    }
  }
};
