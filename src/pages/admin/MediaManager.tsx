import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { showSuccess, showError } from '@/utils/toast';
import { Upload, Copy, Trash2, Image as ImageIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type StorageFile = {
  name: string;
  publicUrl: string;
};

const MediaManager = () => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from('media').list(undefined, {
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      showError('Failed to fetch files.');
      console.error(error);
    } else {
      const filesWithUrls = data.map((file) => ({
        name: file.name,
        publicUrl: supabase.storage.from('media').getPublicUrl(file.name).data.publicUrl,
      }));
      setFiles(filesWithUrls);
    }
    setIsLoading(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('media').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
    
    // Note: Supabase JS client v2 doesn't support progress tracking on upload directly.
    // This is a simplified representation. For real progress, you'd need XHR.
    // We'll simulate it for a better UX.
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);


    if (error) {
      showError(`Upload failed: ${error.message}`);
    } else {
      showSuccess('File uploaded successfully!');
      await fetchFiles();
    }
    setUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (fileName: string) => {
    const { error } = await supabase.storage.from('media').remove([fileName]);
    if (error) {
      showError(`Failed to delete file: ${error.message}`);
    } else {
      showSuccess('File deleted successfully!');
      fetchFiles();
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showSuccess('URL copied to clipboard!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button onClick={handleUploadClick} disabled={uploading}>
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/*"
        />
      </div>

      {uploading && <Progress value={uploadProgress} className="w-full mb-6" />}

      {isLoading ? (
        <p>Loading media...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <Card key={file.name}>
              <CardContent className="p-0 aspect-square flex items-center justify-center bg-muted overflow-hidden">
                {file.publicUrl.match(/\.(jpeg|jpg|gif|png|svg)$/) ? (
                  <img src={file.publicUrl} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                )}
              </CardContent>
              <CardFooter className="p-2 flex flex-col items-start">
                <p className="text-xs truncate w-full" title={file.name}>{file.name}</p>
                <div className="flex justify-end w-full mt-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopyUrl(file.publicUrl)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the file. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(file.name)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManager;