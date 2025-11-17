import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import { Helmet } from 'react-helmet-async';

type Comment = {
  id: string;
  page_path: string;
  x_coordinate: number;
  y_coordinate: number;
  content: string;
  created_at: string;
};

type GroupedComments = {
  [key: string]: Comment[];
};

const CommentsExport = () => {
  const [groupedComments, setGroupedComments] = useState<GroupedComments>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllComments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
      } else if (data) {
        const grouped = data.reduce((acc: GroupedComments, comment: Comment) => {
          const path = comment.page_path;
          if (!acc[path]) {
            acc[path] = [];
          }
          acc[path].push(comment);
          return acc;
        }, {});
        setGroupedComments(grouped);
      }
      setLoading(false);
    };

    fetchAllComments();
  }, []);

  const copyToClipboard = () => {
    const textToCopy = Object.entries(groupedComments)
      .map(([path, comments]) => {
        const commentsText = comments
          .map(
            (c) =>
              `- Comment: "${c.content}"\n  (Position: ${Math.round(c.x_coordinate)}%, ${Math.round(c.y_coordinate)}% | Date: ${new Date(c.created_at).toLocaleString()})`
          )
          .join('\n\n');
        return `Page: ${path}\n-----------------\n${commentsText}`;
      })
      .join('\n\n\n');

    navigator.clipboard.writeText(textToCopy);
    showSuccess('Comments copied to clipboard!');
  };

  if (loading) {
    return <div className="container py-12">Loading comments...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Comments Export – Fragancao</title>
      </Helmet>
      <div className="container max-w-4xl mx-auto py-12 pt-24 sm:pt-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-heading">Website Feedback Summary</h1>
          <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
        </div>
        <div className="prose prose-invert max-w-none bg-card p-8 rounded-lg">
          {Object.keys(groupedComments).length === 0 ? (
            <p>No comments found.</p>
          ) : (
            Object.entries(groupedComments).map(([path, comments]) => (
              <div key={path} className="mb-8">
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
                  Page: <code>{path}</code>
                </h2>
                <ul className="list-disc pl-5 space-y-4">
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <p className="font-semibold">"{comment.content}"</p>
                      <p className="text-sm text-muted-foreground">
                        Position: ({Math.round(comment.x_coordinate)}%, {Math.round(comment.y_coordinate)}%)
                        <br />
                        Date: {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsExport;