"use client"
import React, { useLayoutEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollWatcher = () => {
    const watcherRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (watcherRef.current) {
            gsap.fromTo(watcherRef.current, 
                { width: '0%' }, 
                {
                    width: '100%',
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                }
            );
        }
    }, []);

    return (
        <div ref={watcherRef} className='h-[5px] desktop:h-[10px] fixed bg-quaternary w-full top-0 z-[1200]' />
    );
};

export default ScrollWatcher



