import { Route, Switch } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import FavoritesPage from "./pages/Favorites";
import NewMeetupPage from "./pages/NewMeetup";
import SignupPage from "./components/login/SignupPage";
import SigninPage from "./components/login/SigninPage";
import { AuthProvider } from "./components/login/AuthContext";
import PrivateRoute from "./components/login/PrivateRoute";
// const router = [
//   { path: "/", component: AllMeetupsPage },
//   { path: "/favorites", component: FavoritesPage },
// ];
function App() {
  return (
    /*    {router.map(function (route) {
     const Component = route.component;
     return (
       <Route path={route.path}>
         <Component />
       </Route>
     );
   })} */
    <AuthProvider>
      <Switch>
        <PrivateRoute path="/" exact component={AllMeetupsPage} />
        <PrivateRoute path="/fav" component={FavoritesPage} />
        <PrivateRoute path="/new" component={NewMeetupPage} />
        <PrivateRoute path="/edit/:id" component={NewMeetupPage} />
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
