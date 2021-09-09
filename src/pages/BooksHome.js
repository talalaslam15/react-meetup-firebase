import Card from "../components/ui/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BooksContext } from "../store/books-context";
import { Badge } from "@material-ui/core";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function BooksHome() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const booksContext = useContext(BooksContext);

  function itemIsInCart(book) {
    return booksContext.itemIsInCart(book.id);
  }
  function toggleCartStatusHandler(book) {
    if (itemIsInCart(book)) {
      booksContext.removeFromCart(book.id);
    } else {
      booksContext.addToCart({
        id: book.id,
        title: book.bookTitle,
        price: book.bookPrice,
        cover: book.bookCovers,
      });
    }
  }
  function loadBooks() {
    setLoading(true);
    fetch("https://react-app-2ce1f-default-rtdb.firebaseio.com/books.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
      <nav style={{ display: "block", textAlign: "center" }}>
        <Button
          style={{ margin: "8px" }}
          color="primary"
          component={Link}
          to={"/bookscart"}
          variant="contained"
        >
          Cart
        </Button>
        <Badge
          badgeContent={booksContext.cartItemsCount}
          color="secondary"
          style={{ bottom: "15px", right: "10px" }}
        ></Badge>
        <Button
          style={{ margin: "8px" }}
          color="primary"
          component={Link}
          to={"/admin/books"}
          variant="contained"
        >
          Admin
        </Button>
      </nav>
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
              // variant="contained"
              onClick={() => {
                toggleCartStatusHandler(book);
              }}
            >
              {itemIsInCart(book) ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default BooksHome;
