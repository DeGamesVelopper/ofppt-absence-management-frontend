import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLocalToken } from "./store/actions/FunHelpers";

//componenets
import Navbar from "./components/navbar";
// import Filiere from './components/filiere';
import FLR from "./components/FLRS"; // TESTING
import Group from "./components/group";
import Home from "./components/Home";
import Login from "./components/login";
import _404 from "./components/_404";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();

  //check if we are login
  useEffect(() => {
    dispatch(getLocalToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app" id="app">
        <Navbar />
        <div className="body">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/filieres" component={FLR} />
            <Route exact path="/groups" component={Group} />
            <Route component={_404} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
