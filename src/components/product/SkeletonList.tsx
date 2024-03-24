import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

function SkeletonItem() {
  return (
    <Card className="flex flex-col space-y-3 overflow-hidden">
      <Skeleton className="h-[300px] w-[320px] rounded-none" />
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-[250px] my-4" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  );
}

export function SkeletonList() {
  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}

export default SkeletonList;
