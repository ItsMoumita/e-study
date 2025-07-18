import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';
import Navbar from '../component/navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-153px)]'>
                <Outlet/>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;