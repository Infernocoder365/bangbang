'use client';

import { useState } from 'react';
import Link from 'next/link';
import ColorPicker from '@/components/ColorPicker';

export default function ImageCreation() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Enter a prompt to generate wallpaper designs');

  // Mock function to simulate image generation
  const generateImages = async () => {
    if (!prompt.trim()) {
      setStatusMessage('Please enter a prompt first');
      return;
    }

    setIsGenerating(true);
    setProgressValue(0);
    setStatusMessage('Starting image generation...');
    setGeneratedImages([]);
    setSelectedImage(null);

    // Simulate progress updates
    const statusUpdates = [
      'Sending request to server...',
      'Request received...',
      'Starting image generation model...',
      'Generating image (1/4)',
      'Generating image (2/4)',
      'Generating image (3/4)',
      'Generating image (4/4)',
      'Image generation complete. Optimizing images...'
    ];

    // In a real implementation, this would be replaced with actual API calls
    for (let i = 0; i < statusUpdates.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatusMessage(statusUpdates[i]);
      setProgressValue((i + 1) * (100 / statusUpdates.length));
    }

    // Mock generated images (would come from API in real implementation)
    const mockImages = [
      'https://via.placeholder.com/400x400?text=Wallpaper+1',
      'https://via.placeholder.com/400x400?text=Wallpaper+2',
      'https://via.placeholder.com/400x400?text=Wallpaper+3',
      'https://via.placeholder.com/400x400?text=Wallpaper+4'
    ];

    setGeneratedImages(mockImages);
    setStatusMessage('Image generation complete! Select an image to customize.');
    setIsGenerating(false);
  };

  const selectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setStatusMessage('Image selected. You can now customize and order this design.');
  };

  const addToCart = () => {
    if (!selectedImage) return;
    
    // In a real implementation, this would add the product to cart via API
    setStatusMessage('Adding product to cart...');
    
    // Simulate API call
    setTimeout(() => {
      setStatusMessage('Product added to cart successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Your Custom Wallpaper</h1>
      
      {/* Prompt Input Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Describe Your Ideal Wallpaper</h2>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Describe the pattern, colors, style, and mood you want for your wallpaper..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>
        
        {/* Optional Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input 
            type="text" 
            className="p-2 border border-gray-300 rounded-md" 
            placeholder="Style (e.g., Modern, Vintage)" 
            disabled={isGenerating}
          />
          <input 
            type="text" 
            className="p-2 border border-gray-300 rounded-md" 
            placeholder="Colors" 
            disabled={isGenerating}
          />
          <input 
            type="text" 
            className="p-2 border border-gray-300 rounded-md" 
            placeholder="Pattern structure" 
            disabled={isGenerating}
          />
        </div>
        
        <button
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          onClick={generateImages}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? 'Generating...' : 'Generate Images'}
        </button>
      </div>
      
      {/* Status and Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-2">{statusMessage}</p>
        {isGenerating && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-black h-2.5 rounded-full" 
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Color Picker */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Choose Your Colors</h2>
        <ColorPicker 
          onColorSelect={(color) => {
            console.log('Selected color:', color);
            // In a real implementation, this would update the wallpaper color
          }}
        />
      </div>
      
      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Your Favorite Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generatedImages.map((imageUrl, index) => (
              <div 
                key={index} 
                className={`cursor-pointer border-2 rounded-lg overflow-hidden ${selectedImage === imageUrl ? 'border-black' : 'border-transparent'}`}
                onClick={() => selectImage(imageUrl)}
              >
                <img src={imageUrl} alt={`Generated wallpaper ${index + 1}`} className="w-full h-auto" />
                <div className="p-2 text-center">
                  <p>Design {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Selected Image Customization */}
      {selectedImage && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Customize Your Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src={selectedImage} alt="Selected wallpaper design" className="w-full h-auto rounded-lg" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Options</h3>
              
              <div className="mb-4">
                <label className="block mb-1">Roll Size</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="396l-21w">396' l x 21' w</option>
                  <option value="396l-42w">396' l x 42' w</option>
                  <option value="600l-42w">600' l x 42' w</option>
                  <option value="1200l-42w">1200' l x 42' w</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1">Pattern Size</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="21-half">21" (half)</option>
                  <option value="10.5-quarter">10.5" (quarter)</option>
                </select>
              </div>
              
              {/* Color Picker */}
              <div className="mb-4">
                <label className="block mb-1">Color Customization</label>
                <div className="mt-2">
                  <ColorPicker 
                    onColorSelect={(color) => {
                      console.log('Selected color:', color);
                      // In a real implementation, this would update the wallpaper color
                    }}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <p className="font-bold text-xl">$49.99</p>
                <p className="text-sm text-gray-600">Price varies based on selected options</p>
              </div>
              
              <button
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors w-full"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}