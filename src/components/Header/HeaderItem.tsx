import Link from 'next/link';

type HeaderItemProps = {
  title: string;
  url: string;
  isHoverable?: boolean;
};

const HeaderItem = ({ title, url, isHoverable = false }: HeaderItemProps) => {
  if (isHoverable) {
    return (
      <div className='relative'>
        <Link className=' md:text-xl lg:text-3xl hover:text-amber-500' href={url}>
          {title}
        </Link>
      </div>
    );
  } else {
    return (
      <Link className=' ml-6 md:text-xl lg:text-3xl hover:text-amber-500' href={url}>
        {title}
      </Link>
    );
  }
};

export default HeaderItem;
