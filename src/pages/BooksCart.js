import { useContext } from "react";
import { BooksContext } from "../store/books-context";
import Card from "../components/ui/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

function BooksCart() {
  const booksContext = useContext(BooksContext);

  let content,
    total = 0;

  if (booksContext.cartItemsCount === 0) {
    content = (
      <>
        <h3>You Have No Items In Cart. Try Adding Some</h3>
        <Button
          style={{ margin: "8px" }}
          color="secondary"
          variant="contained"
          component={Link}
          to={"/books"}
        >
          Go to Books
        </Button>
      </>
    );
  } else {
    let books = [];
    for (let key in booksContext.cart) {
      const book = {
        id: key,
        ...booksContext.cart[key],
      };
      total = total + parseInt(book.price);
      books.push(book);
    }
    content = (
      <div>
        {books.map((book) => (
          <Card key={book.id}>
            <h3>Book Title: {book.title}</h3>
            <h5>Book Price: {"$" + book.price}</h5>
            <Box m={1} textAlign={"center"}>
              <Button
                style={{ margin: "8px" }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  booksContext.removeFromCart(book.id);
                }}
              >
                Remove from Cart
              </Button>
            </Box>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <section>
      <h1>My Cart</h1>
      {content}

      {total > 0 && <h2>Your Total is: {"$" + total}</h2>}
      {total > 0 && (
        <Button
          style={{ marginBottom: "8px" }}
          color="primary"
          variant="contained"
        >
          Checkout
        </Button>
      )}
    </section>
  );
}

export default BooksCart;
