import { Route, Switch } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import FavoritesPage from "./pages/Favorites";
import NewMeetupPage from "./pages/NewMeetup";
import Layout from "./components/layoyts/Layout";
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
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/fav">
          <FavoritesPage />
        </Route>
        <Route path="/new">
          <NewMeetupPage />
        </Route>
        <Route path="/edit/:id">
          <NewMeetupPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
