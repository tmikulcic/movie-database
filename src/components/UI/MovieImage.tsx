'use client';

import { useState } from 'react';
import Image from 'next/image';

const MovieImage = ({
  src,
  alt,
  width,
  height,
  clickable,
  isPriority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  clickable: boolean;
  isPriority?: boolean;
}) => {
  const [imageError, setImageError] = useState(false);

  const imageClasses = clickable ? '' : 'rounded-bl-xl rounded-tl-xl';
  const containerClasses = clickable ? '' : 'rounded-bl-xl rounded-tl-xl overflow-hidden';

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.classList.remove('opacity-0');
  };

  return (
    <div className={`relative ${containerClasses}`} style={{ width, height }}>
      {imageError ? (
        <div className='flex items-center justify-center bg-gray-200' style={{ width, height }}>
          <p className='text-xl text-gray-500'>Poster not found</p>
        </div>
      ) : (
        <Image
          className={`object-cover tansition-opacity opacity-0 duration-[1s] ${imageClasses}`}
          src={src}
          alt={alt}
          sizes='max-width: 768px'
          fill
          loading='lazy'
          onError={handleImageError}
          onLoad={handleImageLoad}
          priority={isPriority}
        />
      )}
    </div>
  );
};

export default MovieImage;
