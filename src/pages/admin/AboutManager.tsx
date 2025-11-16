import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';

const AboutManager = () => {
  const [content, setContent] = useState({
    about_headline: '',
    about_subheadline: '',
    about_description: '',
    about_primary_cta_text: '',
    about_primary_cta_link: '',
    about_secondary_cta_text: '',
    about_secondary_cta_link: '',
    about_images: '',
  });

  const fetchContent = async () => {
    const keys = Object.keys(content);
    const { data, error } = await supabase.from('site_config').select('*').in('key', keys);
      
    if (error) {
      showError('Failed to fetch about section content.');
    } else {
      const config = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);
      
      setContent({
          about_headline: config.about_headline || '',
          subheadline: config.about_subheadline || '',
          description: config.about_description || '',
          primary_cta_text: config.about_primary_cta_text || '',
          primary_cta_link: config.about_primary_cta_link || '',
          secondary_cta_text: config.about_secondary_cta_text || '',
          secondary_cta_link: config.about_secondary_cta_link || '',
          images: config.about_images || '',
      } as any);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (content.about_images) {
      try {
        JSON.parse(content.about_images);
      } catch (e) {
        showError('The "Images JSON" is not valid JSON. Please correct it before saving.');
        return;
      }
    }

    const updates = Object.entries(content)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => ({ key, value }));
    
    if (updates.length === 0) {
      showError("No content to save.");
      return;
    }

    const { error } = await supabase.from('site_config').upsert(updates, { onConflict: 'key' });

    if (error) {
      showError(`Failed to update about section: ${error.message}`);
    } else {
      showSuccess('About section updated successfully!');
      fetchContent();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage About Section</h1>
      <Card>
        <CardHeader>
          <CardTitle>About Section Content</CardTitle>
          <CardDescription>Update the content for the section with grouped images on the homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="about_headline">Headline</Label>
            <Input id="about_headline" name="about_headline" value={content.about_headline} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="about_subheadline">Subheadline</Label>
            <Input id="about_subheadline" name="about_subheadline" value={content.about_subheadline} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="about_description">Description</Label>
            <Textarea id="about_description" name="about_description" value={content.about_description} onChange={handleInputChange} rows={5} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="about_primary_cta_text">Primary Button Text</Label>
              <Input id="about_primary_cta_text" name="about_primary_cta_text" value={content.about_primary_cta_text} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="about_primary_cta_link">Primary Button Link</Label>
              <Input id="about_primary_cta_link" name="about_primary_cta_link" value={content.about_primary_cta_link} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="about_secondary_cta_text">Secondary Button Text</Label>
              <Input id="about_secondary_cta_text" name="about_secondary_cta_text" value={content.about_secondary_cta_text} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="about_secondary_cta_link">Secondary Button Link</Label>
              <Input id="about_secondary_cta_link" name="about_secondary_cta_link" value={content.about_secondary_cta_link} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="about_images">Images JSON</Label>
            <Textarea 
              id="about_images" 
              name="about_images" 
              value={content.about_images} 
              onChange={handleInputChange} 
              rows={8} 
              placeholder='[{"src": "/url-from-media-library.png", "alt": "description"}, ...]'
            />
            <p className="text-sm text-muted-foreground">
              Enter a valid JSON array of image objects. Example: {'[{"src": "/path/to/image.png", "alt": "Alt text"}]'}
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutManager;