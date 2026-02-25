'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  // States
  const [count, setCount] = useState(0);

  // Refs for Loader
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLParagraphElement>(null);

  // Refs for Hero
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevCount + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(loaderContainerRef.current, {
          duration: .5,
          scale: .7,
          borderRadius: "50px",
          ease: "power4.inOut"
        });
        tl.to(loaderTextRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          delay: 0.3
        })

          .to(loaderContainerRef.current, {
            duration: .5,
            scale: 0,
            ease: "power4.inOut"
          }, "-=0.4");

        tl.from("h1 span", {
          y: 300,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.1
        });

        tl.to(heroTextRef.current, {
          y: 15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        gsap.from("#videoSec", {
          scale: 0.5,
          borderRadius: "100px",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#videoSec",
            start: "top bottom",
            end: "top 20%",
            scrub: 2,
          }
        });
        gsap.to("#scrollHorizent h4", {
          transform: "translateX(-150%)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#scrollHorizent",
            scroller: "body",
            start: "top 0%",
            end: "top -150%",
            scrub: 2,
            pin: true,
          }
        });
      });
      return () => ctx.revert();
    }
  }, [count]);

  // 3. Mouse Follow Logic
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // Background Glow animation
        gsap.to(glowRef.current, {
          x: clientX - window.innerWidth / 2,
          y: clientY - window.innerHeight / 2,
          duration: 1.2,
          ease: "power2.out"
        });
        // Mini Cursor animation
        gsap.to("#cursor", {
          x: clientX - 15,
          y: clientY - 15,
          duration: .3,
        });

      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroContainerRef);

    return () => ctx.revert();
  });

  useEffect(() => {
    const svgElement = document.querySelector("#curvedline svg") as SVGSVGElement | null;
    const pathElement = document.querySelector("#curvedline svg path") as SVGPathElement | null;
    if (!svgElement || !pathElement) return;

    const finalPath = "M 0 100 Q 450 100 900 100";

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svgElement.getBoundingClientRect();

      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const svgX = (relX / rect.width) * 900;
      const svgY = (relY / rect.height) * 200;


      const distortionPath = `M 0 100 Q ${svgX} ${svgY} 900 100`;

      gsap.to(pathElement, {
        attr: { d: distortionPath },
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(pathElement, {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.2)"
      });
    };

    svgElement.addEventListener("mousemove", handleMouseMove);
    svgElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svgElement.removeEventListener("mousemove", handleMouseMove);
      svgElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  // Image Learn More LOgic
  useEffect(() => {
    const ctx = gsap.context(() => {
      const image = document.querySelector("#image") as HTMLImageElement | null;
      const cursor = document.querySelector("#cursor") as HTMLDivElement | null;
      image?.addEventListener("mouseenter", () => {
        if (cursor) cursor.innerHTML = "Learn More";
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      image?.addEventListener("mouseleave", () => {
        if (cursor) cursor.innerHTML = "";
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#0a0a0a]">
      {/* cursor */}
      <div id="cursor" className='fixed w-8 h-8 bg-primary rounded-full flex justify-center items-center text-[7px] text-center text-black z-1'>

      </div>
      {/* 1. Loading Section */}
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
          className='text-[25vw] font-medium flex items-center justify-center lowercase text-white tracking-tighter select-none z-10'
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
          <div className="text-white/50 font-medium tracking-[0.4em] uppercase text-md">
            Digital Experiences
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center w-full h-[400px] cursor-pointer' id="curvedline">
        <svg width="100%" height="100%" viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 0 100 Q 450 100 900 100"
            stroke="white"
            fill="transparent"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}
          />

        </svg>
      </div>

      {/* 3. Video Section */}
      <div className="h-screen w-full flex items-center justify-center p-[5vw] my-20">
        <div id='videoSec' className="w-full h-full bg-white/10 rounded-[40px] border border-white/5 overflow-hidden">
          {/* Placeholder for video content */}
          <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl font-bold uppercase tracking-widest">
            Showreel
          </div>
        </div>
      </div>
      {/* Hoorizent text scroll Section  */}
      <div id="scrollHorizent" className="max-h-screen w-full bg-primary">
        <h4 className='text-black text-[35vw] font-bold uppercase whitespace-nowrap m-0 p-0'>
          Experiences
        </h4>
      </div>

      {/* Image Section Learn More */}
      <div className='my-20'>
        <div id="image" className='w-[80vw] h-[70vh] mx-auto rounded-2xl overflow-hidden relative'>
          <div id="overlay" className='w-full h-full bg-transparent absolute z-2'></div>
          <Image
            src="https://images.unsplash.com/photo-1583144568008-76743354fa5a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Showcase"
            width={100}
            height={100}
            className='object-cover h-full w-full'
          />
        </div>
      </div>

      <div className='h-screen w-ful'></div>
    </main>
  )
}

export default Page