import "./Login.css";
import { useState } from "react";
import { checkLogin } from "../api";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateName, updateAvatar} from "../../features/userSlice";

export default function Login() {
  localStorage.removeItem("token");

  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  async function login() {
    try {
      const res = await checkLogin(loginEmail, loginPassword);
      if (res.status === 200) {
        history.push("/");
        let username= res.data.name;
        let avatar = res.data.avatar;
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        // return username;
        dispatch(updateName(localStorage.getItem("username")));
        dispatch(updateAvatar(localStorage.getItem("avatar")));


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
