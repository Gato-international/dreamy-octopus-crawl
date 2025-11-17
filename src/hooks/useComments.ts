import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

export type Comment = {
  id: string;
  page_path: string;
  x_coordinate: number;
  y_coordinate: number;
  content: string;
  created_at: string;
};

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('page_path', location.pathname);

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  }, [location.pathname]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (comment: Omit<Comment, 'id' | 'created_at' | 'page_path'>) => {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ ...comment, page_path: location.pathname }])
      .select();

    if (error) {
      console.error('Error adding comment:', error);
      return null;
    }
    
    if (data) {
      setComments((prev) => [...prev, data[0]]);
      return data[0];
    }
    return null;
  };

  return { comments, loading, addComment, refetch: fetchComments };
};