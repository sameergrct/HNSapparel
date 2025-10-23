'use client';

import { useState } from 'react';

interface Store {
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface GoogleMapProps {
  stores: Store[];
}
const dhaPhase7Coords = {
  lat: 24.8289056,
  lng: 67.0738172
};
export default function GoogleMap({ stores }: GoogleMapProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Search for "H&S Apparel" in Karachi to show all store locations
  const searchQuery = "H&S Apparel Karachi";
  
  // Use Google Maps with search - no API key required
  const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0!2d${dhaPhase7Coords.lng}!3d${dhaPhase7Coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d2b0cbbe2b1%3A0xbbf4a816812c6e09!2sH%26S%20Apparel!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus';
  return (
    <div className="w-full h-full">
      <div className="w-full h-full rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="H&S Apparel Store Locations"
        />
      </div>
      
      {/* Store selector with detailed information */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
          Our Store Locations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stores.map((store, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                selectedStore?.name === store.name
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setSelectedStore(store)}
                className="w-full text-left"
              >
                <h4 className="font-semibold text-sm mb-2">{store.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{store.address}</p>
                <p className="text-xs text-gray-400 mb-1">📞 {store.phone}</p>
                <p className="text-xs text-gray-400">🕒 {store.hours}</p>
              </button>
              <div className="mt-2 flex gap-1">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  📍 Map
                </a>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                >
                  🧭 Directions
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Selected store details */}
        {selectedStore && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-900 mb-2">{selectedStore.name}</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Address:</strong> {selectedStore.address}</p>
              <p><strong>Phone:</strong> <a href={`tel:${selectedStore.phone}`} className="text-blue-600 hover:underline">{selectedStore.phone}</a></p>
              <p><strong>Hours:</strong> {selectedStore.hours}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
              >
                📍 View on Google Maps
              </a>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedStore.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
              >
                🧭 Get Directions
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
