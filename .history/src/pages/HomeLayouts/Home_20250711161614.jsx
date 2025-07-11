import React from 'react';
import HeroSection from './HeroSection/HeroSection';

const Home = () => {
    return (
        <div className='min-h-screen  mx-auto flex flex-col '>
            <HeroSection></HeroSection>
            <searchResults></searchResults>
        </div>
    );
};

export default Home;