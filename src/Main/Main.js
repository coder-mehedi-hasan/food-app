import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <>
         <Navbar/>
         {/* <CartProvider> */}
         <Outlet></Outlet>  
         {/* </CartProvider> */}
        </>
    );
};

export default Main;