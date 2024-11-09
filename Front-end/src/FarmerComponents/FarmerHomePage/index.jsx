
import React from 'react';
import { useState, useEffect } from 'react';
import "./index.css"

const FarmersHome = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    farmer: '',
    price: '',
    unit: '',
    image: null
  });

 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('farmer', formData.farmer);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('unit', formData.unit);
    formDataToSend.append('image', formData.image);

    try {
      await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formDataToSend,
      });
      setFormData({
        name: '',
        farmer: '',
        price: '',
        unit: '',
        image: null
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Farmer's Marketplace</h1>
      
      <div className="upload-form">
        <h2>Add New Crop</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                placeholder="Crop Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Farmer Name"
              value={formData.farmer}
              onChange={(e) => setFormData({...formData, farmer: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div className="form-group">
            <select
              value={formData.unit}
              onChange={(e) => setFormData({...formData, unit: e.target.value})}
            >
              <option value="">Select Unit</option>
              <option value="kg">Kilogram</option>
              <option value="ton">Ton</option>
              <option value="quintal">Quintal</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="file"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
            />
          </div>
          <button type="submit">Upload Crop</button>
        </form>
      </div>

      {/* Products Display */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Farmer: {product.farmer}</p>
            <p>Price: ₹{product.price}/{product.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmersHome;
