import Link from 'next/link';

type HeaderItemProps = {
  title: string;
  url: string;
};

const HeaderItem = ({ title, url }: HeaderItemProps) => {
  return (
    <Link className='uppercase mx-2 md:text-xl lg:text-3xl hover:text-amber-500' href={url}>
      {title}
    </Link>
  );
};

export default HeaderItem;
