'use client';

import { upvote } from '@/actions';
import Image from 'next/image';
import React from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-purple-951 min-w-[120px]"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <Image
          src="/static/icons/loading-spinner.svg"
          width="30"
          height="30"
          alt="Loading"
          className="m-auto"
        />
      ) : (
        'Up vote!'
      )}
    </button>
  );
}

export default function Upvote({ votes, id }: { votes: number; id: string }) {
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
        <SubmitButton />
      </form>
    </>
  );
}
