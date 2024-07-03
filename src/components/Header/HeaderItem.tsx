import Link from 'next/link';

type HeaderItemProps = {
  title: string;
  url: string;
  isHoverable?: boolean; // New prop for hoverable behavior
};

const HeaderItem = ({ title, url, isHoverable = false }: HeaderItemProps) => {
  if (isHoverable) {
    return (
      <div className='relative'>
        <Link className='uppercase mx-2 md:text-xl lg:text-3xl hover:text-amber-500' href={url}>
          {title}
        </Link>
      </div>
    );
  } else {
    return (
      <Link className='uppercase mx-2 md:text-xl lg:text-3xl hover:text-amber-500' href={url}>
        {title}
      </Link>
    );
  }
};

export default HeaderItem;
