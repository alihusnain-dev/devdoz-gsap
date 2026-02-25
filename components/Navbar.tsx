'use client'
import React, { useEffect } from 'react'
import gsap from "gsap"
import { AlignRightIcon } from './ui/align-right'
import { XIcon } from './ui/x'

const Navbar = () => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const menuIcon = document.querySelector("#menu-icon");
            const navMenu = document.querySelector("#navMenu");
            const closeIcon = document.querySelector("#close-icon");

            // Set initial state
            gsap.set(navMenu, { xPercent: 100 });

            const tl = gsap.timeline({ paused: true });

            tl.to(navMenu, {
                xPercent: 0,
                duration: 0.3,
                ease: "power3.out",
            }).from(closeIcon, {
                opacity: 0,
                rotate: 180,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            })
                .from("#navLinks p", {
                    x: 100,
                    opacity: 0,
                    duration: 0.2,
                    stagger: 0.2,
                    ease: "power2.out"
                });


            menuIcon?.addEventListener("click", () => {
                tl.play();
            });
            closeIcon?.addEventListener("click", () => {
                tl.reverse();
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className='w-full bg-transparent py-8 absolute z-50'>
            <div className='w-full flex items-center justify-between px-[4vw]'>
                <h1 className='text-2xl font-bold text-white uppercase tracking-tighter'>DevDoz</h1>

                <div id="menu-icon" className='bg-primary text-black p-3 rounded-full cursor-pointer hover:scale-110 transition-transform'>
                    <AlignRightIcon />
                </div>

                <div id="navMenu" className='h-screen fixed top-0 right-0 w-full sm:w-[400px] bg-primary/50 backdrop-blur-2xl flex flex-col'>
                    <div id="close-icon" className='text-3xl bg-primary text-black p-3 rounded-full cursor-pointer hover:scale-110 transition-transform absolute top-10 right-20 z-2'>
                        <XIcon />
                    </div>

                    <div id='navLinks' className='w-full h-full flex flex-col items-start justify-center px-12 gap-6 text-black'>
                        {['Menu', 'Services', 'Solutions', 'About', 'Contact'].map((item) => (
                            <p key={item} className='text-[10vw] sm:text-[40px] md:text[12vw] font-bold cursor-pointer hover:text-primary transition-colors'>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar