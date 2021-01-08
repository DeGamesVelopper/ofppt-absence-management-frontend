import { useEffect, useState } from "react";
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
  const islogin = useSelector(state => state.auth.islogin);

  useEffect(() => {
    const getToken = async () => {
      await dispatch(await getLocalToken());
    };
    getToken();
  }, []);

  return (
    <div className="app" id="app">
      <BrowserRouter>
        <Navbar />
        {!islogin ? (
          <Redirect to="/login" />
        ) : (
          <div className="body">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/filieres" component={FLR} />
              <Route exact path="/groups" component={Group} />
              <Route component={_404} />
            </Switch>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}
