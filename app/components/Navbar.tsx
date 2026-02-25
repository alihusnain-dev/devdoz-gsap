import React from 'react'
import gsap from "gsap"

const Navbar = () => {

    return (
        <div className='w-full bg-transparent py-10 absolute'>
            <div className='w-full h-full flex items-center justify-between px-[2vw]'>
                <div className='w-1/2'>
                    <h1 className='text-2xl font-bold'>DevDoz</h1>
                </div>
                <div className='w-1/2'>
                    <ul className='flex items-center justify-end gap-10'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>


        </div>
    )
}

export default Navbar