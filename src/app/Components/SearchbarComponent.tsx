'use client';
import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';

const SearchbarComponent = () => {
    return (
        <div className='pb-14'>
            <div className='flex flex-row gap-3 justify-center items-center searchbarBackground h-20'>
                <input className='searchInputBackground border-none rounded-lg text-sm h-10' id='search' type="text" placeholder='Search for a city' />
                <button className='py-2 px-4 h-10 rounded-lg text-sm searchButtonBackground border-none'>Search</button>
            </div>
        </div>
    )
}

export default SearchbarComponent
