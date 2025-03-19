'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import WallpaperSimulation from '@/components/WallpaperSimulation';

function CustomProductContent() {
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('396l-21w');
  
  useEffect(() => {
    const size = searchParams.get('size');
    if (size) {
      setSelectedSize(size);
    }
  }, [searchParams]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} custom wallpaper to cart!`);
  };

  const imageUrl = searchParams.get('image');
  const primaryImagery = searchParams.get('primaryImagery') || '1525';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/image-creation" className="text-blue-600 hover:underline">
          &larr; Back to Image Creation
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Custom Wallpaper" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-gray-400 text-center p-4">
              <p>Custom Wallpaper Preview</p>
              <p className="text-sm mt-2">Image not available</p>
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mb-4">
            Custom Design
          </span>
          <h1 className="text-3xl font-bold mb-2">{primaryImagery}</h1>
          <p className="text-2xl font-bold mb-4">$700.00</p>
          <p className="text-gray-600 mb-6">Your unique custom-generated wallpaper design, ready to transform your space.</p>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Roll Size *</h3>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Pick a size</option>
              <option value="396l-21w">396' l x 21' w: $360</option>
              <option value="396l-42w">396' l x 42' w: $700</option>
              <option value="600l-42w" className="bg-cyan-100">600' l x 42' w: $1000</option>
              <option value="1200l-42w">1200' l x 42' w: $1360</option>
            </select>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={handleQuantityChange}
              className="w-20 border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
          
          {/* Wallpaper Simulation */}
          <div className="mt-8 border-t pt-6">
            {imageUrl && (
              <WallpaperSimulation 
                imageUrl={imageUrl} 
                onScaleChange={(scale) => console.log('Scale changed:', scale)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomProductDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomProductContent />
    </Suspense>
  );
}