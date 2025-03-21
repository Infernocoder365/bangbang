import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import nodemailer from 'nodemailer';

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send verification email
async function sendVerificationEmail(email: string, otp: string, name: string) {
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

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"BangBang Wallpaper" <${process.env.EMAIL_FROM || 'noreply@bangbang.com'}>`,
    to: email,
    subject: 'Your New Verification Code',
    text: `Hello ${name},\n\nYou requested a new verification code for BangBang Wallpaper. Your verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your New Verification Code</h2>
        <p>Hello ${name},</p>
        <p>You requested a new verification code for BangBang Wallpaper. Please use the verification code below to complete your registration:</p>
        <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
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

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // If user is already verified, don't send a new OTP
    if (user.isVerified) {
      return NextResponse.json(
        { message: 'Your email is already verified' },
        { status: 400 }
      );
    }

    // Generate a new OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes

    // Update the user with new verification token
    user.verificationToken = otp;
    user.verificationTokenExpiry = otpExpiry;
    await user.save();

    // Send verification email
    await sendVerificationEmail(email, otp, user.name);

    return NextResponse.json(
      { message: 'A new verification code has been sent to your email' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred while resending the verification code' },
      { status: 500 }
    );
  }
}