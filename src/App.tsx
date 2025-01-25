import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IndividualMovie from "./movies/IndividualMovie";
import { landingPageDTO, movieDTO } from "./movies/movies.models";
import MoviesList from "./movies/MoviesList";
import Button from "./utils/Button";
import Menu from "./Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexGenres from "./genres/IndexGenres";
import LandingPage from "./movies/LandingPage";
import routes from "./route-config";
import configureValidations from "./Validations";

configureValidations();

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        {/* <Button>Whatever Text</Button> */}
        {/* <IndividualMovie {...testMovie} /> */}
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          ))}
        </Switch>
        <footer className="bd-footer py-5 mt-5 bg-loight">
          <div className="container">
            &copy; - React Movies {new Date().getFullYear().toString()} - Made
            With Love ❤
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
