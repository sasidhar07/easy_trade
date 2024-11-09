import React from 'react';
import { Search, Leaf, DollarSign, Truck } from 'lucide-react';
import "./index.css"

const HomePage = () => {
  return (
    <div className="home-page">
      

      <main className="container">
        <section className="welcome">
          <h2>Welcome to EasyTrade</h2>
          <p>Connect directly with farmers and buy fresh produce at fair prices</p>
        </section>

        <section className="search-section">
          <div className="search-container">
            <h3>Find Products</h3>
            <div className="search-bar">
              <input type="text" placeholder="Search for crops or products" />
              <button>
                <Search size={24} />
              </button>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <Leaf size={48} />
            <h3>Fresh Products</h3>
            <p>Direct from farms to your doorstep</p>
          </div>
          <div className="feature">
            <DollarSign size={48} />
            <h3>Fair Pricing</h3>
            <p>Transparent prices without middlemen</p>
          </div>
          <div className="feature">
            <Truck size={48} />
            <h3>Easy Delivery</h3>
            <p>Efficient logistics for timely delivery</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 EasyTrade. All rights reserved.</p>
        </div>
      </footer>

      
    </div>
  );
};

export default HomePage;