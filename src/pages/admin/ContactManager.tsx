import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';

const ContactManager = () => {
  const [contactInfo, setContactInfo] = useState({
    contact_phone: '',
    contact_email: '',
    contact_web_label: '',
    contact_web_url: '',
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    const { data, error } = await supabase.from('site_config').select('*');
    if (error) {
      showError('Failed to fetch contact info.');
    } else {
      const config = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);
      setContactInfo(config as any);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updates = Object.entries(contactInfo).map(([key, value]) => ({ key, value }));
    
    const { error } = await supabase.from('site_config').upsert(updates);

    if (error) {
      showError(`Failed to update contact info: ${error.message}`);
    } else {
      showSuccess('Contact info updated successfully!');
      fetchContactInfo();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Contact Info</h1>
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="contact_phone">Phone</Label>
            <Input id="contact_phone" name="contact_phone" value={contactInfo.contact_phone} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_email">Email</Label>
            <Input id="contact_email" name="contact_email" type="email" value={contactInfo.contact_email} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_web_label">Web Label</Label>
            <Input id="contact_web_label" name="contact_web_label" value={contactInfo.contact_web_label} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_web_url">Web URL</Label>
            <Input id="contact_web_url" name="contact_web_url" value={contactInfo.contact_web_url} onChange={handleInputChange} />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;