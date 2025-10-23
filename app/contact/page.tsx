'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import GoogleMap from '@/components/GoogleMap';

import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
const stores = [
  {
    name: 'H&S Apparel - Main Branch',
    address: 'Rashid Minhas Road, Karachi',
    phone: '0300-9227425',
    hours: '10:00 AM - 10:00 PM',
    coordinates: {
      lat: 24.8607,
      lng: 67.0011,
    },
  },
  {
    name: 'H&S Apparel - Gulistan-e-Johar',
    address: 'Gulistan-e-Johar Block 13, Karachi',
    phone: '0300-9227425',
    hours: '10:00 AM - 10:00 PM',
    coordinates: {
      lat: 24.9200,
      lng: 67.1000,
    },
  },
  {
    name: 'H&S Apparel - North Nazimabad',
    address: 'North Nazimabad Block L, Karachi',
    phone: '0300-9227425',
    hours: '10:00 AM - 10:00 PM',
    coordinates: {
      lat: 24.9500,
      lng: 67.0500,
    },
  },
  {
    name: 'H&S Apparel - Saddar',
    address: 'Saddar Town, Karachi',
    phone: '0300-9227425',
    hours: '10:00 AM - 10:00 PM',
    coordinates: {
      lat: 24.8500,
      lng: 67.0000,
    },
  },
];
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('contact_messages').insert(formData as any);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Message sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a question or feedback? We'd love to hear from you.
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-black mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-black mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <a
                      href="tel:03009227425"
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      0300-9227425
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <a
                      href="mailto:career@hnsapparel.com"
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      career@hnsapparel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Address</h3>
                    <p className="text-gray-600">
                      Multiple locations across Karachi
                      <br />
                      See our <a href="/stores" className="text-black hover:underline">stores page</a> for details
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-black mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com/hsapparelco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com/hsapparelco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    328K followers on Facebook | 89K followers on Instagram
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
                  Find Us on the Map
                </h2>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg aspect-[16/9]">
                  <GoogleMap stores={stores} />
                </div>
              </div>
      </section>
    </div>
  );
}
