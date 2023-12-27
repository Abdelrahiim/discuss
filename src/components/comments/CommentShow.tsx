import CommentCreateForm from "./CommentCreateForm";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { CommentWithAuthor } from "@/db/queries/comments";
import { FC } from "react";
interface CommentShowProps {
  comments: CommentWithAuthor[];
  commentId: string;
}

/**
 *
 *
 * @returns
 */
const CommentShow: FC<CommentShowProps> = ({ commentId, comments }) => {
  // get wanted comment from comments
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  // get all of it children comments
  const children = comments.filter((c) => c.parentId === commentId);
  // map over the children and replace them with a recursive CommentShow
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          {/** Create Comment Form */}
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      {/** add Padding for each new Children Component */}
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
};
export default CommentShow;
