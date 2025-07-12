import React, { useState } from 'react';
import HeroSection from './HeroSection/HeroSection';
import SearchResults from './SearchResults/SearchResults';

const Home = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);

    return (
        <div className='min-h-screen mx-auto flex flex-col'>
            <HeroSection
                setSearchResult={setSearchResult}
                setSearchLoading={setSearchLoading}
                setSearchError={setSearchError}
            />
            {/* Search Result shown below Hero */}
            <SearchResults
                results={searchResult}
                isLoading={searchLoading}
                isError={searchError}
            />
            <
        </div>
    );
};

export default Home;
