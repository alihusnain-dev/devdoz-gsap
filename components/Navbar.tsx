import React from 'react'
import gsap from "gsap"
import { AlignRightIcon } from './ui/align-right'

const Navbar = () => {

    return (
        <div className='w-full bg-transparent py-10 absolute z-2'>
            <div className='w-full h-full flex items-center justify-between px-[2vw]'>
                <h1 className='text-2xl font-bold'>DevDoz</h1>

                <div id="menu-icon" className='bg-primary text-black p-2 rounded-full'>
                    <AlignRightIcon />
                </div>
                <div id="navMenu" className='w-30% h-screen fixed top-0 right-0 w-[30%] bg-primary/50 backdrop-blur-md  '>

                    <div className='w-full h-full flex flex-col items-start justify-center px-10 text-black'>
                        <p className='text-[4vw] font-medium'>Menu</p>
                        <p className='text-[4vw] font-medium'>Services</p>
                        <p className='text-[4vw] font-medium'>Solutions</p>
                        <p className='text-[4vw] font-medium'>About</p>
                        <p className='text-[4vw] font-medium'>Contact</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Navbar