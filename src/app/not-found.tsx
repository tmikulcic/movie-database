'use client';

import Link from 'next/link';

const NotFound = () => {
  return (
    <main className='flex flex-col items-center justify-center mt-12 p-4'>
      <h1 className='text-4xl font-bold mb-4'>Oops! Something went wrong.</h1>
      <p className='text-xl mb-4'>We couldn&apos;t load the requested page.</p>
      <Link href='/' className='mt-2 text-blue-500 underline'>
        Go back to the homepage
      </Link>
    </main>
  );
};

export default NotFound;
