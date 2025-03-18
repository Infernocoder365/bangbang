'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Define interface for address object
interface Address {
  id: number;
  name: string;
  recipient: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

// Define interface for form data
interface AddressFormData {
  name: string;
  recipient: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function MyAddresses() {
  // Empty addresses state to match the design
  const [addresses, setAddresses] = useState<Address[]>([]);

  // State for new/edit address form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    recipient: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddAddress = () => {
    setIsAddingAddress(true);
    setIsEditingAddress(false);
    setFormData({
      name: '',
      recipient: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false,
    });
  };

  const handleEditAddress = (address: Address) => {
    setIsEditingAddress(true);
    setIsAddingAddress(false);
    setCurrentAddress(address);
    setFormData({
      name: address.name,
      recipient: address.recipient,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isAddingAddress) {
      // Add new address
      const newAddress: Address = {
        id: Date.now(), // Simple ID generation
        ...formData,
      };
      
      // If this is set as default, update other addresses
      if (formData.isDefault) {
        setAddresses(addresses.map(addr => ({
          ...addr,
          isDefault: false,
        })));
      }
      
      setAddresses([...addresses, newAddress]);
    } else if (isEditingAddress && currentAddress) {
      // Update existing address
      // If this is set as default, update other addresses
      if (formData.isDefault) {
        setAddresses(addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === currentAddress.id ? formData.isDefault : false,
        })));
      } else {
        setAddresses(addresses.map(addr =>
          addr.id === currentAddress.id ? { ...addr, ...formData } : addr
        ));
      }
    }
    
    // Reset form
    setIsAddingAddress(false);
    setIsEditingAddress(false);
    setCurrentAddress(null);
  };

  const handleDeleteAddress = (addressId: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
    }
  };

  const handleSetDefault = (addressId: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
    })));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Account Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex">
          <Link href="/my-account" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Account
          </Link>
          <Link href="/my-orders" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Orders
          </Link>
          <Link href="/my-addresses" className="border-b-2 border-black px-4 py-2 font-medium text-sm">
            My Addresses
          </Link>
          <Link href="/my-wallet" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Wallet
          </Link>
        </nav>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">My Addresses</h1>
      <p className="text-sm text-gray-600 mb-8">Add and manage the addresses you use often.</p>
      
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-6">You haven't saved any addresses yet.</p>
          <button 
            onClick={handleAddAddress}
            className="bg-black text-white px-6 py-3 rounded text-sm hover:bg-gray-800 transition-colors inline-block"
          >
            Add New Address
          </button>
        </div>
      ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.isDefault && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{address.recipient}</p>
                    <p className="text-sm">{address.street}</p>
                    <p className="text-sm">{address.city}, {address.state} {address.zipCode}</p>
                    <p className="text-sm">{address.country}</p>
                    <p className="text-sm">{address.phone}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => handleEditAddress(address)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                    {!address.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      
      {/* Add/Edit Address Form */}
      {(isAddingAddress || isEditingAddress) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isAddingAddress ? 'Add New Address' : 'Edit Address'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Address Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Home, Office, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Recipient's full name"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Street address, apartment, suite, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Set as default shipping address</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                type="button"
                onClick={() => {
                  setIsAddingAddress(false);
                  setIsEditingAddress(false);
                }}
                className="border border-gray-300 px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm"
              >
                {isAddingAddress ? 'Add Address' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Shipping Policy */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Shipping Policy</h2>
        <div className="text-sm text-gray-600">
          <p className="mb-2">We currently ship to the United States, Canada, United Kingdom, and Australia.</p>
          <p className="mb-2">Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout.</p>
          <p>For international orders, please note that customs fees may apply depending on your country's regulations.</p>
        </div>
      </div>
    </div>
  );
}