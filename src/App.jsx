import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ManageProducts from './pages/ManageProducts';
import Orders from './pages/Orders';
import Header from './components/Header';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={
          <>
            <Header />
            <div className='container mt-4'>
              <Home />
            </div>
          </>
        } />
        <Route path="/manage-products" element={
          <>
            <Header />
            <div className='container mt-4'>
              <ManageProducts />
            </div>
          </>
        } />
        <Route path="/orders" element={
          <>
            <Header />
            <div className='container mt-4'>
              <Orders />
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;
