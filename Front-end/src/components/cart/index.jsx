import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Calculate total prices and quantities
  const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data.items || []); // Ensure to set items correctly
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const updatedCart = cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
          : item
      );
      setCartItems(updatedCart);
      showNotification('Cart updated successfully');
    } catch (err) {
      showNotification('Error updating cart', 'error');
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      setCartItems(cartItems.filter(item => item.productId !== productId));
      showNotification('Item removed from cart');
    } catch (err) {
      showNotification('Error removing item', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  // Loading, error, and empty cart states
  if (isLoading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (cartItems.length === 0) return <div className="empty-cart">Your cart is empty</div>;

  return (
    <div className="cart-page">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <h1 className="cart-title">Shopping Cart ({totalItems} items)</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="farmer-name">Farmer: {item.farmer}</p>
                <p className="item-price">{formatPrice(item.price)} per {item.unit}</p>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                
                <p className="item-total">
                  Total: {formatPrice(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
          </div>
          
          <div className="total-row">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
