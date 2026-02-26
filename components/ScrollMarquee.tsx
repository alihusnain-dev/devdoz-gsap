'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const MarqueeGroup = () => (
    <div className="flex items-center gap-12 md:gap-24 lg:gap-32 px-6 md:px-12">
        {[
            { text: "Think Big" },
            { text: "Start Small" },
            { text: "Scale Fast" }
        ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-6">
                <p className='text-3xl md:text-5xl lg:text-[6vw] font-black uppercase tracking-tighter text-black leading-none py-4'>
                    {item.text}
                </p>
                <div className="w-12 h-12 md:w-20 md:h-20 shrink-0 flex items-center justify-center">
                    <Image
                        src="/arrow-br.svg"
                        alt="arrow"
                        width={100}
                        height={100}
                        className="marquee-arrow w-full h-full object-contain pointer-events-none transition-transform"
                    />
                </div>
            </div>
        ))}
    </div>
);

const ScrollMarquee = () => {
    const marqueeContainer = useRef<HTMLDivElement>(null);
    const marqueeInner = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main marquee movement
            gsap.to(marqueeInner.current, {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: marqueeContainer.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    onUpdate: (self) => {
                        // self.direction: 1 = down (scroll down means moving forward in time)
                        // self.direction: -1 = up
                        const rotation = self.direction === 1 ? 180 : 0;
                        gsap.to(".marquee-arrow", {
                            rotate: rotation,
                            duration: 0.5,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }
                }
            });
        }, marqueeContainer);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={marqueeContainer}
            className='w-full bg-primary py-12 md:py-16 lg:py-24 overflow-hidden border-y border-black relative z-10'
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