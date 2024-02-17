// Welcome.js

import React from 'react';
import './Welcome.css';

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const userTypeClass = (user) ? user.result.userType.toLowerCase() : 'default';

  return (
    <div className={`banner ${userTypeClass}`}>
      <div className="banner-content">
        {user && user.result.userType === "BUYER" ? (
          <>
            <h1>Welcome, Valued Shopper!</h1>
            <p>
              Dive into our decentralized shopping platform, designed to enhance your experience.
              Discover incredible products with utmost transparency and enjoy personalized recommendations, all while prioritizing your data privacy.
            </p>
            <p>
              Our commitment is to provide you with high-quality products and exceptional service. Explore our diverse range of items and find exactly what you need.
            </p>
            <p>Embark on your shopping journey with us today!</p>
          </>
        ) : user && user.result.userType === "SELLER" ? (
          <>
            <h1>Welcome, Seller!</h1>
            <p>
              Join our decentralized platform and experience a transparent and personalized selling environment.
              Benefit from connecting with customers seeking high-quality products while ensuring the privacy of your data.
            </p>
            <p>
              Our mission is to facilitate your success by providing a platform for your unique offerings. List your items and start your selling journey today!
            </p>
            <p>Begin your selling adventure with us now!</p>
          </>
        ) : (
          <>
            <h1>Welcome to Our Platform</h1>
            <p>
              Explore our decentralized shopping platform, where transparency and personalization meet the highest standards of data privacy.
            </p>
            <p>
              Our mission is to deliver superior products with exceptional service. Browse through our extensive collection and find exactly what you're looking for.
            </p>
            <p>Commence your journey with us today!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
