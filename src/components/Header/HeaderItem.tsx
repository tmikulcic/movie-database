import Link from 'next/link';

type HeaderItemProps = {
  title: string;
  url: string;
  isHoverable?: boolean;
};

const HeaderItem = ({ title, url, isHoverable = false }: HeaderItemProps) => {
  const linkClass = `text-2xl hover:text-amber-500 ${isHoverable ? 'relative' : 'ml-4'}`;

  return (
    <Link className={linkClass} href={url}>
      {title}
    </Link>
  );
};

export default HeaderItem;
