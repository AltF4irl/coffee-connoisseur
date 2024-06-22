'use client';
import React from 'react';
import Image from 'next/image';

export default function Banner({onClickHandler}: {onClickHandler: () => void}) {
  // const onClickHandler = () => {};
  return (
    <div className='mb-12 grid lg:mb-24 lg:grid-cols-2'>
      <div className='z-20 flex flex-col px-2 md:pt-12'>
        <h1 className='my-2 flex-wrap'>
            <span className='pr-2 text-white'>Coffee</span>
            <span className='text-gray-900'>Connoisseur</span>
        </h1>
        <p className='font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-exl'>Discover Coffee Shops Near You!</p>
        <div className='mt-12'>
            <button onClick={onClickHandler}>View Stores Near me</button>
        </div>
      </div>
      <div className='absolute top-2 z-10 md:top-0 md:mt-12 md:pl-10 md:pt-0 lg:right-1/4 lg:flex lg:pl-20'>
            <Image 
                src='/static/hero-image.png'
                alt='Hero Image'
                width={800}
                height={300}
                priority
            />
        </div>
    </div>
  );
}
