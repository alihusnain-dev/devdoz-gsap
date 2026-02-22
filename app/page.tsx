'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import HomeHero from './components/HomeHero'
import { gsap } from 'gsap';


const Page = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  // const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      gsap.from("span", {
        y: -300,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "easeIn",
      });

      gsap.to(textRef.current, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });

      // const handleMouseMove = (e: MouseEvent) => {
      //     const { clientX, clientY } = e;
      //     gsap.to(glowRef.current, {
      //         x: clientX - window.innerWidth / 2,
      //         y: clientY - window.innerHeight / 2,
      //         duration: 1,
      //         ease: "power2.out"
      //     });
      // };

      // window.addEventListener("mousemove", handleMouseMove);
      // return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  });
  useEffect(() => {
    if (count === 100 && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
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
  }, [count]);


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

  if (!isVisible) return null;


  return (
    <main>

      <div ref={containerRef} className='fixed top-0 left-0 w-screen h-screen bg-primary z-100 overflow-hidden'>
        <div className='w-full h-full p-[2vw] flex items-end justify-end'>
          <p ref={textRef} className='text-[20vw] font-bold text-black leading-[0.85] select-none'>
            {count}%
          </p>
        </div>
      </div>
      {/* Hero Section  */}
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
          className='text-[25vw] font-medium flex items-center justify-center lowercase text-white tracking-tighter select-none z-10'
        >
          <span className="inline-block">D</span>
          <span className="inline-block">e</span>
          <span className="inline-block">v</span>
          <span className="inline-block">D</span>
          <span className="inline-block">o</span>
          <span className="inline-block">z</span>
        </h1>

        <div className="flex flex-col items-center gap-2 z-10">
          <div className="h-px w-12 bg-primary mb-2"></div>
          <div className="text-white/40 font-medium tracking-[0.3em] uppercase text-xs">
            Digital Experience Studio
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page