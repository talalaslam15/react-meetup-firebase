import { Link, useHistory } from "react-router-dom";

import { useContext, useState } from "react";
import FavoritesContext from "../../store/favorites-context";

import classes from "./MainNavigation.module.css";

import { useAuth } from "../login/AuthContext";

function MainNavigation() {
  const history = useHistory();
  const { logout } = useAuth();
  const favoritesCtx = useContext(FavoritesContext);
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/signin");
    } catch {
      setError("Failed to logout!");
    }
  }

  return (
    <header className={classes.header}>
      {error && alert(error)}
      <div className={classes.logo}>React meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meeetups</Link>
          </li>
          <li>
            <Link to="/new">New Meeetups</Link>
          </li>
          <li>
            <Link to="/fav">
              Favorites
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Log Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
