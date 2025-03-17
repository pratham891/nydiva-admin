import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  // Debug: Log the selectedOrder's orderID
  // useEffect(() => {
  //   if (selectedOrder) {
  //     console.log("orderId", selectedOrder._id);
  //   }
  // }, [selectedOrder]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const handleStatusChange = async () => {
    try {
      const response = await fetch(`/api/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setOrders(orders.map(order => order._id === updatedOrder._id ? updatedOrder : order));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#191c24', padding: '20px', borderRadius: '5px' }}>
      <h3 className="text-light">Orders</h3>
      {orders.length === 0 ? (
        <p className="text-light">No orders available.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order._id} className="list-group-item d-flex align-items-center" style={{ backgroundColor: '#2A3038', color: '#fff' }}>
              <div>
                <strong>Order ID:</strong> {order.orderId}
                <p className="mb-0"><strong>User Email:</strong> {order.userId.email}</p>
                <p className="mb-0"><strong>Total Price:</strong> ${order.totalPrice}</p>
                <p className="mb-0"><strong>Status:</strong> {order.status}</p>
              </div>
              <Button variant="primary" className="ms-auto" onClick={() => handleViewOrder(order)}>
                View Order
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for viewing and updating order details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>User Email:</strong> {selectedOrder.userId.email}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
              <p><strong>Status:</strong></p>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
              <h5 className="mt-3">Items:</h5>
              <ul>
                {selectedOrder.items.map(item => (
                  <li key={item.productId._id}>
                    <p><strong>Product Name:</strong> {item.productId.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No order selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;