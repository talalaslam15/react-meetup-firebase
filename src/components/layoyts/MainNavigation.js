import { Link } from "react-router-dom";

import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <header className={classes.header}>
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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
