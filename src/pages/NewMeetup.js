import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import moment from "moment";

function NewMeetupPage() {
  const history = useHistory();
  const { id } = useParams();

  function addMeetupHandler(meetupData) {
    fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups.json", {
      method: "POST",
      body: JSON.stringify({ ...meetupData, created: moment() }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.replace("/");
    });
  }

  return (
    <section>
      <h1> {id ? "Update Meetup" : "Add New Meetup"}</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
