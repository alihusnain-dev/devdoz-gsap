'use client'
import Image from 'next/image'
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const MarqueeGroup = () => (
    <div className="flex items-center gap-12 md:gap-24 lg:gap-32 px-6 md:px-12 shrink-0">
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
                        className="marquee-arrow w-full h-full object-contain pointer-events-none"
                    />
                </div>
            </div>
        ))}
    </div>
);

const ScrollMarquee = () => {
    const marqueeInner = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!marqueeInner.current) return;
            tweenRef.current = gsap.to(marqueeInner.current, {
                xPercent: -50,
                duration: 6,
                repeat: -1,
                ease: "none"
            });
            gsap.set(".marquee-arrow", { rotate: 180 });
        });

        const handleWheel = (e: WheelEvent) => {
            if (!tweenRef.current) return;

            if (e.deltaY > 0) {
                gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
                gsap.to(".marquee-arrow", { rotate: 180, duration: 0.5, overwrite: true });
            } else if (e.deltaY < 0) {
                gsap.to(tweenRef.current, { timeScale: -1, duration: 0.5 });
                gsap.to(".marquee-arrow", { rotate: 0, duration: 0.5, overwrite: true });
            }
        };

        window.addEventListener("wheel", handleWheel);

        return () => {
            ctx.revert();
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div className='w-full bg-primary py-8 md:py-12 lg:py-16 overflow-hidden border-y border-black relative z-10'>
            <div
                ref={marqueeInner}
                className="flex flex-nowrap w-fit will-change-transform"
            >
                <MarqueeGroup />
                <MarqueeGroup />
            </div>
        </div>
    )
}

export default ScrollMarquee