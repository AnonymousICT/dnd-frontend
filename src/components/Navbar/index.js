import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userId");
    history.push("/login");
  };

  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-item">
          <Link to="/spells">Spell List</Link>
        </li>
        <li className="navigation-item">
          <Link to="/equipment">Equipment</Link>
        </li>
        <li className="navigation-item">
          <Link to="/characters">Characters</Link>
        </li>
        <li className="navigation-item">
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
