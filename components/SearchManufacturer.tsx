'use client';
import { manufacturers } from '@/constants';
import { SearchManufacturerProps } from '@/types';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturer =
    query === ''
      ? manufacturers
      : manufacturers.filter(
          (item) =>
            item
              .toLowerCase()
              .replace(/\s+/g, '') //It is used to remove all whitespace characters from a string.
              .includes(query.toLowerCase().replace(/\s+/g, '')) //It is used to remove all whitespace characters from a string.
        );
  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image src="car-logo.svg" width={20} height={20} alt="Car Logo" />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery('');
            }}
          >
            <Combobox.Options>
              {/* what will happen when use enters such a word which is not available in our manufacturer list: what we can simplify the condition 'filteredManufacturer length is 0 but query is not empty' */}
              {filteredManufacturer.length === 0 && query !== '' ? (
                <Combobox.Option value={query} className="search-manufacturer__option">
                  {/* Create {query} */}
                  Nothing found
                </Combobox.Option>
              ) : (
                filteredManufacturer.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`
                    }
                  >
                    {item}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
