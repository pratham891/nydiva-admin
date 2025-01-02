import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onAddProduct({ name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#191c24', padding: '20px', borderRadius: '5px' }}>
      <div className="mb-3">
        <label className="form-label text-light">Product Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: '#2A3038', color: '#fff' }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-light">Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ backgroundColor: '#2A3038', color: '#fff' }}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  );
};

export default ProductForm;
