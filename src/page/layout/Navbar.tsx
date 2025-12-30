import React from 'react';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const itemsNavbar = [{
        key: "Home",
        url: "#home"
    }, {
        key: "Jenis Karcis",
        url: "#karcis"
    }, {
        key: "Retribusi",
        url: "#retribusi"
    }, {
        key: "Pengelola",
        url: "#pengelola"
    }, {
        key: "Login",
        url: "/login"
    }]

    return (
        <nav className="w-screen relative overflow-x-hidden">
            <div className='relative h-min w-full'>
                <div className='w-full h-20 fixed z-50 bg-white border-b border-slate-200 shadow-md flex flex-row px-7 sm:px-10'>
                    <div className='w-1/2'>
                        <div className='flex flex-row gap-4 h-full items-center'>
                            <img className='w-20 h-min' src="logoku.png" alt="" />
                            <h3 className='hidden lg:block'>Sistem Retribusi Karcis DLH Cilegon</h3>
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-row justify-end'>
                        <div className='h-full w-min flex flex-row items-center gap-3'>
                            <ul className='hidden sm:flex flex-row gap-5 h-full justify-center items-center'>
                                {itemsNavbar.map((item) => (
                                    <a key={item.key} href={item.url} className='text-xl font-bold w-max transition-all hover:bg-lime-100 p-2 hover:rounded-md hover:text-lime-800'>{item.key}</a>
                                ))}
                            </ul>
                            <GiHamburgerMenu className='cursor-pointer block sm:hidden' onClick={() => setIsMobile(!isMobile)} size={25} />
                        </div>
                    </div>
                </div>
                <div className={`w-full sm:hidden overflow-hidden bg-white shadow-md fixed top-20 left-0 z-40 transition-all ${isMobile ? 'h-70 border-b' : 'h-0'}`}>
                    <ul className='flex flex-col items-center gap-4 h-min p-3 pt-5'>
                        {itemsNavbar.map((item) => (
                            <a key={item.key} href={item.url} onClick={() => setIsMobile(!isMobile)} className='text-xl size-full p-1 font-bold cursor-pointer text-center transition-all hover:bg-lime-50'>{item.key}</a>
                        ))}
                    </ul>

                </div>

            </div>
            <div onClick={() => setIsMobile(!isMobile)} className={`fixed ${isMobile ? 'block' : 'hidden'} inset-0 h-full z-30 w-full bg-transparent`}>

            </div>
        </nav>
    );
};

export default Navbar;