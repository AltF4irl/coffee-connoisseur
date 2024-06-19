import Link from 'next/link';
import React from 'react';

export default function Page(props: {
  params: {id: string},
  searchParams: {id: string}
}) {
  return (
    <div className='min-h-screen'>
      <div>Current Coffee Place: {props.params.id}</div>
      <div className='m-auto grid max-w-full p-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4'>
        <div className="mb-2 mt-24 text-lg font-bold">
          <Link href="/">{'<-- Go Back Home'}</Link>
        </div>
      </div>
    </div>
  );
}
