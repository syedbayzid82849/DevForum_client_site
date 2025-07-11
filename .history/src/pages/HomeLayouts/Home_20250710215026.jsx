import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import AllTagsSection from './AllTagsSection/AllTagsSection';

const Home = () => {
    return (
        <div className='min-h-screen max-w-7xl mx-auto flex flex-col px-4 lg:px-7 '>
            <HeroSection></HeroSection>
            <AllTagsSection></AllTagsSection>
        </div>
    );
};

export default Home;