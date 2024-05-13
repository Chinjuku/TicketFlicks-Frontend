// "use server"
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";

const SkeletonMovieCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg bg-default200 fill-default200">
            <div className="h-36 rounded-lg bg-default200 fill-default200"></div>
          </Skeleton>
          {/* <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default300"></div>
            </Skeleton>
          </div> */}
        </Card>
      ))}
    </div>
  );
};

export default SkeletonMovieCard;

