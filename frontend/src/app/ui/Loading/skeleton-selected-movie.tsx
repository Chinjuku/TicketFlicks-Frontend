import { Skeleton } from "@nextui-org/skeleton";

export const SkeletonSelectMovie = ( ) => {
    return (
        <section className="flex gap-[7%] laptop:h-[500px]">
        <div className="w-1/2 flex items-center justify-end">
            <Skeleton className="w-56 h-[330px]">

            </Skeleton>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center gap-5">
            <Skeleton className="h-8 w-44"></Skeleton>
            <Skeleton className="h-6 w-52"></Skeleton>
            <Skeleton className="h-6 w-36"></Skeleton>
            <Skeleton className="h-10 w-40"></Skeleton>
        </div>
        </section>
    )
}