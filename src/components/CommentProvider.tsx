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

const CommentingSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [comment, setComment] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const location = useLocation();

  const handleDoubleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName) || target.closest('button, a')) {
      return;
    }

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    
    setPosition({ x, y });
    setIsOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener('dblclick', handleDoubleClick);
    return () => {
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [handleDoubleClick]);

  const handleSave = async () => {
    if (comment.trim().length === 0) {
      showError('Comment cannot be empty.');
      return;
    }

    setIsSaving(true);
    const toastId = showLoading('Saving your comment...');

    try {
      const { error } = await supabase.from('comments').insert([
        {
          page_path: location.pathname,
          x_coordinate: position.x,
          y_coordinate: position.y,
          content: comment,
        },
      ]);

      dismissToast(toastId);

      if (error) {
        throw new Error(error.message);
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