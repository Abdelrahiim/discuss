import CommentShow from "@/components/comments/CommentShow";
import { CommentWithAuthor } from "@/db/queries/comments";
import { FC } from "react";

interface CommentListProps {
  fetchData: () => Promise<CommentWithAuthor[]>;
}

/**
 *
 *
 * @returns
 */
const CommentList: FC<CommentListProps> = async ({ fetchData }) => {
  const comments = await fetchData();
  // filter all comment that doesn't have a Parent
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  // Map over them to make pass them to the CommentShow Component
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        comments={comments}
        commentId={comment.id}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
};
export default CommentList;
