'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <form className='flex gap-4 mx-8 p-1 bg-neutral-100 border rounded-full ' onSubmit={handleSubmit}>
      <div className='flex p-1'>
        <input
          className='rounded-full p-2 pl-6 mx-2 w-96'
          type='search'
          id='search'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search...'
        />
        <button className='p-4 rounded-full bg-yellow-400 hover:bg-yellow-300' type='submit' disabled={!searchTerm}>
          <HiOutlineSearch size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
