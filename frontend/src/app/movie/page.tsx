"use client"
import "@/styles/home.css"
import { NavMovie } from "@/components/Movie/movie-nav"
import SelectMovie from "@/app/ui/select-movie"
import { Suspense, useEffect, useRef, useState } from "react"
import ShowMovieType from "@/components/Movie/show-movie-type"
import { SkeletonMovie, SkeletonTop5BoxOffice } from "@/app/ui/Loading/skeleton-movie"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Top5BoxOffice from "@/components/Movie/boxoffice"

gsap.registerPlugin(ScrollTrigger);

const Movie = () => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const endTriggerRef = useRef<HTMLDivElement>(null)
    const [type, setType] = useState<string>("NOW SHOWING")

    // useEffect(() => {
    //     if (triggerRef.current && endTriggerRef.current) {
    //         gsap.to(triggerRef.current, {
    //             scrollTrigger: {
    //                 trigger: endTriggerRef.current,
    //                 start: "top center",
    //                 end: "bottom top",
    //                 pin: true,
    //                 markers: true,
    //             },
    //         });
    //     }
    // }, []);

    return (
        <main className="flex flex-col items-center w-full gap-[30px] relative">
            <h1 className="font-extrabold laptop:text-[40px] desktop:text-[48px] phone:text-[18px] tablet:text-[22px]">{type}</h1>
            <div className="navmovie-desktop navmovie-laptop font-bold max-h-[200px] flex flex-col items-center gap-[6%] phone:gap-2 w-full px-[15%]">
                <NavMovie type={type} setType={(type: string) => setType(type)} />
                <p className="h-1 bg-white w-full"></p> 
            </div>
            <SelectMovie />
            <div className="flex w-full justify-center gap-10 mt-[1.2%]">
                <Suspense fallback={<SkeletonMovie />}>
                    <ShowMovieType ref={endTriggerRef} type={type} />
                </Suspense>
                <div ref={triggerRef} className="w-1/5 phone:hidden tablet:hidden">
                    <Suspense fallback={<SkeletonTop5BoxOffice />}>
                        <Top5BoxOffice />
                    </Suspense>
                </div>
            </div>
            <div className="h-[100px] bg-black">
          
            </div>
        </main>
    )
}

export default Movie
