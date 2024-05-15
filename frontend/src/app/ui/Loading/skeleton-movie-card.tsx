"use client";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";

export const SkeletonMovieCard = () => {
  return (
    <div className="mt-[5%]">
      {[...Array(4)].map((_, index) => (
        <>
          <div
            key={index}
            className="overflow-hidden overflow-x-hidden overflow-y-hidden flex flex-wrap mx-[11%] flex-col gap-6 mt-6 w-full my-[60px] tablet:max-w-[600px] laptop:max-w-[1200px] phone:max-w-[350px]"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 skeleton dark w-[400px] phone:w-[120px] tablet:w-[250px] rounded-lg bg-[#15202b]">
                <div className="h-3 skeleton dark w-3/5 rounded-lg bg-default200"></div>
              </Skeleton>
              <div className="flex gap-3 tablet:hidden phone:hidden">
                <Skeleton className="h-10 rounded-lg w-10 skeleton dark"></Skeleton>
                <Skeleton className="h-10 rounded-lg w-10 skeleton dark"></Skeleton>
              </div>
            </div>
            {/* Laptop & Desktop */}
            <div className="tablet:hidden phone:hidden flex h-[80%] desktop:gap-10 laptop:gap-[25px] tablet:gap-[25px] phone:gap-[20px] w-full overflow-x-hidden">
              {[...Array(5)].map((_, index) => (
                <Card
                  className="bg-default300 rounded-lg desktop:w-[270px] desktop:h-[380px] phone:w-[140px] phone:h-[200px] laptop:w-[200px] laptop:h-[300px] space-y-5 p-4"
                  key={index}
                >
                    <div className="skeleton dark desktop:h-[340px] h-[270px] rounded-lg bg-default200"></div>
                    <div className="space-y-3">
                    <div className="skeleton desktop:h-[40px] h-6 w-4/5 rounded-lg bg-default200"></div>
                  </div>
                </Card>
              ))}
            </div>
            {/* Phone & Tablet */}
            <div className="laptop:hidden desktop:hidden flex h-[80%] desktop:gap-10 laptop:gap-[25px] tablet:gap-[25px] phone:gap-[20px]">
              {[...Array(3)].map((_, index) => (
                <Card
                  className="bg-default300 rounded-lg phone:w-[140px] phone:h-[200px] tablet:w-[200px] tablet:h-[300px] space-y-5 p-4"
                  key={index}
                >
                    <div className="skeleton dark desktop:h-[340px] h-[270px] rounded-lg bg-default200"></div>
                    <div className="space-y-3">
                    <div className="skeleton desktop:h-[40px] h-6 w-4/5 rounded-lg bg-default200"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export const SkeletonTop5Card = () => {
  return (
    <div className="mt-[5%]">
      <div className="flex flex-wrap mx-[11%] flex-col items-center gap-6 mt-6 w-full my-[60px] tablet:max-w-[600px] laptop:max-w-[1200px] phone:max-w-[350px]">
          <Skeleton className="h-8 w-[400px] skeleton dark phone:w-[120px] tablet:w-[250px] rounded-lg bg-[#15202b]">
            <div className="h-3 w-3/5 rounded-lg bg-default300"></div>
          </Skeleton>

        <div className="flex justify-center h-[80%] flex-wrap desktop:gap-10 laptop:gap-[25px] tablet:gap-[25px] phone:gap-[20px] w-full">
        {[...Array(5)].map((_, index) => (
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
      </div>
    </div>
  );
};
