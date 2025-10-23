import { MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoogleMap from '@/components/GoogleMap';

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

const promotions = [
  {
    title: 'Summer Sale',
    description: 'Up to 40% off on select linen trousers and cotton pants',
    validUntil: 'Valid until end of season',
  },
  {
    title: 'Bundle Offers',
    description: 'Buy 3 items and get 15% off your entire purchase',
    validUntil: 'Ongoing promotion',
  },
  {
    title: 'New Customer Discount',
    description: 'First-time shoppers get 10% off on their first order',
    validUntil: 'Valid for in-store purchases',
  },
];

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Stores
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Visit us at any of our convenient locations across Karachi.
            Experience our products firsthand and get personalized styling advice.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            Store Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stores.map((store, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-black mb-4">{store.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">{store.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <a href={`tel:${store.phone}`} className="text-gray-600 hover:text-black">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600">{store.hours}</p>
                  </div>
                </div>
              </div>
            ))}
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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            Current Promotions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-black mb-3">{promo.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{promo.description}</p>
                <p className="text-sm text-gray-500 italic">{promo.validUntil}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Visit any of our stores to take advantage of these exclusive offers!
            </p>
            <Button size="lg" asChild>
              <a href="tel:03009227425">Call Us for More Details</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prefer Shopping Online?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Browse our complete collection online and get your order delivered right to your doorstep.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/shop">Shop Online</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
