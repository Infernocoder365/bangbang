import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 p-4 w-3/4 mx-auto">
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <div className="flex items-center">
            <Image src="/operations.png" alt="Operations" width={30} height={30} />
            <span className="ml-1 text-xl">Operations</span>
          </div>
          {/* First column - Contact info */}
          <div className="text-md text-black" style={{marginLeft: "30px"}}>
            <p>Mon - Fri, 8 am - 4 pm</p>
            <p className="text-lg font-bold">Information</p>
            <p><Link href="/about">About Us</Link></p>
            <p><Link href="/privacy-policy">Privacy Policy</Link></p>
            <p><Link href="/terms-conditions">Terms & Conditions</Link></p>
          </div>
        </div>
        
        {/* Second column - Newsletter signup */}
        <div className="flex flex-col justify-center items-center">
          <div className="font-medium mb-1 text-xl">Join the Community</div>
          <div className="flex w-full">
            <input
              type="email"
              className="border-b-2 border-gray-300 px-3 py-1 text-xs w-full"
              placeholder="Email"
            />
          </div>
          <button className="border border-gray-300 rounded px-3 py-1 text-xs bg-white hover:bg-gray-50 transition-colors mt-2 w-full">
            Sign Up
          </button>
        </div>
        
        {/* Third column - Social links */}
        <div className="flex flex-col items-end">
          <Link href="/write-to-us" className="flex items-center">
            <span className="font-medium mr-1 text-xl">Write to US</span>
            <Image src="/writeUs.png" alt="Write to Us" width={46} height={46} />
          </Link>
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
                <path d="M190 100l-27.182-27.182 26-26L182 40l-26 26-56-56-90 90 56 56-26 26 6.818 6.818 26-26L100 190l90-90zm-159.545 0L100 30.455l45.818 45.818-69.545 69.545L30.455 100zm122.181-17l17 17L100 169.545l-17-17L152.636 83z" fill="#000000"></path>
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
      <div className="flex justify-center space-x-3 mb-8 items-center">
        <Image className='mt-2' src="/payment.png" alt="payment" width={500} height={80} />
        <Image src="/social.png" alt="social" width={230} height={80} />
      </div>
    </footer>
  );
};

export default Footer;