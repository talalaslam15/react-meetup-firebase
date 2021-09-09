import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Card from "../components/ui/Card";
import { useParams } from "react-router";
import { BooksContext } from "../store/books-context";
// import { FiCamera } from "react-icons/fi";
import { storage } from "../firebase/firebase";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import LinearProgressWithLabel from "../components/ui/progress";
// import classes from "./All.module.css";

function NewBooks() {
  const bookTitleRef = useRef();
  const bookPriceRef = useRef();
  const bookCoverRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const booksContext = useContext(BooksContext);
  const [urls, seturls] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const empty = () => {
    return urls.length === 0;
  };

  useEffect(() => {
    let currentBook;
    if (id) {
      for (let x in booksContext.books) {
        if (x === id) {
          currentBook = booksContext.books[x];
          localStorage.title = currentBook.bookTitle;
          localStorage.price = currentBook.bookPrice;
          // seturls(currentBook.bookCovers);
          localStorage.cover = JSON.stringify(currentBook.bookCovers);
          break;
        }
      }
      bookTitleRef.current.value = localStorage.title;
      bookPriceRef.current.value = localStorage.price;
      seturls(JSON.parse(localStorage.cover));
    }
  }, [id, booksContext.books]);

  function uploadImage(e) {
    if (e.target.files) {
      let images = e.target.files;
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        setIsLoading(true);
        const image = images[i];
        const uploadTask = storage.ref(`bookcovers/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await storage
              .ref("bookcovers")
              .child(image.name)
              .getDownloadURL()
              .then((urls) => {
                seturls((prevState) => [...prevState, urls]);
                setIsLoading(false);
              });
          }
        );
      }
      Promise.all(promises)
        .then(() => {})
        .catch((err) => alert(err));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const bookData = {
      bookTitle: bookTitleRef.current.value,
      bookPrice: bookPriceRef.current.value,
      bookCovers: urls,
    };
    if (id) {
      fetch(
        "https://react-app-2ce1f-default-rtdb.firebaseio.com/books/" +
          id +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify(bookData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() => {
        history.replace("/admin/books");
      });
    } else {
      fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/books.json", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        history.replace("/admin/books");
      });
    }
  }
  return (
    <Card>
      <div>
        <h1>{id ? "Update Book" : "Add New Book"}</h1>
        {isloading && <LinearProgressWithLabel value={progress} />}

        {!empty() && (
          <div>
            <Slide easing="ease">
              {urls.map(
                (url, i) =>
                  url && (
                    <div
                      key={i}
                      style={{ display: "block", textAlign: "center" }}
                    >
                      <img
                        src={url || ""}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                        alt={url}
                      />
                    </div>
                  )
              )}
            </Slide>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="booktitle">Book Title: </label>
            <input type="text" id="booktitle" ref={bookTitleRef} required />
          </div>
          <div>
            <label htmlFor="bookprice">Book Price: </label>
            <input type="text" id="bookprice" ref={bookPriceRef} required />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <label
              htmlFor="bookcover"
              style={{ position: "relative", pointerEvents: "none" }}
            >
              Book Cover:
              {/* <FiCamera className={classes.camera} /> */}
            </label>
            <input
              type="file"
              id="bookcover"
              ref={bookCoverRef}
              onChange={uploadImage}
              required={!id}
              multiple
            />
          </div>
          <div>
            <button disabled={isloading}>
              {id ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default NewBooks;
