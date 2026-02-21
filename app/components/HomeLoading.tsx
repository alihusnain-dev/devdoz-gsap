'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';

const HomeLoading = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const textRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevCount + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation
            gsap.from(textRef.current, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Seperate effect for the exit to handle the state change when count reaches 100
    useEffect(() => {
        if (count === 100 && containerRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                    onComplete();
                }
            });

            tl.to(textRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in",
                delay: 0.5 // small pause at 100%
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, "-=0.4");
        }
    }, [count, onComplete]);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className='fixed top-0 left-0 w-screen h-screen bg-primary z-100 overflow-hidden'>
            <div className='w-full h-full p-[2vw] flex items-end justify-end'>
                <p ref={textRef} className='text-[20vw] font-bold text-black leading-[0.85] select-none'>
                    {count}%
                </p>
            </div>
        </div>
    )
}

export default HomeLoading;