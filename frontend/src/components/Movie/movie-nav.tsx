import { Button } from '@nextui-org/button'
import React from 'react'
import { types } from '@/utils/movie-data'

interface MovieNavType {
    type: string | null
    setType : (type: string) => void
}

export const NavMovie = (props: MovieNavType) => {
  return (
    <div className="h-[90%] flex items-center justify-center desktop:gap-8 laptop:gap-7 w-full tablet:gap-6 flex-wrap gap-2 flex-auto">
        {
            types.map((data) => (
                data === props.type ? null : 
                <Button key={data} aria-label="Close" onClick={() => props.setType(data)} className='w-[22.5%] tablet:w-[27%] phone:w-full phone:bg-secondary phone:text-[12px] desktop:text-[28px] laptop:text-[22px] tablet:text-[16px] font-bold hover:translate-y-[-5px] bg-transparent text-white'>{data}</Button>
            ))
        }
    </div>
  )
}
