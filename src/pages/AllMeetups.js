import MeetupList from "../components/meetups/MeetupList";
import Search from "./search";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import classes from "./All.module.css";
import { MeetupContext } from "../store/update-context";
import BackToTop from "./BackToTop";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function AllMeetupsPage() {
  const MeetupCtx = useContext(MeetupContext);

  const [isloading, setIsLoading] = useState(false);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  let query = useQuery().get("query");

  function loadData() {
    setIsLoading(true);
    fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        MeetupCtx.updateMeetups(data);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const meetups = [];
    for (const key in MeetupCtx.meetups) {
      const meetup = {
        id: key,
        ...MeetupCtx.meetups[key],
      };
      if (query) {
        if (
          MeetupCtx.meetups[key].title
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        ) {
          meetups.push(meetup);
        } else if (
          MeetupCtx.meetups[key].description
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        ) {
          meetups.push(meetup);
        } else if (
          MeetupCtx.meetups[key].address
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        ) {
          meetups.push(meetup);
        }
      } else {
        meetups.push(meetup);
      }
    }
    setLoadedMeetups(meetups);
  }, [query, MeetupCtx.meetups]);

  return (
    <section>
      <div className={classes.heading}>
        <h1>{query ? "Filtering: " + query : "All Meetups Page"}</h1>
        <Search />
      </div>
      <BackToTop />
      {isloading ? (
        <p>Loading...</p>
      ) : (
        <MeetupList meetups={loadedMeetups} onDeleteComplete={loadData} />
      )}
    </section>
  );
}

export default AllMeetupsPage;
