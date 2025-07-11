import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import AllTagsSection from './AllTagsSection/AllTagsSection';

const Home = () => {
    return (
        <div className='min-h-screen  mx-auto flex flex-col  '>
            <HeroSection></HeroSection>
            <AllTagsSection></AllTagsSection>
        </div>
    );
};

export default Home;