'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';

const Page = () => {
  // States
  const [count, setCount] = useState(0);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  // Refs for Loader
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLParagraphElement>(null);

  // Refs for Hero
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 1. Counter Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevCount + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // 2. Loader Exit Animation
  useEffect(() => {
    if (count === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setIsLoaderFinished(true)
        });

        tl.to(loaderTextRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          delay: 0.3
        })
          .to(loaderContainerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
          }, "-=0.4");
      });
      return () => ctx.revert();
    }
  }, [count]);

  // 3. Hero Entrance Animation
  useLayoutEffect(() => {
    if (!isLoaderFinished) return;

    const ctx = gsap.context(() => {
      // Initial split-text entrance
      gsap.from("h1 span", {
        y: 300,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.1
      });

      // Gentle floating loop
      gsap.to(heroTextRef.current, {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Interactive Mouse Follow
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        gsap.to(glowRef.current, {
          x: clientX - window.innerWidth / 2,
          y: clientY - window.innerHeight / 2,
          duration: 1.2,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroContainerRef);

    return () => ctx.revert();
  }, [isLoaderFinished]);

  return (
    <main className="relative overflow-hidden bg-[#0a0a0a]">
      {/* 1. Loading Section */}
      {!isLoaderFinished && (
        <div
          ref={loaderContainerRef}
          className='fixed top-0 left-0 w-screen h-screen bg-primary z-[100] overflow-hidden'
        >
          <div className='w-full h-full p-[2vw] flex items-end justify-end'>
            <p
              ref={loaderTextRef}
              className='text-[20vw] font-bold text-black leading-[0.85] select-none'
            >
              {count}%
            </p>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <div
        ref={heroContainerRef}
        className='h-screen w-full flex flex-col items-center justify-center relative'
      >
        {/* Background Glows */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 blur-[200px] rounded-full pointer-events-none"
        />

        <div className="absolute top-[10%] -left-[20vw] w-[40vw] h-[40vw] bg-primary/5 blur-[300px] rounded-full pointer-events-none" />
        <div className="absolute top-[10%] -right-[20vw] w-[40vw] h-[40vw] bg-primary/5 blur-[300px] rounded-full pointer-events-none" />

        <h1
          ref={heroTextRef}
          className='text-[22vw] font-medium flex items-center justify-center lowercase text-white tracking-tighter select-none z-10'
        >
          <span className="inline-block">d</span>
          <span className="inline-block">e</span>
          <span className="inline-block">v</span>
          <span className="inline-block">d</span>
          <span className="inline-block">o</span>
          <span className="inline-block">z</span>
        </h1>

        <div className="flex flex-col items-center gap-2 z-10 mt-[-2vw]">
          <div className="h-px w-16 bg-primary/60 mb-2"></div>
          <div className="text-white/40 font-medium tracking-[0.4em] uppercase text-[0.6rem]">
            Digital Experience Studio
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page