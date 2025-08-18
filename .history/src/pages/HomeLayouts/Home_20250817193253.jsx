import React, { } from 'react';
import AllPosts from './AllPosts/AllPosts';
import AnnouncementSection from './AnnouncementSection/AnnouncementSection';
import HeroAndSearchSection from './heroAndSearchSection/heroAndSearchSection';

const Home = () => {


    return (
        <div className='min-h-screen  mx-auto flex flex-col'>
            <HeroAndSearchSection></HeroAndSearchSection>
            <AllPosts></AllPosts>
            <AnnouncementSection></AnnouncementSection>
        </div>
    );
};

export default Home;
