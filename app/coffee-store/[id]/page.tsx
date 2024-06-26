import { createCoffeeStore } from '@/lib/airtable';
import { fetchCoffeePlace } from '@/lib/apiService';
import Upvote from '@/components/upvote.client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function Page(props: {
  params: { id: string };
  searchParams: { id: string };
}) {
  const { name, full_address, imageUrl } = await fetchCoffeePlace(
    props.params.id
  );
  const formatedStore = {
    id: props.params.id,
    name,
    address: full_address,
    imageUrl,
  };
  const createdCoffeeStore = await createCoffeeStore(formatedStore);
  const formatedStoreWithVote = {
    ...formatedStore,
    votes: (createdCoffeeStore?.votes as number) || 0,
    imageUrl: createdCoffeeStore?.imageUrl as string,
  };

  return (
    <div className="h-full min-h-screen pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={
              formatedStoreWithVote.imageUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={'Coffee Store Image'}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {full_address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{full_address}</p>
            </div>
          )}

          <Upvote
            votes={formatedStoreWithVote.votes}
            id={props.params.id}
          />
        </div>
      </div>
    </div>
  );
}
