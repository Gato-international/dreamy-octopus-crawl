import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';

const HeroManager = () => {
  const [heroContent, setHeroContent] = useState({
    hero_headline: '',
    hero_video_src: '',
    hero_poster_src: '',
    hero_image_src: '',
  });

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    const { data, error } = await supabase.from('site_config').select('*')
      .in('key', ['hero_headline', 'hero_video_src', 'hero_poster_src', 'hero_image_src']);
      
    if (error) {
      showError('Failed to fetch hero content.');
    } else {
      const config = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);
      setHeroContent(config as any);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeroContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updates = Object.entries(heroContent).map(([key, value]) => ({ key, value }));
    
    const { error } = await supabase.from('site_config').upsert(updates);

    if (error) {
      showError(`Failed to update hero content: ${error.message}`);
    } else {
      showSuccess('Hero section updated successfully!');
      fetchHeroContent();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Hero Section</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>Update the content for the main hero section on your homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="hero_headline">Headline</Label>
            <Input id="hero_headline" name="hero_headline" value={heroContent.hero_headline} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero_image_src">Main Image URL</Label>
            <Input id="hero_image_src" name="hero_image_src" value={heroContent.hero_image_src} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero_video_src">Background Video URL</Label>
            <Input id="hero_video_src" name="hero_video_src" value={heroContent.hero_video_src} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero_poster_src">Video Poster Image URL</Label>
            <Input id="hero_poster_src" name="hero_poster_src" value={heroContent.hero_poster_src} onChange={handleInputChange} />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroManager;