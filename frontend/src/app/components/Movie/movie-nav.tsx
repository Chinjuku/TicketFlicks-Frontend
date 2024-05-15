
import { Button } from '@nextui-org/button'
import React from 'react'
import { types } from '@/app/movie/data'

interface MovieNavType {
    type: string | null
    setType : (type: string) => void
}

export const NavMovie = (props: MovieNavType) => {
  return (
    <>
        {
            types.map((data, index) => (
                data === props.type ? null : 
                <Button key={data} aria-label="Close" onClick={() => props.setType(data)} className='hover:translate-y-[-5px]'>{data}</Button>
            ))
        }
    </>
  )
}
