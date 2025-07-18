import React from 'react';
import Hero from '../component/Hero';
import Features from '../component/Features';
import FaqSection from '../component/FaqSection';
import Testimonials from '../component/Testimonials';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | E-Study</title>
            </Helmet>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;