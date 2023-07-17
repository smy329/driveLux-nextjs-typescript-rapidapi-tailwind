// this page has a onSubmit which is browser event, that means it should a client side rendering event
'use client';

import { useState } from 'react';
import SearchManufacturer from './SearchManufacturer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  console.log(manufacturer, 'is selected');
  const router = useRouter();

  const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`z-10 -ml-3 ${otherClasses}`}>
      <Image src="magnifying-glass.svg" alt="search button" width={40} height={40} className="object-contain" />
    </button>
  );
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      return alert('Please write something on search bar');
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }
    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default Searchbar;
