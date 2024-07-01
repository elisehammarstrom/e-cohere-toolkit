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
    <div className={"flex items-center w-3/4"}>
        <form action="/search" className="mx-auto mt-8 bg-white relative w-full flex flex-col md:flex-row items-center justify-center py-2 px-2 rounded-2xl gap-4 box-shadow shadow-xl shadow-mindapricot focus-within:border-gray-300 border-opacity-50 border border-mindapricot">
          <input 
            type="text" 
            placeholder="Sök här..." 
            className="flex-grow p-4 rounded-2xl text-xl border-opacity-30 border border-gray-300"
          />
          <button 
            type="submit" 
            className="w-full md:w-auto px-8 py-3 bg-mindorange border-mindorange text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
          >
            <div className="flex items-center transition-all opacity-1">
              <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Sök
              </span>
            </div>
          </button>
        </form> 
    </div>
      
  );
};


