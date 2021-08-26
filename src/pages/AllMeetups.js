import MeetupList from "../components/meetups/MeetupList";
import Search from "./search";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./All.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function AllMeetupsPage() {
  const [isloading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [data, setdata] = useState([]);
  // let query = useQuery();

  let query = useQuery().get("title");

  function loadData() {
    setIsLoading(true);
    fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setdata(data);

        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const meetups = [];
    for (const key in data) {
      const meetup = {
        id: key,
        ...data[key],
      };
      if (query) {
        if (data[key].title.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          meetups.push(meetup);
        } else if (
          data[key].description.toLowerCase().indexOf(query.toLowerCase()) > -1
        ) {
          meetups.push(meetup);
        } else if (
          data[key].address.toLowerCase().indexOf(query.toLowerCase()) > -1
        ) {
          meetups.push(meetup);
        }
      } else {
        meetups.push(meetup);
      }
    }
    setLoadedMeetups(meetups);
  }, [query, data]);

  return (
    <section>
      <div className={classes.heading}>
        <h1>{query ? "Filtering: " + query : "All Meetups Page"}</h1>
        <Search />
      </div>
      {isloading ? (
        <section>
          <p>Loading...</p>
        </section>
      ) : (
        <MeetupList
          meetups={loadedMeetups}
          onDeleteComplete={() => {
            loadData();
          }}
        />
      )}
    </section>
  );
}

export default AllMeetupsPage;
