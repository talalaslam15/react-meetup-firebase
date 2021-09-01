import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { FavoritesContextProvider } from "./store/favorites-context";
import MeetupContextProvider from "./store/update-context";

ReactDOM.render(
  <MeetupContextProvider>
    <FavoritesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesContextProvider>
  </MeetupContextProvider>,
  document.getElementById("root")
);
