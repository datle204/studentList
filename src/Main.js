import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./component/AppPage/App";
import Login from "./component/LoginPage/Login";
import Profile from "./component/ProfilePage/Profile";
import "./Main.css";

export default function Main() {

  return (
    <Router>
      <div>
        {/* <nav className="navbar">
          <ul className="nav-menu">
            <li>
              <Link to="/">App</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
