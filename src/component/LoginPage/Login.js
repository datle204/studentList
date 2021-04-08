import "./Login.css";
import { useState } from "react";
import { checkLogin } from "../api";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();

  return (
    <div className="container">
      <form className="login-page">
        <h1 className="title">Đăng Nhập</h1>
        <div className="input-field">
          <input
            type="email"
            name="Email"
            id="login-email"
            placeholder="Tên đăng nhập / Email"
            onChange={(event) => setLoginEmail(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="Password"
            id="login-password"
            placeholder="Mật khẩu"
            onChange={(event) => setLoginPassword(event.target.value)}
          />
        </div>
        <div className="check-field">
          <input type="checkbox" id="remember-pass" />
          <label htmlFor="remember-pass">Ghi nhớ tài khoản</label>
        </div>
        <button
          type="button"
          onClick={() => checkLogin(loginEmail, loginPassword, history)}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
