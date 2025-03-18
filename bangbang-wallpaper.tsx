{/* We'll use inline CSS instead of the style tag */}import React, { useState } from 'react';

const BangBangWallpaper = () => {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center">
          <svg 
            preserveAspectRatio="xMidYMid meet" 
            viewBox="10 10 180 180" 
            height="40" 
            width="40" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <g>
              <path d="M190 100l-27.182-27.182 26-26L182 40l-26 26-56-56-90 90 56 56-26 26 6.818 6.818 26-26L100 190l90-90zm-159.545 0L100 30.455l45.818 45.818-69.545 69.545L30.455 100zm122.181-17l17 17L100 169.545l-17-17L152.636 83z" fill="#000000"></path>
            </g>
          </svg>
          <div className="flex flex-col">
            <span className="font-medium text-base">BangBang</span>
            <span className="text-base">Wallpaper</span>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center relative">
            <span className="text-sm mr-6">Image Creation</span>
            <span className="text-sm mr-6">How-To-Guide</span>
            <div className="relative">
              <button 
                className="text-sm flex items-center"
                onMouseEnter={() => setShowMoreDropdown(true)}
                onMouseLeave={() => setShowMoreDropdown(false)}
              >
                More
                <svg width="16" height="16" viewBox="0 0 24 24" className="ml-1">
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </button>
              
              {showMoreDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10 py-1"
                  onMouseEnter={() => setShowMoreDropdown(true)}
                  onMouseLeave={() => setShowMoreDropdown(false)}
                >
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">About Us</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Try Me</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Curated Products</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Privacy Policy</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Terms & Conditions</a>
                </div>
              )}
            </div>
          </div>
          
          {/* User and Cart */}
          <div className="flex items-center ml-4">
            <div className="relative mr-4">
              <button 
                className="flex items-center"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="text-black">
                  <circle cx="12" cy="8" r="4" fill="currentColor" />
                  <path d="M4,20 C4,14 8,12 12,12 C16,12 20,14 20,20" fill="currentColor" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" className="ml-1">
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </button>
              
              {showUserDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10 py-1"
                  onMouseEnter={() => setShowUserDropdown(true)}
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <a href="#" className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">My Account</a>
                  <a href="#" className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">My Orders</a>
                  <a href="#" className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">My Addresses</a>
                  <a href="#" className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">My Wallet</a>
                  <a href="#" className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">Log Out</a>
                </div>
              )}
            </div>
            
            <div className="relative">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M7,8 L7,7 C7,4.2 9,2 12,2 C15,2 17,4.2 17,7 L17,8" stroke="black" strokeWidth="2" fill="none" />
                <rect x="5" y="8" width="14" height="14" stroke="black" strokeWidth="2" fill="black" />
                <circle cx="19" cy="8" r="6" fill="black" className="text-xs text-white flex items-center justify-center" />
                <text x="19" y="10" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">0</text>
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="p-6 flex flex-col items-center justify-center text-center" style={{ backgroundImage: "url('/mainBG.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <h1 className="text-2xl font-serif mb-2">Custom Wallpaper,</h1>
        <h1 className="text-2xl font-serif mb-2">Created by you!</h1>
        <h1 className="text-2xl font-serif mb-6">Shipped to your door!</h1>
        
        <p className="text-sm mb-1">You design it.</p>
        <p className="text-sm mb-6">We make it and ship it direct to you.</p>
      </div>
      
      {/* Form Section */}
      <div className="bg-white p-6 flex flex-col items-center">
        {/* Primary Image Input */}
        <div className="w-full max-w-md mb-6">
          <div className="text-sm mb-2">
            <span className="font-medium">Primary Image+ Input</span>
            <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-1">Required Field*</span>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 text-xs text-gray-500"
            placeholder="Drag and drop your images here, or click to select files. High resolution images recommended. AI can fix low quality images, if you have multiple."
          />
        </div>
        
        {/* Design Style */}
        <div className="w-full max-w-md mb-6">
          <div className="text-sm mb-2">
            <span className="font-medium">Design Style</span>
            <span className="text-xs text-gray-500 ml-1">(Optional) Color:</span>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-xs text-gray-500"
            placeholder="Art Deco, Bauhaus, Futuristic, etc..."
          />
        </div>
        
        {/* Enhanced Image Creation */}
        <div className="w-full max-w-md mb-6">
          <div className="text-sm mb-2">
            <span className="font-medium">Enhanced Image Creation</span>
            <span className="text-xs text-gray-500 ml-1">(AI Fields Below this Subheader)</span>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-xs text-gray-500 mb-2"
            placeholder="Screens, Details & Effects"
          />
        </div>
        
        {/* Two Column Section */}
        <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm mb-2 text-center">Pattern Structure</div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-xs text-gray-500"
              placeholder="Symmetrical, Asymmetrical, etc..."
            />
          </div>
          <div>
            <div className="text-sm mb-2 text-center">Mood-Ambience</div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-xs text-gray-500"
              placeholder="Bright, Vibrant, Moody, etc..."
            />
          </div>
        </div>
        
        {/* Second Two Column Section */}
        <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm mb-2 text-center">Specific Qualities</div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-xs text-gray-500"
              placeholder="Textured, Handpainted, Sleek, etc..."
            />
          </div>
          <div>
            <div className="text-sm mb-2 text-center">Basic Adjectives</div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-xs text-gray-500"
              placeholder="Elegant, Whimsical, Playful, etc..."
            />
          </div>
        </div>
        
        {/* Button */}
        <button className="bg-gray-800 text-white px-6 py-2 text-sm mb-6">
          Reset Output Only
        </button>
        
        {/* Tabs */}
        <div className="w-full max-w-md border-b border-gray-300 flex text-xs mb-4">
          <div className="px-2 py-1 border-b-2 border-gray-800 font-medium">Design Style & Accents, Details, Effects</div>
          <div className="px-2 py-1">Pattern Structure & Mood-Ambience</div>
          <div className="px-2 py-1">Specific Qualities & Tone/Adjectives</div>
        </div>
        
        {/* List Items */}
        <div className="w-full max-w-md text-xs mb-8">
          <ul className="list-disc pl-5">
            <li className="mb-2">Design Style Controls the overall theme of your wallpaper. Examples include, but are not limited to: Art Deco, Victorian, Minimalist, etc.</li>
            <li className="mb-2">Accents, Details, & Effects: Add extra elements or details to enhance the appearance of the wallpaper pattern. Examples include gold accents, watercolor effects, or specific decorative elements.</li>
          </ul>
        </div>
        
        {/* Color Picker */}
        <div className="w-full max-w-md mb-8">
          <div className="text-base font-medium text-center border-b border-gray-300 pb-2 mb-4">
            Color Picker
          </div>
          
          <div className="flex mb-4">
            {/* Left side - Color wheel */}
            <div className="w-1/2 pr-2">
              <div className="relative w-full aspect-square rounded-full border border-gray-200 overflow-hidden mb-3">
                {/* This would be a color wheel in an actual implementation */}
                <div className="absolute inset-0 rounded-full" style={{ 
                  background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)'
                }}></div>
                {/* Color selection indicator */}
                <div className="absolute rounded-full w-3 h-3 border-2 border-white" 
                  style={{ top: '20%', left: '80%', boxShadow: '0 0 0 1px rgba(0,0,0,0.3)' }}></div>
              </div>
              
              {/* Saturation/Lightness slider */}
              <div className="w-full h-4 mb-2 rounded relative">
                <div className="w-full h-full rounded" style={{ 
                  background: 'linear-gradient(to right, #000, #f00)'
                }}></div>
                <div className="absolute top-0 h-full w-1 bg-white border border-gray-300" 
                  style={{ left: '75%', transform: 'translateX(-50%)' }}></div>
              </div>
              
              {/* Opacity slider */}
              <div className="w-full h-4 rounded relative bg-white" 
                style={{ backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', 
                backgroundSize: '8px 8px', 
                backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px' }}>
                <div className="absolute inset-0 rounded" style={{ 
                  background: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))'
                }}></div>
                <div className="absolute top-0 h-full w-1 bg-white border border-gray-300" 
                  style={{ left: '100%', transform: 'translateX(-50%)' }}></div>
              </div>
            </div>
            
            {/* Right side - Color inputs and swatches */}
            <div className="w-1/2 pl-2">
              {/* Current color display */}
              <div className="flex mb-3">
                <div className="w-10 h-10 rounded mr-2 border border-gray-200" 
                  style={{ 
                    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', 
                    backgroundSize: '8px 8px', 
                    backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px' 
                  }}>
                  <div className="w-full h-full" style={{ backgroundColor: 'rgba(255,0,0,1)' }}></div>
                </div>
                <div className="flex-1">
                  <input type="text" className="w-full border rounded p-1 text-xs mb-1" defaultValue="#FF0000" />
                  <div className="flex gap-1">
                    <input type="text" className="w-8 border rounded p-1 text-xs" defaultValue="255" />
                    <input type="text" className="w-8 border rounded p-1 text-xs" defaultValue="0" />
                    <input type="text" className="w-8 border rounded p-1 text-xs" defaultValue="0" />
                    <input type="text" className="w-8 border rounded p-1 text-xs" defaultValue="100%" />
                  </div>
                </div>
              </div>
              
              {/* Color format selector */}
              <div className="flex text-xs border rounded mb-3 overflow-hidden">
                <div className="flex-1 py-1 text-center bg-gray-100 border-r">HEX</div>
                <div className="flex-1 py-1 text-center border-r">RGB</div>
                <div className="flex-1 py-1 text-center border-r">HSL</div>
                <div className="flex-1 py-1 text-center">HSB</div>
              </div>
              
              {/* Recent colors */}
              <div className="mb-3">
                <div className="text-xs mb-1">Recent Colors</div>
                <div className="grid grid-cols-5 gap-1">
                  {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
                    '#00FFFF', '#FF5500', '#55FF00', '#0055FF', '#FF0055'].map((color) => (
                    <div 
                      key={color} 
                      className="w-full aspect-square rounded border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Color harmony */}
          <div className="mb-4">
            <div className="text-xs mb-1">Color Harmony</div>
            <div className="flex justify-between gap-1">
              {['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00'].map((color) => (
                <div 
                  key={color} 
                  className="flex-1 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          {/* Color palettes */}
          <div className="mb-2">
            <div className="text-xs mb-1">Saved Palettes</div>
            <div className="flex mb-1">
              <div className="flex-1 h-4 rounded-l" style={{ backgroundColor: '#264653' }}></div>
              <div className="flex-1 h-4" style={{ backgroundColor: '#2a9d8f' }}></div>
              <div className="flex-1 h-4" style={{ backgroundColor: '#e9c46a' }}></div>
              <div className="flex-1 h-4" style={{ backgroundColor: '#f4a261' }}></div>
              <div className="flex-1 h-4 rounded-r" style={{ backgroundColor: '#e76f51' }}></div>
            </div>
            <div className="flex mb-1">
              <div className="flex-1 h-4 rounded-l" style={{ backgroundColor: '#8ecae6' }}></div>
              <div className="flex-1 h-4" style={{ backgroundColor: '#219ebc' }}></div>
              <div className="flex-1 h-4" style={{ backgroundColor: '#023047' }}></div>
              <div className="flex-1 h-4" style={{ backgroundColor: '#ffb703' }}></div>
              <div className="flex-1 h-4 rounded-r" style={{ backgroundColor: '#fb8500' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Section */}
      <div className="bg-gray-800 text-white py-2 text-center">
        <h2 className="uppercase font-bold">Create</h2>
      </div>
      
      {/* Preview Section */}
      <div className="bg-white p-4 flex flex-col items-center">
        <p className="text-sm text-center mb-4">No active request yet</p>
        
        {/* Preview Image Placeholder */}
        <div className="mb-6 w-[512px] h-[512px] border border-gray-200 flex items-center justify-center bg-gray-50">
          <img src="/ImagePlaceHolder.png" alt="Preview Image Placeholder" className="max-w-full max-h-full" />
        </div>
        
        <p className="text-xs text-center text-gray-500 mb-6">
          Generated images will display above when ready
        </p>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M12,3 L4,10 L4,21 L9,21 L9,14 L15,14 L15,21 L20,21 L20,10 L12,3 Z" stroke="black" strokeWidth="1" fill="none" />
            </svg>
            <span className="text-xs ml-1">Operations</span>
          </div>
          
          <div className="text-xs">Join the Community</div>
          
          <div className="flex items-center">
            <span className="text-xs mr-1">Ways to Use</span>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1" fill="none" />
              <path d="M9,16 L15,8" stroke="black" strokeWidth="1" />
              <circle cx="9" cy="16" r="1" fill="black" />
              <circle cx="15" cy="8" r="1" fill="black" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-3 mb-8">
          <div className="text-xs text-gray-500">
            <p>Mon-Fri 8-6pm, PST</p>
            <p className="font-medium">hello@company.com</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
          
          <div className="col-span-2 flex justify-center">
            <div className="flex">
              <input
                type="email"
                className="border border-gray-300 border-r-0 rounded-l px-3 py-1 text-xs w-full"
                placeholder="Email"
              />
              <button className="border border-gray-300 border-l-0 rounded-r px-3 py-1 text-xs bg-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <svg 
                preserveAspectRatio="xMidYMid meet" 
                viewBox="10 10 180 180" 
                height="40" 
                width="40" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="M190 100l-27.182-27.182 26-26L182 40l-26 26-56-56-90 90 56 56-26 26 6.818 6.818 26-26L100 190l90-90zm-159.545 0L100 30.455l45.818 45.818-69.545 69.545L30.455 100zm122.181-17l17 17L100 169.545l-17-17L152.636 83z" fill="#BC8B4A"></path>
                </g>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium">BangBang</span>
              <span className="text-lg">Wallpaper</span>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="flex justify-center space-x-3 mb-8">
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
        </div>
      </footer>
    </div>
  );
};

export default BangBangWallpaper;
