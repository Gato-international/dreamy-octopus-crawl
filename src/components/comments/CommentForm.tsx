import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CommentFormProps {
  position: { x: number; y: number };
  onSubmit: (content: string) => void;
  onClose: () => void;
}

export const CommentForm = ({ position, onSubmit, onClose }: CommentFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <Card className="w-80 shadow-2xl">
        <CardHeader>
          <CardTitle>Add a comment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="What would you like to change?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
              rows={4}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!content.trim()}>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};