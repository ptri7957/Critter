import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import setAuthToken from "./utils/setAuthToken";

// Set up store
import { Provider } from "react-redux";
import store from "./store";

// Load components
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ComposePost from "./components/ComposePost";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/PrivateRoute";
import Posts from "./components/Posts";
import CreateProfile from "./components/CreateProfile";
import Post from "./components/Post";
import Profile from "./components/Profile";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path="/createProfile" component={CreateProfile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/submit" component={ComposePost}/>
          <PrivateRoute exact path="/posts" component={Posts}/>
          <PrivateRoute exact path="/post/:post_id" component={Post}/>
          <PrivateRoute exact path="/:user_id" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
