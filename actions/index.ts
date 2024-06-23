'use server';

import { updateCoffeeStore } from '@/lib/airtable';
import { revalidatePath } from 'next/cache';

export const upvote = async (id: string) => {
  try {
    await updateCoffeeStore(id);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  revalidatePath(`/coffee-store/${id}`);
};
