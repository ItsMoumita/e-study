import React from 'react';
import Hero from '../component/Hero';
import Features from '../component/Features';
import FaqSection from '../component/FaqSection';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Features></Features>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;