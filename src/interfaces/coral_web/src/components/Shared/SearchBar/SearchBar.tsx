// src/components/Shared/SearchBar/SearchBar.tsx
import React, { useState } from 'react';

type Props = {
  className?: string;
};

export const SearchBar: React.FC<Props> = ({ className }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', query);
    // Add your search logic here
  };

  return (
    // old search bar
    // <div className={`flex items-center ${className}`}>
    //   <input
    //     type="text"
    //     value={query}
    //     onChange={handleInputChange}
    //     placeholder="Search..."
    //     className="flex-grow px-4 py-2 border border-gray-300 rounded-l"
    //   />
    //   <button
    //     onClick={handleSearch}
    //     className="px-4 py-2 text-white bg-blue-500 rounded-r"
    //   >
    //     Search
    //   </button>
    // </div>

  <div className={`flex items-center ${className}`}>

      <form action="/search" className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
        <input 
          type="text" 
          placeholder="Sök här..." 
          className="flex-grow p-2 border rounded-md"
        />
        <button 
          type="submit" 
          className="w-full md:w-auto px-8 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
        >
          <div className="flex items-center transition-all opacity-1">
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
              Search
            </span>
          </div>
        </button>
      </form> 

    <svg viewBox="0 0 1024 1024"
            class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7">
            </circle>
            <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stop-color="#3b82f6"></stop>
                    <stop offset="1" stop-color="#1d4ed8"></stop>
                </radialGradient>
            </defs>
        </svg>
  </div>
    
  );
};


