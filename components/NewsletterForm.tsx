'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email } as any);

    if (error) {
      if (error.code === '23505') {
        toast({
          title: 'Already subscribed',
          description: 'This email is already subscribed to our newsletter.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to subscribe. Please try again later.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setEmail('');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white"
        disabled={loading}
      />
      <Button type="submit" disabled={loading} className="sm:w-auto">
        {loading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}
