import { MessageSquare } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Comment } from '@/hooks/useComments';

interface CommentPinProps {
  comment: Comment;
}

export const CommentPin = ({ comment }: CommentPinProps) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${comment.x_coordinate}%`, top: `${comment.y_coordinate}%` }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform animate-pulse">
            <MessageSquare size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-sm">{comment.content}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};