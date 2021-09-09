import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Box from "@material-ui/core/Box";
import { BooksContext } from "../store/books-context";
import { useContext, useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const booksContext = useContext(BooksContext);

  function deleteBook(book) {
    fetch(
      "https://react-app-2ce1f-default-rtdb.firebaseio.com/books/" +
        book.id +
        ".json",
      {
        method: "DELETE",
      }
    ).then(() => {
      loadBooks();
    });
  }

  function loadBooks() {
    setLoading(true);
    fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/books.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        booksContext.updateBooks(data);
        let books = [];
        for (let key in data) {
          const book = {
            id: key,
            ...data[key],
          };
          books.push(book);
        }
        setBooks(books);
        setLoading(false);
      });
  }
  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        <Button
          style={{ marginRight: "1em" }}
          color="primary"
          variant="contained"
          component={Link}
          to={"/admin/newbook"}
        >
          Add New book
        </Button>
      </div>
      <div>
        {books.map((book) => (
          <Card key={book.id}>
            <div style={{ margin: "1em" }}>
              <Slide easing="ease">
                {book.bookCovers.map(
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
            <h3>Book Title: {book.bookTitle}</h3>
            <h5>Book Price: {"$" + book.bookPrice}</h5>
            <Box m={1} textAlign={"end"}>
              <Button
                style={{ margin: "8px" }}
                color="primary"
                component={Link}
                variant="contained"
                to={"/admin/editbook/" + book.id}
              >
                Update
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  deleteBook(book);
                }}
              >
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Books;
