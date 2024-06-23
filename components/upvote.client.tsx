'use client';

import { upvote } from '@/actions';
import Image from 'next/image';
import React from 'react';

export default function Upvote({ votes, id }: { votes: number, id: string }) {
  const handleOnClick = () => {
    console.log('clicked');
  };

  const upvoteWithId = upvote.bind(null, id);
  return (
    <>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{votes}</p>
      </div>

      <form action={upvoteWithId}>
        <button>Up vote!</button>
      </form>
    </>
  );
}
