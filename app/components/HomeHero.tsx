'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from "gsap";

const HomeHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set("span", {
                y: -400,
                opacity: 0,
                duration: 1,
            });

            gsap.to("span", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.to(textRef.current, {
                y: 10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                gsap.to(glowRef.current, {
                    x: clientX - window.innerWidth / 2,
                    y: clientY - window.innerHeight / 2,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className='h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-x-hidden relative'
        >
            {/* Background Glow */}
            {/* <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/20 blur-[250px] rounded-full pointer-events-none"
            /> */}
            <div
                className="absolute top-[10%] -left-100 w-[40vw] h-[40vw] bg-primary/15 blur-[300px] rounded-full pointer-events-none"
            />
            <div
                className="absolute top-[10%] -right-100 w-[40vw] h-[40vw] bg-primary/15 blur-[300px] rounded-full pointer-events-none"
            />
            <h1
                ref={textRef}
                className='text-[20vw] font-medium flex items-center justify-center text-white tracking-tighter select-none z-10'
            >
                <span className="inline-block">D</span>
                <span className="inline-block">e</span>
                <span className="inline-block">v</span>
                <span className="inline-block">D</span>
                <span className="inline-block">o</span>
                <span className="inline-block">z</span>
            </h1>

            <div className="mt-8 flex flex-col items-center gap-2 z-10">
                <div className="h-px w-12 bg-primary mb-2"></div>
                <div className="text-white/40 font-medium tracking-[0.3em] uppercase text-xs">
                    Digital Experience Studio
                </div>
            </div>
        </div>
    )
}

export default HomeHero