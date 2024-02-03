// Banner.jsx
import React from 'react';
import './Welcome.css'; // Import the corresponding CSS file

const Welcome = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Welcome to Our Website</h1>
        <p>
          Explore a world of amazing products and discover the best deals. We
          are dedicated to providing you with a seamless shopping experience.
        </p>
        <p>
          Our mission is to deliver high-quality products with exceptional
          service. Browse through our wide range of items and find exactly what
          you need.
        </p>
        <p>Start your journey with us today!</p>
      </div>
    </div>
  );
};

export default Welcome;
