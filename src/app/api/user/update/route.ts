import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function PUT(request: NextRequest) {
  try {
    // Get the current session to verify the user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectDB();

    // Parse the request body
    const { firstName, lastName, phone } = await request.json();

    // Validate input
    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: 'First name and last name are required' },
        { status: 400 }
      );
    }

    // Find the user by ID from the session
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Update user information
    user.name = `${firstName} ${lastName}`;
    await user.save();

    return NextResponse.json(
      { 
        message: 'User information updated successfully',
        user: {
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred while updating user information' },
      { status: 500 }
    );
  }
}