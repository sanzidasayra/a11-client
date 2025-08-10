import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = () => {
    return (
        <div>
            <div className='w-8/12 mx-auto'>
                <Navbar></Navbar>
            </div>
                <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;