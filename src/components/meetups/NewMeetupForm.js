import Card from "../ui/Card";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import classes from "./NewMeetupForm.module.css";
import { useHistory } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import { storage } from "../../firebase/firebase";
import moment from "moment";

function NewMeetupForm(props) {
  const history = useHistory();
  const { id } = useParams();
  const [url, seturl] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const dateInputRef = useRef();
  const descriptionInputRef = useRef();

  useEffect(() => {
    if (id) {
      let x;
      let currentMeetup;
      fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/meetups.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (x in data) {
            if (x === id) {
              currentMeetup = data[x];
              break;
            }
          }
          titleInputRef.current.value = currentMeetup.title;
          imageInputRef.current.value = currentMeetup.image;
          seturl(currentMeetup.image);
          addressInputRef.current.value = currentMeetup.address;
          dateInputRef.current.value = currentMeetup.date;
          descriptionInputRef.current.value = currentMeetup.description;
        });
    }
  }, [id]);
  function submitHandler(event) {
    event.preventDefault();

    let date = moment(dateInputRef.current.value).format(
      "dddd, MMMM Do YYYY [@] h:mm:ss"
    );
    const meetupData = {
      title: titleInputRef.current.value,
      image: imageInputRef.current.value,
      address: addressInputRef.current.value,
      date: date,
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
      const enteredTitle = titleInputRef.current.value;
      const enteredImage = imageInputRef.current.value;
      const enteredAddress = addressInputRef.current.value;
      const enteredDate = moment(dateInputRef).format(
        "dddd, MMMM Do YYYY [@] h:mm:ss"
      );
      const enteredDescription = descriptionInputRef.current.value;

      const meetupData = {
        title: enteredTitle,
        image: enteredImage,
        address: enteredAddress,
        date: enteredDate,
        description: enteredDescription,
      };
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
        <div className={classes.control}>
          <label for="time">Date and Time : </label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            ref={dateInputRef}
          />
        </div>
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
