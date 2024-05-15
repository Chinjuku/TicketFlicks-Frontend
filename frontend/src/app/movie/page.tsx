"use client"
import "@/app/styles/home.css"
import { NavMovie } from "@/app/components/Movie/movie-nav"
import SelectMovie from "@/app/components/Home/select-movie"
import { Suspense, useLayoutEffect, useRef, useState } from "react"
import { ShowMovieType } from "@/app/components/Movie/show-movie-type"
import { SkeletonMovie, SkeletonTop5BoxOffice } from "@/app/ui/Loading/skeleton-movie"
import { Top5BoxOffice } from "@/app/components/Movie/boxoffice"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const Movie = () => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const endTriggerRef = useRef<HTMLDivElement>(null)
    const [type, setType] = useState<string>("NOW SHOWING")

    useLayoutEffect(() => {
        if (triggerRef.current && endTriggerRef.current) {
            gsap.to(triggerRef.current, {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    endTrigger: endTriggerRef.current,
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    markers: true,
                },
            });
        }
    }, []);

    return (
        <div className="flex flex-col items-center w-full gap-[30px]">
            <h1 className="font-extrabold laptop:text-[40px] desktop:text-[48px]">{type}</h1>
            <div className="navmovie-desktop navmovie-laptop navmovie-tablet navmovie-phone font-bold max-h-[150px] flex flex-col gap-[6%] w-full px-[15%]">
                <div className="h-[90%] flex items-center justify-center gap-[10%] tablet:gap-[6%] flex-1 flex-wrap flex-grow">
                    <NavMovie type={type} setType={(type: string) => setType(type)} />
                </div>
                <p className="h-1 bg-white"></p> 
            </div>
            <SelectMovie />
            <div className="flex w-full justify-center gap-10 mt-[1.2%]">
                <Suspense fallback={<SkeletonMovie />}>
                    <ShowMovieType ref={endTriggerRef} type={type} />
                </Suspense>
                <div ref={triggerRef} className="w-1/5">
                    <Suspense fallback={<SkeletonTop5BoxOffice />}>
                        <Top5BoxOffice />
                    </Suspense>
                </div>
            </div>
            <div className="h-[1000px] w-full bg-secondary1"></div>
        </div>
    )
}

export default Movie
