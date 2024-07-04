'use client';

import Link from 'next/link';

const ErrorPage = () => {
  const handleReload = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className='flex flex-col items-center justify-center mt-12 p-4'>
      <h1 className='text-4xl font-bold mb-4'>Oops! Something went wrong.</h1>
      <p className='text-xl mb-4'>We couldn&apos;t load the requested page.</p>
      <a href='/' onClick={handleReload} className='mt-2 text-blue-500 underline'>
        Reload current page
      </a>
      <Link href='/' className='mt-2 text-blue-500 underline'>
        Or go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
