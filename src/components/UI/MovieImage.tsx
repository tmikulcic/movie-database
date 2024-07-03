'use client';

import { useState } from 'react';
import Image from 'next/image';

const MovieImage = ({ src, alt, width, height, clickable }: { src: string; alt: string; width: number; height: number; clickable: boolean }) => {
  const [imageError, setImageError] = useState(false);

  const imageClasses = clickable ? 'p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' : 'rounded-bl-xl rounded-tl-xl';

  const errorClasses = `flex items-center justify-center bg-gray-200 ${
    clickable ? 'p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' : ''
  }`;

  return imageError ? (
    <div className={errorClasses} style={{ width, height }}>
      <p className='text-xl text-gray-500'>Poster not found</p>
    </div>
  ) : (
    <Image className={imageClasses} src={src} alt={alt} width={width} height={height} onError={() => setImageError(true)} />
  );
};

export default MovieImage;
