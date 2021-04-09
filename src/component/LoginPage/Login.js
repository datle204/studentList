import "./Login.css";
import { useState } from "react";
import { checkLogin } from "../api";
import { useHistory } from "react-router-dom";

export default function Login() {
  localStorage.clear();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  async function login() {
    try {
      const res = await checkLogin(loginEmail, loginPassword);
      if (res.status === 200) {
        history.push("/");
      } else {
        setIsError(true);
      }
    } catch (err) {
      alert("co loi");
    }
  }

  return (
    <div className="container">
      <div className="login-page">
        <h1 className="title">Đăng Nhập</h1>
        {isError && (
          <div
            style={{ color: "red", marginLeft: "50px", paddingBottom: "20px" }}
          >
            Email or Password incorrect
          </div>
        )}
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
        <button type="button" onClick={login}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
