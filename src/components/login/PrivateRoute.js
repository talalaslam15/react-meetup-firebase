import React from "react";
import { Redirect, Route } from "react-router-dom";
import Layout from "../layoyts/Layout";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
}
