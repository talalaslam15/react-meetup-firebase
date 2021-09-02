import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "1em 0",
    textAlign: "center",
  },
  media: {
    height: 250,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    padding: "0 0 1.5em 0",
  },
});

function MeetupItem(props) {
  const classes = useStyles();
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        date: props.date,
        description: props.description,
        image: props.image,
        address: props.address,
        created: props.created,
      });
    }
  }
  function deleteHandler() {
    fetch(
      "https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups/" +
        props.id +
        ".json",
      {
        method: "DELETE",
      }
    ).then(() => {
      if (props.onDeleteComplete) {
        props.onDeleteComplete();
      }
    });
  }
  function favPage() {
    return window.location.href.includes("fav");
  }
  return (
    <li className={classes.item}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={props.image} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom color="textPrimary" variant="h4">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="h5" color="textSecondary">
            {moment(props.date).format("dddd, MMMM Do YYYY [@] h:mm a")}
          </Typography>
          <Typography gutterBottom variant="h5" color="textSecondary">
            {props.address}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.description}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {moment(props.created).fromNow()}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          {!favPage() && (
            <Button
              size="medium"
              color="primary"
              variant="contained"
              component={Link}
              to={"/edit/" + props.id}
            >
              Update
            </Button>
          )}

          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={toggleFavoriteStatusHandler}
          >
            {itemIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          {!favPage() && (
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={deleteHandler}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </li>
  );
}
export default MeetupItem;
