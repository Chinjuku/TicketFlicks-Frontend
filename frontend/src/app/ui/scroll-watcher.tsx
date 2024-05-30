"use client"
import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollWatcher = () => {
    const watcherRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (watcherRef.current) {
            gsap.fromTo(watcherRef.current, 
                { width: '0%' }, 
                {
                    width: '100%',
                    scrollTrigger: {
                        trigger: "#body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                }
            );
        }
    }, []);

    return (
        <div ref={watcherRef} className='h-[4px] phone:h-[3px] desktop:h-[5px] fixed bg-quaternary top-0 z-[1200]' />
    );
};

export default ScrollWatcher



