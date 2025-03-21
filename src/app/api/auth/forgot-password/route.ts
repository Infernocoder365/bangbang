import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Function to generate a random token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Function to send password reset email
async function sendPasswordResetEmail(email: string, token: string, name: string) {
  // Create a test account using Ethereal for development
  // In production, you would use your actual SMTP credentials
  const testAccount = await nodemailer.createTestAccount();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER || testAccount.user,
      pass: process.env.EMAIL_SERVER_PASSWORD || testAccount.pass,
    },
  });

  // Create reset URL
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"BangBang Wallpaper" <${process.env.EMAIL_FROM || 'noreply@bangbang.com'}>`,
    to: email,
    subject: 'Reset Your Password',
    text: `Hello ${name},\n\nYou requested a password reset for your BangBang Wallpaper account. Please click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>Hello ${name},</p>
        <p>You requested a password reset for your BangBang Wallpaper account. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Reset Password</a>
        </div>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="word-break: break-all; color: #4a5568;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Best regards,<br>The BangBang Wallpaper Team</p>
      </div>
    `,
  });

  // For development, log the URL where the email can be previewed
  if (process.env.NODE_ENV === 'development') {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  return info;
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'Please provide an email address' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Don't reveal if a user exists or not for security reasons
    // Instead, always return a success message
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists with this email, we\'ve sent a password reset link.' },
        { status: 200 }
      );
    }

    // Generate a reset token
    const resetToken = generateToken();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour

    // Update the user with the reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken, user.name);

    return NextResponse.json(
      { message: 'If an account exists with this email, we\'ve sent a password reset link.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}