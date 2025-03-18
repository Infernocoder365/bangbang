import React from 'react';
import Link from 'next/link';

export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
      
      <div className="prose prose-sm max-w-none">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>Welcome to BangBang Wallpaper. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website or purchasing our products, we assume you accept these terms and conditions in full. Do not continue to use BangBang Wallpaper's website if you do not accept all of the terms and conditions stated on this page.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. License to Use Website</h2>
        <p>Unless otherwise stated, BangBang Wallpaper and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.</p>
        <p className="mt-2">You must not:</p>
        <ul className="list-disc pl-5 my-4 space-y-2">
          <li>Republish material from this website</li>
          <li>Sell, rent or sub-license material from this website</li>
          <li>Reproduce, duplicate or copy material from this website</li>
          <li>Redistribute content from BangBang Wallpaper (unless content is specifically made for redistribution)</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Product Orders</h2>
        <p>By placing an order through our website, you warrant that:</p>
        <ul className="list-disc pl-5 my-4 space-y-2">
          <li>You are legally capable of entering into binding contracts</li>
          <li>You are at least 18 years old</li>
          <li>The information you provide during the ordering process is accurate and complete</li>
        </ul>
        <p>All orders are subject to acceptance and availability. We reserve the right to refuse any order placed with us.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Custom Designs</h2>
        <p>When using our custom wallpaper design tool, you agree that:</p>
        <ul className="list-disc pl-5 my-4 space-y-2">
          <li>You own or have permission to use any images you upload</li>
          <li>Your designs do not infringe on any copyright, trademark, or other intellectual property rights</li>
          <li>Your designs do not contain any offensive, illegal, or inappropriate content</li>
          <li>We reserve the right to refuse production of any design that violates these terms</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Pricing and Payment</h2>
        <p>All prices shown on our website are in USD and exclude shipping costs unless otherwise stated. We reserve the right to change prices at any time without notice. Payment must be made in full before the production of your order begins.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Shipping and Delivery</h2>
        <p>Delivery times are estimates only and commence from the date of shipping, not the date of order. We are not responsible for delays outside our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Returns and Refunds</h2>
        <p>Due to the custom nature of our products, we cannot accept returns unless the product is damaged or defective. If you receive a damaged product, please contact us within 7 days of receipt.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
        <ul className="list-disc pl-5 my-4 space-y-2">
          <li>Limit or exclude our or your liability for death or personal injury</li>
          <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
          <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
          <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
        <p>We reserve the right to revise these terms and conditions at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms and conditions.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
        <p className="mt-2">
          <strong>Email:</strong> hello@company.com<br />
          <strong>Phone:</strong> (555) 123-4567<br />
          <strong>Hours:</strong> Monday-Friday, 8am-6pm PST
        </p>
      </div>
      
      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    </div>
  );
}