import Card from "../ui/Card";
import { useParams } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import classes from "./NewMeetupForm.module.css";
import { useHistory } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import { storage } from "../../firebase/firebase";
import moment from "moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { MeetupContext } from "../../store/update-context";

function NewMeetupForm(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const history = useHistory();
  const { id } = useParams();
  const [url, seturl] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const MeetupCtx = useContext(MeetupContext);
  useEffect(() => {
    if (id) {
      let x, currentMeetup;
      for (x in MeetupCtx.meetups) {
        if (x === id) {
          currentMeetup = MeetupCtx.meetups[x];
          break;
        }
      }
      titleInputRef.current.value = currentMeetup.title;
      imageInputRef.current.value = currentMeetup.image;
      seturl(currentMeetup.image);
      addressInputRef.current.value = currentMeetup.address;
      handleDateChange(currentMeetup.date);
      descriptionInputRef.current.value = currentMeetup.description;
    }
  }, [id, MeetupCtx.meetups]);

  function submitHandler(event) {
    event.preventDefault();

    const meetupData = {
      title: titleInputRef.current.value,
      image: imageInputRef.current.value,
      address: addressInputRef.current.value,
      date: selectedDate,
      description: descriptionInputRef.current.value,
    };

    if (id) {
      fetch(
        "https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups/" +
          id +
          ".json",
        {
          method: "PATCH",
          body: JSON.stringify(meetupData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() => {
        history.replace("/");
      });
    } else {
      props.onAddMeetup(meetupData);
    }
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setIsLoading(true);

      const image = e.target.files[0];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              imageInputRef.current.value = url;
              seturl(url);
              setIsLoading(false);
            });
        }
      );
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        {isloading && (
          <img
            style={{ width: "10%" }}
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            alt="gif"
          ></img>
        )}
        {url && (
          <img
            src={url || ""}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
            alt={url}
          />
        )}

        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" id="title" required ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <div style={{ position: "relative" }}>
            <input
              style={{ width: "92%" }}
              type="text"
              id="image"
              readOnly
              ref={imageInputRef}
            />
            <div className={classes.inputFile}>
              <label
                for="imageUpload"
                style={{ position: "absolute", right: "-20px", top: 0 }}
              >
                <FiCamera className={classes.camera} />
              </label>
              <input
                type="file"
                id="imageUpload"
                onChange={handleChange}
                className={classes.inputFile}
              />
            </div>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Meetup Address</label>
          <input type="text" id="address" required ref={addressInputRef} />
        </div>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <DateTimePicker
            fullWidth
            format="dddd, MMMM Do YYYY [@] h:mm a"
            label="DateTimePicker"
            inputVariant="outlined"
            value={selectedDate}
            onChange={handleDateChange}
            id="time"
            name="time"
          />
        </MuiPickersUtilsProvider>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            rows="5"
            id="description"
            required
            ref={descriptionInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{id ? "Update" : "Add Meetup"}</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
