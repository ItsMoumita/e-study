import React from 'react';
import Hero from '../component/Hero';
import Features from '../component/Features';
import FaqSection from '../component/FaqSection';
import Testimonials from '../component/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;