import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center px-6 sm:px-16 py-4"></nav>
    </header>
  );
};

export default Navbar;
