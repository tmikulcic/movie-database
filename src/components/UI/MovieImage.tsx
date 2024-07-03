'use client';

import { useState } from 'react';
import Image from 'next/image';

const MovieImage = ({ src, alt, width, height, clickable }: { src: string; alt: string; width: number; height: number; clickable: boolean }) => {
  const [imageError, setImageError] = useState(false);

  const imageClasses = clickable ? '' : 'rounded-bl-xl rounded-tl-xl';
  const containerClasses = clickable ? '' : 'rounded-bl-xl rounded-tl-xl overflow-hidden';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`relative ${containerClasses}`} style={{ width, height }}>
      {imageError ? (
        <div className='flex items-center justify-center bg-gray-200' style={{ width, height }}>
          <p className='text-xl text-gray-500'>Poster not found</p>
        </div>
      ) : (
        <Image
          className={`object-cover ${imageClasses}`}
          src={src}
          alt={alt}
          layout='fill'
          loading='lazy'
          objectFit='cover'
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default MovieImage;
