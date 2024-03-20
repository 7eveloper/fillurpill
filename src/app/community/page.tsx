import PostList from "@/components/PostList";
import { Button } from "@/components/ui/PrimaryButton";
import Link from "next/link";

const CommunityPage = () => {
  return (
    <div>
      <h1>CommunityPage</h1>
      <Link href="/newpost">
        <Button>글 작성하기</Button>
      </Link>
      <PostList />
    </div>
  );
};

export default CommunityPage;
