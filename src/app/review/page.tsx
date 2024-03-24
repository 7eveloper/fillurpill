import ReviewList from "@/components/review/ReviewList";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const ReviewPage = () => {
  return (
    <div>
      <Link href="/newpost">
        <Button>리뷰 작성하기</Button>
      </Link>
      <ReviewList />
    </div>
  );
};

export default ReviewPage;
