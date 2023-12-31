import TopicCreateForm from "@/components/Topics/TopicCreateForm";
import TopicList from "@/components/Topics/TopicList";
import { Divider } from "@nextui-org/react";

/**
 * Home Page
 * @route /
 *
 */
export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Post</h1>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-xl text-center my-2">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
