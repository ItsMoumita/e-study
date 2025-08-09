import React from 'react';
import Hero from '../component/Hero';
import Features from '../component/Features';
import FaqSection from '../component/FaqSection';
import Testimonials from '../component/Testimonials';
import { Helmet } from 'react-helmet';
import HomeCourses from '../component/HomeCourses';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | E-Study</title>
            </Helmet>
            <Hero></Hero>
            <Features></Features>
            <HomeCourses></HomeCourses>
            <Testimonials></Testimonials>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;