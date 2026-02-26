'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const ScrollMarquee = () => {
    const marqueeContainer = useRef<HTMLDivElement>(null);
    const marqueeInner = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal scroll based on page scroll
            // We use xPercent: -50 because we have multiple groups
            // To make it look seamless as you scroll
            gsap.to(marqueeInner.current, {
                xPercent: -50, // Move half way across (with 4 groups, -25% is one group, -50% is two)
                ease: "none",
                scrollTrigger: {
                    trigger: marqueeContainer.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }, marqueeContainer);

        return () => ctx.revert();
    }, []);

    const MarqueeGroup = () => (
        <div className="flex items-center gap-12 md:gap-24 lg:gap-32 px-6 md:px-12">
            <div className="flex items-center gap-6 md:gap-10">
                <p className='text-6xl md:text-9xl lg:text-[12vw] font-black uppercase tracking-tighter text-black leading-none py-4'>
                    Think Big
                </p>
                <div className="w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40 shrink-0">
                    <Image src="/arrow-br.svg" alt="arrow" width={200} height={200} className="w-full h-full object-contain -rotate-90 pointer-events-none" />
                </div>
            </div>
            <div className="flex items-center gap-6 md:gap-10">
                <p className='text-6xl md:text-9xl lg:text-[12vw] font-black uppercase tracking-tighter text-black leading-none py-4'>
                    Start Small
                </p>
                <div className="w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40 shrink-0">
                    <Image src="/arrow-br.svg" alt="arrow" width={200} height={200} className="w-full h-full object-contain -rotate-90 pointer-events-none" />
                </div>
            </div>
            <div className="flex items-center gap-6 md:gap-10">
                <p className='text-6xl md:text-9xl lg:text-[12vw] font-black uppercase tracking-tighter text-black leading-none py-4'>
                    Scale Fast
                </p>
                <div className="w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40 shrink-0">
                    <Image src="/arrow-br.svg" alt="arrow" width={200} height={200} className="w-full h-full object-contain -rotate-90 pointer-events-none" />
                </div>
            </div>
        </div>
    );

    return (
        <div
            ref={marqueeContainer}
            className='w-full bg-primary py-16 md:py-24 lg:py-32 overflow-hidden border-y border-black relative z-10'
        >
            <div
                ref={marqueeInner}
                className="flex whitespace-nowrap will-change-transform"
            >
                <MarqueeGroup />
                <MarqueeGroup />
                <MarqueeGroup />
                <MarqueeGroup />
            </div>
        </div>
    )
}

export default ScrollMarquee