import PostCreationForm from "@/components/Posts/PostCreationForm";
import { FC } from "react";
import PostList from "@/components/Posts/PostList";
import { fetchPostsByTopicSlug } from "@/db/queries/post";
interface TopicShowPageProps {
  params: {
    slug: string;
  };
}
/**
 * Topic details page component
 * @route GET /topic/[slug]
 *
 */
const TopicShowPage: FC<TopicShowPageProps> = ({ params }) => {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div className="py-3 px-2">
        <PostCreationForm slug={slug} />
      </div>
    </div>
  );
};

export default TopicShowPage;
