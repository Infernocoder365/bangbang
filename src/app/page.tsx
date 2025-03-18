'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ColorPicker from '../components/ColorPicker';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  
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
      </div>
      <div className="w-3/4 mx-auto">
        <ColorPicker onColorSelect={(color) => console.log('Selected color:', color)} />
      </div>
      {/* Create Section */}
      <div className="bg-gray-800 text-white py-2 text-center">
        <h2 className="uppercase font-bold">Create</h2>
      </div>

      {/* Preview Section */}
      <div className="bg-white p-4 flex flex-col items-center w-3/4 mx-auto">
        <p className="text-md text-center mb-4">No active request yet</p>

        {/* Preview Image Placeholder */}
        <div className="mb-6 w-[512px] h-[512px] border border-gray-200 flex items-center justify-center bg-gray-50">
          <img src="/ImagePlaceHolder.png" alt="Preview placeholder" className="max-w-full max-h-full" />
        </div>

        <p className="text-xs text-center text-gray-500 mb-6">
          Generated images will display above when ready
        </p>
      </div>
    </div>
  );
}
