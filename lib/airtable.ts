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
      ...record.fields,
      recordId: record.id,
    };
  });

  console.log(allRecords);

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
          ...store.fields,
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
