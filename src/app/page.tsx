'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ColorPicker from '@/components/ColorPicker';
import ImageSelector from '@/components/ImageSelector';
import { generateImages, checkImageStatus, getImageResults } from '@/services/imageService';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [statusMessage, setStatusMessage] = useState('No active request yet');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [primaryImagery, setPrimaryImagery] = useState('');
  const [designStyle, setDesignStyle] = useState('');
  const [accentsDetails, setAccentsDetails] = useState('');
  const [patternStructure, setPatternStructure] = useState('');
  const [moodAmbiance, setMoodAmbiance] = useState('');
  const [specificQualities, setSpecificQualities] = useState('');
  const [toneAdjective, setToneAdjective] = useState('');
  
  // Function to handle color selection from the ColorPicker component
  const handleColorSelect = (color: string) => {
    console.log('Selected color:', color);
    // Add the color to the selected colors array if it's not already there
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Function to remove a color from the selected colors array
  const removeColor = (colorToRemove: string) => {
    setSelectedColors(selectedColors.filter(color => color !== colorToRemove));
  };

  // Function to start image generation process
  const startImageGeneration = async () => {
    if (!primaryImagery.trim()) {
      setStatusMessage('Please enter a primary imagery prompt first');
      return;
    }

    try {
      setIsGenerating(true);
      setProgressValue(0);
      setStatusMessage('Starting image generation...');
      setGeneratedImages([]);
      setSelectedImage(null);

      // Build the full prompt from all input fields
      let fullPrompt = primaryImagery.trim();
      
      if (designStyle.trim()) {
        fullPrompt += `, ${designStyle} style`;
      }
      
      if (accentsDetails.trim()) {
        fullPrompt += `, with ${accentsDetails}`;
      }
      
      if (patternStructure.trim()) {
        fullPrompt += `, ${patternStructure} pattern`;
      }
      
      if (moodAmbiance.trim()) {
        fullPrompt += `, ${moodAmbiance} mood`;
      }
      
      if (specificQualities.trim()) {
        fullPrompt += `, ${specificQualities}`;
      }
      
      if (toneAdjective.trim()) {
        fullPrompt += `, ${toneAdjective} tone`;
      }

      // Generate images using our service
      const id = await generateImages(fullPrompt, designStyle, selectedColors);
      setRequestId(id);
      
      // Start polling for status updates
      const statusInterval = setInterval(async () => {
        try {
          const statusData = await checkImageStatus(id);
          
          // Update progress based on status
          if (statusData.status === 'pending') {
            setStatusMessage(`Generating images... ${Math.round(statusData.progress * 100)}%`);
            setProgressValue(statusData.progress * 100);
          } else if (statusData.status === 'completed') {
            clearInterval(statusInterval);
            setStatusMessage('Images generated! Fetching results...');
            setProgressValue(100);
            
            // Get the generated images
            const results = await getImageResults(id);
            
            if (results.upscaled_urls && results.upscaled_urls.length > 0) {
              setGeneratedImages(results.upscaled_urls);
              setStatusMessage('Image generation complete! Select an image to customize.');
            } else {
              setStatusMessage('No images were generated. Please try again with a different prompt.');
            }
            
            setIsGenerating(false);
          } else if (statusData.status === 'failed') {
            clearInterval(statusInterval);
            setStatusMessage('Image generation failed. Please try again.');
            setIsGenerating(false);
          }
        } catch (error) {
          console.error('Error checking status:', error);
          clearInterval(statusInterval);
          setStatusMessage('Error checking image status. Please try again.');
          setIsGenerating(false);
        }
      }, 3000); // Check every 3 seconds
      
    } catch (error) {
      console.error('Error starting image generation:', error);
      setStatusMessage('Error starting image generation. Please try again.');
      setIsGenerating(false);
    }
  };

  // Function to select an image
  const selectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setStatusMessage('Image selected. You can now customize and order this design.');
  };
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="p-20 flex flex-col items-center justify-center text-center w-3/4 mx-auto" style={{ backgroundImage: "url('/mainBG.jpg')", backgroundSize: "cover", backgroundPosition: "center",color: "#411e06" }}>
        <h1 className="text-5xl font-serif mb-4">Custom Wallpaper,</h1>
        <h1 className="text-5xl font-serif mb-4">Created by you!</h1>
        <h1 className="text-5xl font-serif mb-12">Shipped to your door!</h1>

        <p className="text-xl font-bold mb-1">You design it.</p>
        <p className="text-xl font-bold mb-7">We make it and ship it direct to you.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 flex flex-col items-center w-3/4 mx-auto">
        {/* Primary Image Input */}
        <div className="w-full mb-2">
          <div className="text-center mb-2">
            <h3 className="text-2xl font-bold input-label">Primary Imagery Input</h3>
            <p className="text-md font-bold input-label">*Required Field*</p>
          </div>
          <textarea
            className="w-full border border-gray-300 p-3 min-h-[100px] text-md rounded"
            placeholder="This is the most important input! Type what you want to see incorporated into your design as the primary imagery. If you have nothing specific move to the box below and type a design style you want."
            value={primaryImagery}
            onChange={(e) => setPrimaryImagery(e.target.value)}
            disabled={isGenerating}
          ></textarea>
        </div>

        {/* Design Style */}
        <div className="w-full mb-6 max-w-sm">
          <div className="text-center mb-2">
            <h3 className="text-2xl font-bold input-label">Design Style</h3>
            <p className="text-md font-bold input-label">*Optional Field*
            </p>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 text-md"
            placeholder="Art Deco, Bauhaus, Futuristic, etc..."
            value={designStyle}
            onChange={(e) => setDesignStyle(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {/* Enhanced Image Creation */}
        <div className="w-full mb-6 max-w-sm">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold input-label">Enhanced Image Control</h3>
            <p className="text-md font-bold input-label text-center-800">*All Fields Below are Optional*</p>
            <p className="text-md font-bold input-label">Accents, Details & Effects</p>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 text-md"
            placeholder="Gold metallic accents, subtle shadowing, etc"
            value={accentsDetails}
            onChange={(e) => setAccentsDetails(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {/* Two Column Section */}
        <div className="w-full grid grid-cols-2 gap-30 mb-6">
          <div>
            <div className="mb-2 items-center">
              <h3 className="text-lg font-bold input-label text-center">Pattern Structure</h3>
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 text-md"
              placeholder="Symmetrical, Asymmetrical, Repeating, etc"
              value={patternStructure}
              onChange={(e) => setPatternStructure(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          <div>
            <div className="mb-2">
              <h3 className="text-lg font-bold input-label text-center">Mood/Ambiance</h3>
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 text-md"
              placeholder="Clean lines, bold shapes, intricate details, etc"
              value={moodAmbiance}
              onChange={(e) => setMoodAmbiance(e.target.value)}
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Second Two Column Section */}
        <div className="w-full grid grid-cols-2 gap-30 mb-6">
          <div>
            <div className="mb-2">
              <h3 className="text-lg font-bold input-label text-center">Specific Qualities</h3>
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 text-md"
              placeholder="Luxurious, Sophisticated, Calm, etc"
              value={specificQualities}
              onChange={(e) => setSpecificQualities(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          <div>
            <div className="mb-2">
              <h3 className="text-lg font-bold input-label text-center">Tone/Adjective</h3>
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 text-md"
              placeholder="Elegant, Whimsical, Refined, etc"
              value={toneAdjective}
              onChange={(e) => setToneAdjective(e.target.value)}
              disabled={isGenerating}
            />
          </div>
        </div>
        {/* Help Button */}
        <div className="w-full text-center mb-4">
          <button className="bg-gray-800 text-white px-6 py-2 text-md inline-block">
            Need Help? Click
          </button>
        </div>

        {/* Tabs */}
        <div className="w-full border-t border-b border-gray-300 flex justify-between text-md mb-4">
          <div className={`cursor-pointer py-2 px-4 tab-item ${activeTab === 0 ? "font-medium border-b-2 border-gray-800" : ""}`} onClick={() => setActiveTab(0)}>Design Style & Accents, Details, Effects</div>
          <div className={`cursor-pointer py-2 px-4 tab-item ${activeTab === 1 ? "font-medium border-b-2 border-gray-800" : ""}`} onClick={() => setActiveTab(1)}>Pattern Structure & Mood/Ambiance</div>
          <div className={`cursor-pointer py-2 px-4 tab-item ${activeTab === 2 ? "font-medium border-b-2 border-gray-800" : ""}`} onClick={() => setActiveTab(2)}>Specific Qualities & Tone/Adjective</div>
        </div>

        {/* Tab Content */}
        <div className="w-full text-md mb-8">
          {/* Tab 1 Content */}
          {activeTab === 0 && (
            <ul className="list-disc pl-5">
              <li className="mb-3">
                <span className="font-medium">Design Style:</span> Controls the overall theme of your wallpaper. Examples include, but are not limited to: Art Deco, Victorian, Minimalist, Modern, Bohemian, and Vintage.
              </li>
              <li className="mb-3">
                <span className="font-medium">Accents, Details, & Effects:</span> Adds extra elements or details to enhance the appearance of the wallpaper pattern. Examples include accent details (metallic, shiny, matte, etc) specific details (glitter, shimmer, sparkle, etc) and texture effects (smooth, linen, etc)
              </li>
            </ul>
          )}

          {/* Tab 2 Content */}
          {activeTab === 1 && (
            <ul className="list-disc pl-5">
              <li className="mb-3">
                <span className="font-medium">Pattern Structure:</span> Controls how the design elements are arranged and repeated. Examples include: stripes, geometric, floral, abstract, etc
              </li>
              <li className="mb-3">
                <span className="font-medium">Mood/Ambiance:</span> Sets the emotional atmosphere of the wallpaper. Examples include: cozy, vibrant, calm, elegant, etc
              </li>
            </ul>
          )}

          {/* Tab 3 Content */}
          {activeTab === 2 && (
            <ul className="list-disc pl-5">
              <li className="mb-3">
                <span className="font-medium">Specific Qualities:</span> Incorporate particular attributes that meet your needs or preferences
              </li>
              <li className="mb-3">
                <span className="font-medium">Tone/Adjective:</span> Helps to define the color palette and overall feel of the design. Examples include: warm, cool, bold, subtle
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* Color Picker */}
      <div className="text-md mb-2 w-3/4 mx-auto">
        {selectedColors.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 font-medium">Selected Colors:</p>
            <div className="flex flex-wrap gap-2">
              {selectedColors.map((color, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-sm">{color}</span>
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => removeColor(color)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-3/4 mx-auto">
        <ColorPicker onColorSelect={handleColorSelect} />
      </div>
      {/* Create Section */}
      <div className="bg-gray-800 text-white py-2 text-center cursor-pointer" onClick={startImageGeneration}>
        <h2 className="uppercase font-bold">{isGenerating ? 'GENERATING...' : 'CREATE'}</h2>
      </div>

      {/* Preview Section */}
      <div className="bg-white p-4 flex flex-col items-center w-3/4 mx-auto">
        <p className="text-md text-center mb-4">{statusMessage}</p>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="w-full mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-black h-2.5 rounded-full" 
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Generated Images */}
        {generatedImages.length > 0 ? (
          <div className="mb-6">
            <ImageSelector 
              images={generatedImages} 
              onImageSelect={selectImage} 
              isGenerating={isGenerating} 
            />
          </div>
        ) : (
          /* Preview Image Placeholder */
          <div className="mb-6 w-[512px] h-[512px] border border-gray-200 flex items-center justify-center bg-gray-50">
            <img src="/ImagePlaceHolder.png" alt="Preview placeholder" className="max-w-full max-h-full" />
          </div>
        )}

        <p className="text-xs text-center text-gray-500 mb-6">
          {generatedImages.length > 0 ? 'Select an image to customize' : 'Generated images will display above when ready'}
        </p>

        {/* Product Creation Section - Only shown when an image is selected */}
        {selectedImage && (
          <div className="w-full">
            <div className="border-t border-gray-300 pt-4 mb-4">
              <h2 className="text-xl font-bold text-center mb-4">CREATE</h2>
            </div>
            
            {/* Selected Image Display */}
            <div className="mb-6 flex justify-center">
              <img src={selectedImage} alt="Selected wallpaper design" className="w-[300px] h-auto border border-gray-300" />
            </div>
            
            {/* Roll Size Selection */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Roll Size *</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Pick a size</option>
                <option>396' l x 21' w: $360</option>
                <option>396' l x 42' w: $700</option>
                <option value="600l-42w" className="bg-cyan-100">600' l x 42' w: $1000</option>
                <option>1200' l x 42' w: $1360</option>
              </select>
            </div>
            
            {/* Create Product Button */}
            <div className="mb-6 flex justify-center">
              <button className="bg-gray-800 text-white py-2 px-8 font-medium">
                Create Product
              </button>
            </div>
            
            {/* Wallpaper Scale Simulation */}
            <div className="border-t border-gray-300 pt-4 mb-4">
              <h3 className="text-lg font-bold text-center mb-4">Wallpaper Scale Simulation</h3>
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  <button className="bg-gray-800 text-white text-xs py-1 px-3">1/4 of actual size</button>
                  <button className="bg-gray-800 text-white text-xs py-1 px-3">1/2 of actual size</button>
                  <button className="bg-gray-800 text-white text-xs py-1 px-3">3/4 of actual size</button>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src={selectedImage} 
                  alt="Wallpaper scale simulation" 
                  className="w-full max-w-[600px] border border-gray-300" 
                />
              </div>
              <div className="text-center text-xs text-gray-500 mt-2">
                Dimensions: 600' l x 42' w • $1000
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
