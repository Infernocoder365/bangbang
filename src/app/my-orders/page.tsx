'use client';

import React from 'react';
import Link from 'next/link';

export default function MyOrders() {
  // Empty orders state
  const orders = [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Account Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex">
          <Link href="/my-account" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            My Account
          </Link>
          <Link href="/my-orders" className="border-b-2 border-black px-4 py-2 font-medium text-sm">
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
      
      <h1 className="text-2xl font-bold mb-2">My Orders</h1>
      <p className="text-sm text-gray-600 mb-8">View your order history or check the status of a recent order.</p>
      
      <div className="text-center py-12">
        <p className="text-lg mb-6">You haven't placed any orders yet.</p>
        <Link 
          href="/" 
          className="bg-black text-white px-6 py-3 rounded text-sm hover:bg-gray-800 transition-colors inline-block"
        >
          Start Browsing
        </Link>
      </div>
    </div>
  );
}