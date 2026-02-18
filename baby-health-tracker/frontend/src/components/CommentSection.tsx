import { useState } from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments: Comment[];
  userRole?: "PARENT" | "DOCTOR";
  onAddComment?: (content: string) => void;
  onDeleteComment?: (id: string) => void;
}

const CommentSection = ({
  comments,
  userRole,
  onAddComment,
  onDeleteComment,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    onAddComment?.(newComment);
    setNewComment("");
  };

  return (
    <div className="space-y-4">

      {/* LISTE COMMENTAIRES */}
      {comments.length === 0 && (
        <p className="text-gray-500">
          No comments yet.
        </p>
      )}

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 p-4 rounded-xl border"
        >
          <p className="text-gray-700">
            {comment.content}
          </p>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              {new Date(
                comment.createdAt
              ).toLocaleString()}
            </span>

            {userRole === "DOCTOR" &&
              onDeleteComment && (
                <button
                  onClick={() =>
                    onDeleteComment(comment.id)
                  }
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
          </div>
        </div>
      ))}

      {/* FORMULAIRE AJOUT (DOCTOR ONLY) */}
      {userRole === "DOCTOR" && onAddComment && (
        <div className="mt-4 space-y-2">

          <textarea
            value={newComment}
            onChange={(e) =>
              setNewComment(e.target.value)
            }
            placeholder="Write a medical comment..."
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            className="bg-secondary text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
