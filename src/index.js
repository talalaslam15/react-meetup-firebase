import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { FavoritesContextProvider } from "./store/favorites-context";
import MeetupContextProvider from "./store/update-context";
import BooksContextProvider from "./store/books-context";

ReactDOM.render(
  <MeetupContextProvider>
    <FavoritesContextProvider>
      <BooksContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BooksContextProvider>
    </FavoritesContextProvider>
  </MeetupContextProvider>,
  document.getElementById("root")
);
