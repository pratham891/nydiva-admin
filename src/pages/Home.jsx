import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import productsData from '../data.js';

const Home = () => {
  const [products, setProducts] = useState(productsData);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <div style={{ backgroundColor: 'rgb(0, 0, 0)', padding: '20px', borderRadius: '5px' }}>
      <h3 className="text-light">Product List</h3>
      {products.length === 0 && <p className="text-light">No products available.</p>}
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex align-items-center" style={{ backgroundColor: '#191c24', color: '#fff' }}>
            <img
              src={product.image}
              alt={product.name}
              className="me-3"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
            <span>{product.name}</span>
            <div className="ms-auto">
              <Button variant="primary" onClick={() => handleViewProduct(product)}>
                View Product
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for viewing product details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct ? (
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '100%', height: 'auto', marginBottom: '15px' }}
              />
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
            </div>
          ) : (
            <p>No product selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
