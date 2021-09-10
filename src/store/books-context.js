import { createContext, useState } from "react";

export const BooksContext = createContext({
  books: [],
  updateBooks: () => null,
  cart: [],
  cartItemsCount: 0,
  addToCart: (book) => {},
  updateCart: (bookData) => {},
  removeFromCart: (bookId) => {},
  itemIsInCart: (bookId) => {},
});

function BooksContextProvider(props) {
  const [books, setBooks] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const updateBooks = (book) => {
    setBooks(book);
  };

  function addToCartHandler(book) {
    setCartItems((previousCartItems) => {
      return previousCartItems.concat(book);
    });
  }

  function updateCartHandler(bookData) {
    let index = 0;
    for (let book in cartItems) {
      if (cartItems[book].id === bookData.id) break;
      else index++;
    }
    cartItems.splice(index, 1, bookData);
  }

  function removeFromCartHandler(bookId) {
    setCartItems((previousCartItems) => {
      return previousCartItems.filter((book) => book.id !== bookId);
    });
  }

  function itemIsInCartHandler(bookId) {
    return cartItems.some((book) => book.id === bookId);
  }
  const context = {
    books,
    updateBooks,
    cart: cartItems,
    cartItemsCount: cartItems.length,
    addToCart: addToCartHandler,
    updateCart: updateCartHandler,
    removeFromCart: removeFromCartHandler,
    itemIsInCart: itemIsInCartHandler,
  };

  return (
    <BooksContext.Provider value={context}>
      {props.children}
    </BooksContext.Provider>
  );
}
export default BooksContextProvider;
