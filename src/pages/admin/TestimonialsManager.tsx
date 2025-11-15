import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string;
};

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at');
    if (error) {
      showError('Failed to fetch testimonials.');
      console.error(error);
    } else {
      setTestimonials(data as Testimonial[]);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const testimonialData = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      text: formData.get('text') as string,
      image_url: formData.get('image_url') as string,
    };

    let error;
    if (currentTestimonial) {
      // Update
      const { error: updateError } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', currentTestimonial.id);
      error = updateError;
    } else {
      // Create
      const { error: insertError } = await supabase.from('testimonials').insert(testimonialData);
      error = insertError;
    }

    if (error) {
      showError(`Failed to save testimonial: ${error.message}`);
    } else {
      showSuccess(`Testimonial ${currentTestimonial ? 'updated' : 'added'} successfully!`);
      setIsDialogOpen(false);
      setCurrentTestimonial(null);
      fetchTestimonials();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      showError(`Failed to delete testimonial: ${error.message}`);
    } else {
      showSuccess('Testimonial deleted successfully!');
      fetchTestimonials();
    }
  };

  const openDialog = (testimonial: Testimonial | null = null) => {
    setCurrentTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Text</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-medium">{testimonial.name}</TableCell>
                <TableCell>{testimonial.role}</TableCell>
                <TableCell className="max-w-sm truncate">{testimonial.text}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the testimonial.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(testimonial.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentTestimonial ? 'Edit' : 'Add'} Testimonial</DialogTitle>
            <DialogDescription>
              {currentTestimonial ? 'Update the details of the testimonial.' : 'Add a new testimonial to your website.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" defaultValue={currentTestimonial?.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Input id="role" name="role" defaultValue={currentTestimonial?.role} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image_url" className="text-right">Image URL</Label>
                <Input id="image_url" name="image_url" defaultValue={currentTestimonial?.image_url} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="text" className="text-right">Text</Label>
                <Textarea id="text" name="text" defaultValue={currentTestimonial?.text} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManager;