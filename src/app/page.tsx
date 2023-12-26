// import { Button } from "@nextui-org/react";
// import * as action from "@/actions";
// import { auth } from "@/auth";
// import Profile from "@/components/Profile";

import TopicCreateForm from "@/components/Topics/TopicCreateForm";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Post</h1>
      </div>
      <div>
        <TopicCreateForm />
      </div>
    </div>
  );
}
