import { Link } from "react-router-dom";
import "./Profile.css";
export default function Profile() {
  return (
    <div className="container">
      <div className="change-page">
        <Link to="/login">
          <button className="change-to-login">Logout</button>
        </Link>
        <Link to="/app">
          <button className="change-to-login">App</button>
        </Link>
      </div>
      <h1>Profile</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  );
}
