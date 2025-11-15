import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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

type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  popular: boolean;
};

const PricingManager = () => {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    const { data, error } = await supabase.from('pricing_tiers').select('*').order('sort_order');
    if (error) {
      showError('Failed to fetch pricing tiers.');
    } else {
      setTiers(data as PricingTier[]);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const tierData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      cta: formData.get('cta') as string,
      popular: formData.get('popular') === 'on',
      features: (formData.get('features') as string).split('\n').filter(f => f.trim() !== ''),
    };

    const { error } = currentTier
      ? await supabase.from('pricing_tiers').update(tierData).eq('id', currentTier.id)
      : await supabase.from('pricing_tiers').insert(tierData);

    if (error) {
      showError(`Failed to save tier: ${error.message}`);
    } else {
      showSuccess(`Tier ${currentTier ? 'updated' : 'added'} successfully!`);
      setIsDialogOpen(false);
      setCurrentTier(null);
      fetchTiers();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('pricing_tiers').delete().eq('id', id);
    if (error) {
      showError(`Failed to delete tier: ${error.message}`);
    } else {
      showSuccess('Tier deleted successfully!');
      fetchTiers();
    }
  };

  const openDialog = (tier: PricingTier | null = null) => {
    setCurrentTier(tier);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Pricing Tiers</h1>
        <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Tier
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier) => (
              <TableRow key={tier.id}>
                <TableCell className="font-medium">{tier.name}</TableCell>
                <TableCell>{tier.price}</TableCell>
                <TableCell>{tier.popular ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(tier)}>
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
                          This will permanently delete the pricing tier.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(tier.id)}>
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentTier ? 'Edit' : 'Add'} Pricing Tier</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" defaultValue={currentTier?.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" name="description" defaultValue={currentTier?.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" name="price" defaultValue={currentTier?.price} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cta" className="text-right">CTA Text</Label>
                <Input id="cta" name="cta" defaultValue={currentTier?.cta} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="features" className="text-right">Features</Label>
                <Textarea id="features" name="features" defaultValue={currentTier?.features.join('\n')} className="col-span-3" placeholder="One feature per line" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="popular" className="text-right">Popular</Label>
                <Switch id="popular" name="popular" defaultChecked={currentTier?.popular} />
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

export default PricingManager;