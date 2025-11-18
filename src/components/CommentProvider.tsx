import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { showLoading, showSuccess, showError, dismissToast } from '@/utils/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Comment = {
  id: string;
  page_path: string;
  x_coordinate: number;
  y_coordinate: number;
  content: string;
  created_at: string;
};

const CommentingSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [comment, setComment] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const location = useLocation();

  const handleDoubleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName) || target.closest('button, a')) {
      return;
    }

    const x = (event.pageX / document.documentElement.scrollWidth) * 100;
    const y = (event.pageY / document.documentElement.scrollHeight) * 100;
    
    setPosition({ x, y });
    setIsOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener('dblclick', handleDoubleClick);
    return () => {
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [handleDoubleClick]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('page_path', location.pathname);

      if (error) {
        console.error('Error fetching comments:', error);
      } else if (data) {
        setComments(data as Comment[]);
      }
    };

    fetchComments();
  }, [location.pathname]);

  const handleSave = async () => {
    if (comment.trim().length === 0) {
      showError('Comment cannot be empty.');
      return;
    }

    setIsSaving(true);
    const toastId = showLoading('Saving your comment...');

    try {
      const { data: newComments, error } = await supabase.from('comments').insert([
        {
          page_path: location.pathname,
          x_coordinate: position.x,
          y_coordinate: position.y,
          content: comment,
        },
      ]).select();

      dismissToast(toastId);

      if (error) {
        throw new Error(error.message);
      }

      if (newComments) {
        setComments(prevComments => [...prevComments, ...newComments as Comment[]]);
      }

      showSuccess('Comment saved!');
      setComment('');
      setIsOpen(false);
    } catch (error) {
      dismissToast(toastId);
      showError(`Failed to save comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Type your feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Comment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {comments.map((c) => (
        <Tooltip key={c.id}>
          <TooltipTrigger asChild>
            <div
              className="absolute z-[999] w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow-lg"
              style={{
                left: `${c.x_coordinate}%`,
                top: `${c.y_coordinate}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{c.content}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <CommentingSystem />
    </>
  );
};