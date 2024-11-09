import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import { Search} from 'lucide-react';

import './index.css';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('your_user_id'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const token = Cookies.get('jwt_token');
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setAllProducts(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setProducts(allProducts);
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const addToCart = (productId) => {
    const quantity = 1; 
    const token = Cookies.get('jwt_token');
    fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        return response.json();
      })
      .then((data) => {
        setNotification({ show: true, message: 'Added to cart successfully!' });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000); 
      })
      .catch((error) => {
        setNotification({ show: true, message: 'Error adding to cart' });
        console.error('Error adding to cart:', error);
      });
  };

  if (isLoading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="page-container">
        <main className="container">
          <div className="header-actions">
            <h2>Available Products</h2>
            <button className="btn-primary">Filter</button>
          </div>

          <section className="search-section">
          <div className="search-container">
            <h3>Find Products</h3>
            <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
            />              
            <button className="search-btn" onClick={handleSearch}>
                <Search size={24} />
              </button>
            </div>
          </div>
        </section>

         

          {notification.show && (
            <div className="notification">
              {notification.message}
            </div>
          )}

          <div className="product-grid">
            {products.length === 0 ? (
              <div className="no-products">No products found</div>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="farmer-name">Farmer: {product.farmer}</p>
                    <p className="price-tag">
                      {formatPrice(product.price)} per {product.unit}
                    </p>
                    <button
                    className='btn-primary'
                      onClick={() => addToCart(product._id)}  
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <footer>
          <div className="container">
            <p>&copy; 2024 EasyTrade. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductListingPage;
