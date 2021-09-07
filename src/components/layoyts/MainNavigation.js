import { Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";

import { useContext, useState } from "react";
import FavoritesContext from "../../store/favorites-context";

import { useAuth } from "../login/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MainNavigation() {
  const classes = useStyles();
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
    <AppBar position="static">
      {error && alert(error)}
      <Toolbar style={{ margin: ".5em" }}>
        <Typography variant="h6" className={classes.title}>
          React meetups
        </Typography>
        <Button
          style={{ marginRight: "1em" }}
          color="inherit"
          component={Link}
          to={"/books"}
        >
          books
        </Button>
        <Button
          style={{ marginRight: "1em" }}
          color="inherit"
          component={Link}
          to={"/"}
        >
          All Meeetups
        </Button>
        <Button
          style={{ marginRight: "1em" }}
          color="inherit"
          component={Link}
          to={"/new"}
        >
          New Meeetup
        </Button>
        <Button
          style={{ marginRight: "1em" }}
          color="inherit"
          component={Link}
          to={"/fav"}
        >
          Favorites
          <Badge
            badgeContent={favoritesCtx.totalFavorites}
            color="secondary"
            style={{ bottom: "10px", left: "8px" }}
          ></Badge>
        </Button>
        <Button onClick={handleLogout} color="inherit">
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
