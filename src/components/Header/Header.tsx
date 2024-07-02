import HeaderItem from './HeaderItem';
import SearchBar from './Searchbar';

const Header = () => {
  return (
    <header className='flex max-w-6xl mx-auto p-4 items-center text-nowrap '>
      <h1 className='md:text-xl lg:text-3xl'>Movie Application</h1>
      <SearchBar />
      <div className=''>
        <HeaderItem title='Home' url='/' />
        <HeaderItem title='Browse' url='/movies' />
        <HeaderItem title='Favorites' url='/favorites' />
      </div>
    </header>
  );
};

export default Header;
