import { Route, Switch } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import FavoritesPage from "./pages/Favorites";
import NewMeetupPage from "./pages/NewMeetup";
import SignupPage from "./components/login/SignupPage";
import SigninPage from "./components/login/SigninPage";
import { AuthProvider } from "./components/login/AuthContext";
import PrivateRoute from "./components/login/PrivateRoute";
import Books from "./pages/Books";
import NewBooks from "./pages/NewBooks";
import BooksCart from "./pages/BooksCart";
import BooksHome from "./pages/BooksHome";
import Layout from "./components/layoyts/Layout";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <PrivateRoute path="/" exact component={AllMeetupsPage} />
        <PrivateRoute path="/edit/:id" component={NewMeetupPage} />
        <PrivateRoute path="/new" component={NewMeetupPage} />
        <PrivateRoute path="/fav" component={FavoritesPage} />
        <PrivateRoute path="/admin/books" component={Books} />
        <PrivateRoute path="/admin/newbook" component={NewBooks} />
        <PrivateRoute path="/admin/editbook/:id" component={NewBooks} />
        <Route path="/books">
          <Layout>
            <BooksHome />
          </Layout>
        </Route>
        <Route path="/bookscart">
          <Layout>
            <BooksCart />
          </Layout>
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/signin">
          <SigninPage />
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
