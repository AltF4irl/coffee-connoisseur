import { CoffePlacev2 } from '@/types/types';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  'appV85WmXABpIaD8i'
);

const table = base('coffee-shops');

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  const allRecords = findRecords.map((record) => {
    return {
      name: record.fields.name,
      id: record.fields.id,
      imageUrl: record.fields.imageUrl,
      address: record.fields.address,
      votes: record.fields.votes,
      recordId: record.id,
    };
  });

  return allRecords;
};

export const createCoffeeStore = async (object: CoffePlacev2) => {
  try {
    const records = await findRecordByFilter(object.id);

    if (records.length === 0) {
      const stores = await table.create([
        {
          fields: {
            ...object,
            votes: object.votes || 0,
          },
        },
      ]);

      return stores.map((store) => {
        return {
          name: store.fields.name,
          id: store.fields.id,
          imageUrl: store.fields.imageUrl,
          address: store.fields.address,
          votes: store.fields.votes,
          recordId: store.id,
        };
      })[0];
    } else {
      return records[0];
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('something went wrong');
    }
  }
};

export const updateCoffeeStore = async (id: string) => {
  const store = await findRecordByFilter(id);

  if (store.length > 0) {
    try {
      await table.update([
        {
          id: store[0].recordId,
          fields: {
            votes: (store[0].votes as number) + 1,
          },
        },
      ]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  } else {
    console.error("Record Id Doesn't Match");
  }
};
