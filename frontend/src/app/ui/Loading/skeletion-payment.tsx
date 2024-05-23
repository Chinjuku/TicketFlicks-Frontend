import React from 'react'
import { Skeleton } from '@nextui-org/skeleton'

export const SkeletonPaymentPage = () => {
  return (
    <div className="flex p-[80px] phone:p-[30px] gap-4 flex-wrap phone:gap-12 desktop:h-[83vh] h-[81.2vh] animate-pulse">
      <div className="grow w-[48%] phone:w-1/2 flex flex-col p-[2.8%] gap-5 phone:gap-3">
        <div className="flex gap-3 items-center font-bold mb-5">
          <Skeleton className="bg-gray-300 w-7 h-7 desktop:w-12 desktop:h-12 rounded-full"></Skeleton>
          <Skeleton className="bg-gray-300 w-24 h-6 desktop:w-36 desktop:h-10 rounded"></Skeleton>
        </div>
        <div className="flex flex-col gap-3 desktop:gap-6 desktop:mt-3">
          <Skeleton className="rounded-lg w-2/3 flex grow gap-3 desktop:text-[38px] text-[28px] phone:text-[22px] tablet:text-[26px] font-bold">
            <div className="bg-gray-300 w-32 h-8 desktop:w-40 desktop:h-10 rounded"></div>
            <div className="bg-gray-300 w-20 h-8 desktop:w-32 desktop:h-10 rounded"></div>
          </Skeleton>
          <Skeleton className="bg-gray-300 h-8 desktop:h-10 rounded w-1/3"></Skeleton>
        </div>
      </div>
      <div className="grow w-[48%] phone:w-1/2 laptop:px-[5%] desktop:px-[8%] flex flex-col justify-center gap-8 h-full">
        <Skeleton className="bg-gray-300 w-full h-10 desktop:h-12 phone:h-8 rounded"></Skeleton>
        <div className="w-full flex gap-5 justify-center">
          <Skeleton className="bg-gray-300 w-[47%] h-14 rounded"></Skeleton>
          <Skeleton className="bg-gray-300 w-[47%] h-14 rounded"></Skeleton>
        </div>
        <Skeleton className="bg-gray-300 w-full h-10 rounded"></Skeleton>
        <div className="w-full flex gap-5 justify-center">
          <Skeleton className="bg-gray-300 w-[47%] h-10 rounded"></Skeleton>
          <Skeleton className="bg-gray-300 w-[47%] h-10 rounded"></Skeleton>
        </div>
        <Skeleton className="bg-gray-300 w-full h-10 rounded"></Skeleton>
        <div className="w-full flex gap-5 flex-wrap justify-center">
          <Skeleton className="bg-gray-300 grow w-[47%] h-10 rounded"></Skeleton>
          <Skeleton className="bg-gray-300 grow w-[47%] h-10 rounded"></Skeleton>
        </div>
      </div>
    </div>
  )
}
