import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-152px)]'>
                <Outlet/>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;