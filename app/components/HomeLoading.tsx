'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';

const HomeLoading = () => {
    const [count, setCount] = useState('0');
    const textRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                const newCount = parseInt(prevCount) + 1;
                if (newCount >= 100) {
                    clearInterval(interval);
                }
                return newCount.toString();
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: -900,
                opacity: 0,
                duration: 1,
            });
        });

        return () => ctx.revert();
    }, []);
    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-primary z-100'>
            <div className='w-full h-full p-[1vw] flex items-end justify-end'>
                <p ref={textRef} className='text-[20vw] text-black leading-[0.85]'>
                    {count}%
                </p>
            </div>
        </div>
    )
}

export default HomeLoading