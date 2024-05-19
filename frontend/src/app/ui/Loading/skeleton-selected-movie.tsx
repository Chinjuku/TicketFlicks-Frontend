import { Skeleton } from "@nextui-org/skeleton";

export const SkeletonSelectMovie = () => {
  return (
    <>
      <div className="desktop:h-[102px] laptop:h-[80px] tablet:h-[72px] phone:h-[55px] flex items-center w-full">
        <p className="w-1/5 h-2 bg-tertiary"></p>
        <div className="h-full flex items-center justify-center bg-tertiary rounded-lg border-4 border-black w-3/5">
          <Skeleton className="max-w-xl w-4/5 h-4/5 rounded-md tablet:w-4/6 tablet:h-4/5 desktop:text-[20px] bg-white border-2 border-primary px-5 py-[5px] text-black z-1"></Skeleton>
        </div>
        <p className="w-1/5 h-2 bg-tertiary"></p>
      </div>
      <section className="flex gap-[7%] laptop:h-[500px]">
        <div className="w-1/2 flex items-center justify-end">
          <Skeleton className="w-56 h-[330px]"></Skeleton>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center gap-5">
          <Skeleton className="h-8 w-44"></Skeleton>
          <Skeleton className="h-6 w-52"></Skeleton>
          <Skeleton className="h-6 w-36"></Skeleton>
          <Skeleton className="h-10 w-40"></Skeleton>
        </div>
      </section>
    </>
  );
};
