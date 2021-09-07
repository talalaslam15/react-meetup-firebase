import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Card from "../components/ui/Card";
import { useParams } from "react-router";
import { BooksContext } from "../store/books-context";

function NewBooks() {
  const bookTitleRef = useRef();
  const bookPriceRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const booksContext = useContext(BooksContext);

  useEffect(() => {
    let currentBook;
    if (id) {
      for (let x in booksContext.books) {
        if (x === id) {
          currentBook = booksContext.books[x];
          localStorage.title = currentBook.bookTitle;
          localStorage.price = currentBook.bookPrice;
          break;
        }
      }
      bookTitleRef.current.value = localStorage.title;
      bookPriceRef.current.value = localStorage.price;
    }
  }, [id, booksContext.books]);

  function handleSubmit(e) {
    e.preventDefault();
    const bookData = {
      bookTitle: bookTitleRef.current.value,
      bookPrice: bookPriceRef.current.value,
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
      <form onSubmit={handleSubmit}>
        <div>
          <h1>{id ? "Update Book" : "Add New Book"}</h1>
          <div>
            <label htmlFor="booktitle">Book Title: </label>
            <input type="text" id="booktitle" ref={bookTitleRef} required />
          </div>
          <div>
            <label htmlFor="bookprice">Book Price: </label>
            <input type="text" id="bookprice" ref={bookPriceRef} required />
          </div>
          <div>
            <button>{id ? "Update Book" : "Add Book"}</button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default NewBooks;
