import React, {useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import {Context} from '../../context/Context'

export default function Navbar() {
  const {setAllCharacters, userData, setUserData}= useContext(Context)
  const history = useHistory();

  const loggedIn = (userData.user || {auth: null}).auth;

  const logout = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userId");
    setUserData({});
    history.push("/login");
    setAllCharacters([]);
  };

  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-item">
          <Link to="/spells">Spells</Link>
        </li>
        <li className="navigation-item">
          <Link to="/equipment">Equipment</Link>
        </li>
        {loggedIn ?
          <>
          <li className="navigation-item">
            <Link to="/characters">Characters</Link>
          </li>
          <li className="navigation-item">
            <Link to="/user">User</Link>
          </li>
          <li className="navigation-item">
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </li> </> : <Link to="/login" onClick={logout}>
              Login
            </Link>
        }
      </ul>
    </nav>
  );
}
