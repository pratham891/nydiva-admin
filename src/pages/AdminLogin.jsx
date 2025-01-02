import React from "react";
import './AdminLogin.css';

const AdminLogin = () => {
  return (
    <div className="admin-login">
      <div className="al-1">

        <div className="admin-login-title">Login</div>

        <div className="admin-login-form">
          <form>
            <label>
              Username or Email <span style={{ color: "#FF3333" }}>*</span>
              <fieldset>
                <input type="text" placeholder="Username" required />
              </fieldset>
            </label>

            <label>
              Password <span style={{ color: "#FF3333" }}>*</span>
              <fieldset>
                <input type="password" placeholder="Password" required />
              </fieldset>
            </label>

            <label className="rem-forgot">
              <div className="remember-me">
                <input type="checkbox"></input>
                <p>Remember Me</p>
              </div>

              <div className="forgot-pwd">Forgot Password</div>
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