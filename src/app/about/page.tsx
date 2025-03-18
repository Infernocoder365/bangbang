'use client';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Bang Bang Wallpaper</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          Bang Bang Wallpaper was founded with a simple mission: to make custom wallpaper design accessible to everyone. 
          We believe that your walls should reflect your unique style and personality.
        </p>
        <p className="mb-4">
          Our team of designers and technologists came together to create an innovative platform that combines 
          cutting-edge AI technology with high-quality manufacturing to deliver custom wallpaper designs that 
          transform any space.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Technology</h2>
        <p className="mb-4">
          We use advanced AI image generation technology to create unique wallpaper patterns based on your descriptions. 
          Our system can understand complex design concepts and translate them into beautiful, seamless patterns that 
          are perfect for your home or office.
        </p>
        <p className="mb-4">
          Each design is optimized for wallpaper production, ensuring that the patterns look great when printed at scale 
          and applied to your walls.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Quality & Sustainability</h2>
        <p className="mb-4">
          We're committed to using high-quality, eco-friendly materials for all our wallpapers. Our production process 
          minimizes waste and uses water-based inks that are safe for your home and the environment.
        </p>
        <p className="mb-4">
          All our wallpapers are printed on premium vinyl that is durable, easy to clean, and designed to last for years.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          Have questions about our products or services? We'd love to hear from you!
        </p>
        <p className="mb-2">
          <strong>Email:</strong> info@bangbangwallpaper.com
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> (555) 123-4567
        </p>
        <p className="mb-2">
          <strong>Hours:</strong> Monday-Friday, 9am-5pm EST
        </p>
      </div>
    </div>
  );
}