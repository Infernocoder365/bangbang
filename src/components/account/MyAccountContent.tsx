'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function MyAccountContent() {
  const { data: session } = useSession();

  // State for user data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  // Fetch user data when session is available
  useEffect(() => {
    if (session?.user) {
      // Parse the user's name into first and last name
      const fullName = session.user.name || '';
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setUserData({
        firstName,
        lastName,
        email: session.user.email || '',
        phone: '',  // We don't have phone in the session, would need to fetch from API
      });

      setFormData({
        firstName,
        lastName,
        phone: '',
      });

      setIsLoading(false);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUpdateSuccess(false);

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user information');
      }

      // Update local state with the new data
      setUserData({
        ...userData,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      });

      setUpdateSuccess(true);
      setIsEditing(false);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your information');
    }
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
    <>
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <p className="text-sm text-gray-600 mb-8">View and edit your personal info below.</p>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* Personal Info */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Personal Info</h2>
            <p className="text-sm text-gray-600 mb-4">Update your personal information.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            {updateSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
                Your information has been updated successfully.
              </div>
            )}

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
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 focus:outline-none"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">To change your email, please contact support.</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  disabled={!isEditing}
                />
              </div>

              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Discard
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
              )}
            </form>
          </div>

          {/* Account Security */}
          <div>
            <h2 className="text-lg font-medium mb-4">Account Security</h2>
            <p className="text-sm text-gray-600 mb-4">Manage your password and account security.</p>

            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-gray-600">Last updated 3 months ago</p>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900">Change</button>
              </div>
            </div>

            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Two-factor authentication</h3>
                  <p className="text-sm text-gray-600">Not enabled</p>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900">Enable</button>
              </div>
            </div>
          </div>
        </>
      )
      }
      </>
      );
}