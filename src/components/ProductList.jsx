import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ProductList = ({ products, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
  const [showModal, setShowModal] = useState(false); // Toggle modal visibility

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
          <li key={product.id} className="list-group-item" style={{ backgroundColor: '#191c24', color: '#fff' }}>
            <span>{product.name}</span>
            <div>
              <Button variant="primary" onClick={() => handleViewProduct(product)}>
                View Product
              </Button>
              <Button variant="danger" onClick={() => onDelete(product.id)} className="ms-2">
                Delete
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
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              {/* <p><strong>Category:</strong> {selectedProduct.category}</p> */}
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

export default ProductList;
