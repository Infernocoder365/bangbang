'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MyAccount() {
  // Sample user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'Amvaneke@paladineequitycapital.com',
    phone: '+1 (555) 123-4567',
  });

  // State for form editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and submit to an API
    setUserData({
      ...userData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    });
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Account Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex">
          <Link href="/my-account" className="border-b-2 border-black px-4 py-2 font-medium text-sm">
            My Account
          </Link>
          <Link href="/my-orders" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Orders
          </Link>
          <Link href="/my-addresses" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Addresses
          </Link>
          <Link href="/my-wallet" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Wallet
          </Link>
        </nav>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <p className="text-sm text-gray-600 mb-8">View and edit your personal info below.</p>
      
      {/* Personal Info */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Personal Info</h2>
        <p className="text-sm text-gray-600 mb-4">Update your personal information.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          {isEditing ? (
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                type="button"
                onClick={handleDiscard}
                className="border border-gray-300 px-4 py-2 rounded text-sm"
              >
                Discard
              </button>
              <button 
                type="submit"
                className="bg-black text-white px-4 py-2 rounded text-sm"
              >
                Update Info
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-4">
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-black text-white px-4 py-2 rounded text-sm"
              >
                Edit
              </button>
            </div>
          )}
        </form>
      </div>
      
      {/* Login Info */}
      <div>
        <h2 className="text-lg font-medium mb-4">Login info</h2>
        <p className="text-sm text-gray-600 mb-4">View and update your login email and password.</p>
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Login email:</p>
          <p className="text-sm">{userData.email}</p>
          <button className="text-sm text-gray-800 hover:text-gray-900 underline mt-1">Change Email</button>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Password:</p>
          <p className="text-sm">••••••</p>
          <button className="text-sm text-gray-800 hover:text-gray-900 underline mt-1">Change Password</button>
        </div>
      </div>
    </div>
  );
}