"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const moreDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && event.target instanceof Node && !(moreDropdownRef.current as Node).contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (userDropdownRef.current && event.target instanceof Node && !(userDropdownRef.current as Node).contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMoreDropdown = () => {
    setShowMoreDropdown(!showMoreDropdown);
    // Close other dropdown when opening this one
    if (!showMoreDropdown) setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    // Close other dropdown when opening this one
    if (!showUserDropdown) setShowMoreDropdown(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center ml-5">
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
          <span className="text-3xl font-medium">BangBang</span>
          <span className="text-3xl font-medium">Wallpaper</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center">
        <div className="bg-gray-100 rounded-full p-4 flex items-center relative" style={{ backgroundColor: "rgba(238,232,216,1)" }}>
          <Link href="/" className="text-md mr-6 font-bold">Image Creation</Link>
          <Link href="/how-to-guide" className="text-md mr-6">How-To-Guide</Link>
          <div className="relative" ref={moreDropdownRef}>
            <button
              className="text-md flex items-center"
              onClick={toggleMoreDropdown}
            >
              More
            </button>

            {showMoreDropdown && (
              <div
                className="absolute right-0 mt-6 w-48 bg-white rounded shadow-lg z-10 py-1" style={{ backgroundColor: "rgba(238,232,216,1)" }}
              >
                <Link href="/about" className="block px-4 py-2 text-sm hover:bg-gray-100">About Us</Link>
                <Link href="/try-me" className="block px-4 py-2 text-sm hover:bg-gray-100">Try Me</Link>
                <Link href="/curated-products" className="block px-4 py-2 text-sm hover:bg-gray-100">Curated Products</Link>
                <Link href="/privacy-policy" className="block px-4 py-2 text-sm hover:bg-gray-100">Privacy Policy</Link>
                <Link href="/terms-conditions" className="block px-4 py-2 text-sm hover:bg-gray-100">Terms & Conditions</Link>
              </div>
            )}
          </div>
        </div>

        {/* User and Cart */}
        <div className="flex items-center ml-4">
          <div className="relative mr-4" ref={userDropdownRef}>
            <button
              className="flex items-center"
              onClick={toggleUserDropdown}
            >
              <span>
                <svg data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50"><g><path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path></g></svg>
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" className="ml-1">
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </button>

            {showUserDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10 py-1"
              >
                <Link href="/my-account" className="block px-4 py-2 text-sm hover:bg-gray-100">My Account</Link>
                <Link href="/my-orders" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                <Link href="/my-addresses" className="block px-4 py-2 text-sm hover:bg-gray-100">My Addresses</Link>
                <Link href="/my-wallet" className="block px-4 py-2 text-sm hover:bg-gray-100">My Wallet</Link>
                <Link href="/logout" className="block px-4 py-2 text-sm hover:bg-gray-100">Log Out</Link>
              </div>
            )}
          </div>

          <Link href="/cart" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="40px" viewBox="5.7 0 105.5 126.1" preserveAspectRatio="xMinYMax meet" data-hook="svg-icon-1">
              <path d="M99.8 28.4c0-1.2-0.9-2-2.1-2h-15c0 3.2 0 7.6 0 8.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0.3-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.9 0-4.7 0-8.2H40.1c0 3.2 0 7.3 0 8.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.6 0-5 0-8.2h-15c-1.2 0-2 0.9-2 2L8.3 124c0 1.2 0.9 2.1 2.1 2.1h96.3c1.2 0 2.1-0.9 2.1-2.1L99.8 28.4z" fill="black"></path>
              <path d="M59.1 5.9c-2.9 0-2 0-2.9 0 -2 0-4.4 0.6-6.4 1.5 -3.2 1.5-5.9 4.1-7.6 7.3 -0.9 1.8-1.5 3.5-1.8 5.6 0 0.9-0.3 1.5-0.3 2.3 0 1.2 0 2.1 0 3.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-1.2 0-2.3 0-3.5 0-3.2 0.9-6.4 2-9.4 1.2-2.3 2.6-4.7 4.7-6.4 3.2-2.9 6.7-5 11.1-5.9C53.5 0.3 55 0 56.7 0c1.5 0 2.9 0 4.4 0 2.9 0 5.6 0.6 7.9 1.8 2.6 1.2 5 2.6 6.7 4.4 3.2 3.2 5.3 6.7 6.4 11.1 0.3 1.5 0.6 3.2 0.6 4.7 0 1.2 0 2.3 0 3.2 0 1.5-1.2 2.6-2.6 2.9s-2.9-0.9-3.2-2.3c0-0.3 0-0.3 0-0.6 0-1.2 0-2.6 0-3.8 0-2.3-0.6-4.4-1.8-6.4 -1.5-3.2-4.1-5.9-7.3-7.3 -1.8-0.9-3.5-1.8-5.9-1.8C61.1 5.9 59.1 5.9 59.1 5.9L59.1 5.9z" fill="black"></path>
              <text x="58.5" y="77" dy=".35em" textAnchor="middle" fill='white' style={{fontSize: "40px"}}>0</text>
              
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;