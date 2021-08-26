import { Link } from "react-router-dom";

import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import NewMeetupPage from "../../pages/NewMeetup";
import moment from "moment";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function deleteHandler() {
    var link =
      "https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups/" +
      props.id +
      ".json";
    fetch(link, {
      method: "DELETE",
    }).then(() => {
      if (props.onDeleteComplete) {
        props.onDeleteComplete();
      }
    });
  }

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
        created: props.created,
      });
    }
  }
  function toggleUpdateMeetup() {
    <NewMeetupPage updateMeetup></NewMeetupPage>;
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <h3>{props.date}</h3>
          <p>{props.description}</p>
          <small>{moment(props.created).fromNow()}</small>
        </div>
        <div className={classes.actions}>
          <Link to={"/edit/" + props.id} onClick={toggleUpdateMeetup}>
            Update
          </Link>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </Card>
    </li>
  );
}
export default MeetupItem;
