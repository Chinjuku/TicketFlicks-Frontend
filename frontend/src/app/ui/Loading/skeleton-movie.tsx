import { Card } from '@nextui-org/card'
import React from 'react'

export const SkeletonMovie = () => {
  return (
    <div className="grid grid-cols-3 justify-center h-[80%] flex-wrap desktop:gap-10 laptop:gap-[25px] tablet:gap-[25px] phone:gap-[20px]">
        {[...Array(9)].map((_, index) => (
                <Card
                  className="rounded-lg desktop:w-[270px] bg-default300 desktop:h-[380px] phone:w-[140px] phone:h-[200px] w-[200px] h-[300px] space-y-5 p-4"
                  key={index}
                >
                  <div className="skeleton dark desktop:h-[340px] h-[270px] rounded-lg bg-default200"></div>
                    <div className="space-y-3">
                    <div className="skeleton desktop:h-[40px] h-6 w-4/5 rounded-lg bg-default200"></div>
                  </div>
                </Card>
              ))}
        </div>
  )
}

export const SkeletonTop5BoxOffice = () => {
  return (
    <div className='relative border-l-3 border-e-3 border-b-3 border-white flex justify-center w-full px-[15px] py-10'>
      <div className='h-[2px] bg-white w-1/5 absolute top-0 left-0'></div>
      <div className='h-[2px] bg-white w-1/5 absolute top-0 right-0'></div>
      <h1 className='absolute top-[-14px] text-[20px] font-extrabold'>Top 5 Box Office</h1>
      <div className='w-full gap-5 flex flex-col justify-center'>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='flex justify-center items-center gap-6 w-full'>
            <Card className='w-1/2 flex h-[140px] bg-default300 justify-center items-center'>
              <div className='w-4/5 h-4/5 bg-default200 skeleton'></div>
            </Card>
            <Card className='w-1/2 h-8 bg-default300 flex justify-center items-center'>
              <div className='h-5 w-4/5 bg-default200 skeleton rounded'></div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
