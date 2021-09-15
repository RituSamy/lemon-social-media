import React from "react";
import PrivateRoute from "./UI/Routes/PrivateRoute";
import Posts from "./UI/Routes/Posts";
import SignIn from "./UI/Routes/SignIn";
import { Switch, Route } from "react-router-dom";
import "./Stylesheets/App.css";

/* 
The <Provider /> makes the Redux store available to any nested components that have been 
wrapped in the connect() function.
*/

function App() {
  return (
    <div>
      <Switch>
        <PrivateRoute path="/posts">
          <div className="Posts">
            <Posts />
          </div>
        </PrivateRoute>
        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
