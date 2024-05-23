"use client"
import { NavMovie } from '@/components/Movie/movie-nav'
import React, { useState } from 'react'
import "@/styles/home.css"
import { ShowReviewMovie } from '@/components/Review/show-review-movie'

const Page = () => {
  const [type, setType] = useState<string>('ALL MOVIES')
  return (
    <main className='flex flex-col justify-center items-center h-full py-6 gap-5'>
        <h1 className="font-extrabold laptop:text-[40px] desktop:text-[48px] phone:text-[18px] tablet:text-[22px]">{type}</h1>
        <div className="navmovie-desktop navmovie-laptop font-bold max-h-[200px] flex flex-col items-center gap-[6%] phone:gap-2 w-full px-[15%]">
            <NavMovie type={type} setType={(type: string) => setType(type)} />
            <p className="h-1 bg-white w-full"></p> 
        </div>
        <div>
          <ShowReviewMovie type={type} />
        </div>
    </main>
  )
}

export default Page