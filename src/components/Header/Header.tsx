import HeaderItem from './HeaderItem';

const Header = () => {
  return (
    <header className='flex max-w-6xl mx-auto p-4 justify-between items-center '>
      <h1 className='mx-2 md:text-xl lg:text-3xl'>Movie Application</h1>
      <div className=''>
        <HeaderItem title='Home' url='/' />
        <HeaderItem title='Browse' url='/movies' />
        <HeaderItem title='Favorites' url='/favorites' />
      </div>
    </header>
  );
};

export default Header;
