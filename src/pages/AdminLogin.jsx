import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin-token', data.token);
        alert('Login successful');
        navigate('/');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="admin-login">
      <div className="al-1">
        <div className="admin-login-title">Login</div>
        <div className="admin-login-form">
          <form onSubmit={handleLogin}>
            <label>
              Admin ID <span style={{ color: "#FF3333" }}>*</span>
              <fieldset>
                <input
                  type="text"
                  placeholder="admin id"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  required
                />
              </fieldset>
            </label>
            <label>
              Password <span style={{ color: "#FF3333" }}>*</span>
              <fieldset>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </fieldset>
            </label>
            <label>
              <button className="admin-login-btn" type="submit">Login</button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;