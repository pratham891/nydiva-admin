import React, { useState } from 'react';
import productsData from '../data';
import { v4 as uuidv4 } from 'uuid';

const ManageProducts = () => {
  const [products, setProducts] = useState(productsData);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };



  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      alert('All fields are required.');
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: URL.createObjectURL(formData.image), // Temporarily set URL for preview
    };

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const imageData = fileReader.result;

      const formDataToSend = {
        id: uuidv4(),
        name: formData.name,
        price: formData.price,
        description: formData.description,
        images: [imageData], // Send image as base64 string in an array
      };

      try {
        const response = await fetch('/api/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToSend),
        });

        if (!response.ok) {
          throw new Error('Failed to create product');
        } else alert(`Product ${formData.name} created successfully`);

        const savedProduct = await response.json();
        setProducts([...products, savedProduct]);
        setFormData({ name: '', price: '', description: '', image: null });
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create product');
      }
    };
    fileReader.readAsDataURL(formData.image);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const result = await response.json();
      alert(result.message);

      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div style={{ backgroundColor: '#191c24', padding: '20px', borderRadius: '5px' }}>
      <h3 className="text-light">Manage Products</h3>

      {/* Add Product Form */}
      <form style={{ backgroundColor: '#2A3038', padding: '20px', borderRadius: '5px' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            style={{ backgroundColor: '#2A3038', color: '#fff' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label text-light">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
            style={{ backgroundColor: '#2A3038', color: '#fff' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label text-light">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            style={{ backgroundColor: '#2A3038', color: '#fff' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-light">Product Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
            style={{ backgroundColor: '#2A3038', color: '#fff' }}
          />
        </div>
        <button type="button" onClick={handleAddProduct} className="btn btn-primary">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="mt-4">
        <h4 className="text-light">Product List</h4>
        {products.length === 0 ? (
          <p className="text-light">No products available.</p>
        ) : (
          <ul className="list-group">
            {products.map((product) => (
              <li key={product.id} className="list-group-item d-flex align-items-center" style={{ backgroundColor: '#2A3038', color: '#fff' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="me-3"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div>
                  <strong>{product.name}</strong>
                  <p className="mb-0">Price: ${product.price}</p>
                  <p className="mb-0">{product.description}</p>
                </div>
                <button
                  className="btn btn-danger ms-auto"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;