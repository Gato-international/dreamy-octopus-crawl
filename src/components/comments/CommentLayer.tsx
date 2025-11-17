import { useEffect, useState } from 'react';
import { useComments } from '@/hooks/useComments';
import { CommentPin } from './CommentPin';
import { CommentForm } from './CommentForm';
import { showSuccess, showError } from '@/utils/toast';

export const CommentLayer = () => {
  const { comments, addComment } = useComments();
  const [newCommentPosition, setNewCommentPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleDoubleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('button, a, input, textarea, [role="button"]')) {
        return;
      }

      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setNewCommentPosition({ x, y });
    };

    document.addEventListener('dblclick', handleDoubleClick);

    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  const handleSubmitComment = async (content: string) => {
    if (!newCommentPosition) return;

    const newComment = {
      content,
      x_coordinate: newCommentPosition.x,
      y_coordinate: newCommentPosition.y,
    };

    const result = await addComment(newComment);
    if (result) {
      showSuccess('Comment added!');
    } else {
      showError('Failed to add comment.');
    }
    setNewCommentPosition(null);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[100]">
      {comments.map((comment) => (
        <div key={comment.id} className="pointer-events-auto">
          <CommentPin comment={comment} />
        </div>
      ))}
      {newCommentPosition && (
        <div className="pointer-events-auto">
          <CommentForm
            position={newCommentPosition}
            onSubmit={handleSubmitComment}
            onClose={() => setNewCommentPosition(null)}
          />
        </div>
      )}
    </div>
  );
};