 import { Component } from "react";
import LandingPage from "./movies/LandingPage";
import RedirectTolandingpage from "./utils/RedirectTolandingpage";

import IndexGenres from "./genres/IndexGenres";
import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";

import IndexActors from "./actors/IndexActors";
import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";

import IndexMovieTheaters from "./movietheaters/IndexMovieTheaters";
import CreateMovieTheater from "./movietheaters/CreateMovieTheater";
import EditMovieTheater from "./movietheaters/EditMovieTheater";


import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";


import FormikFormTest from "./genres/FormikFormTest";

const routes = [
    {path: '/genres' , component: IndexGenres, exact : true },
    {path: '/genres/create' , component: CreateGenre },
    {path: '/genres/edit/:id(\\d+)' , component: EditGenre },

    {path: '/actors' , component: IndexActors, exact : true },
    {path: '/actors/create' , component: CreateActor },
    {path: '/actors/edit/:id(\\d+)' , component: EditActor },

    {path: '/movietheaters' , component: IndexMovieTheaters, exact : true },
    {path: '/movietheaters/create' , component: CreateMovieTheater },
    {path: '/movietheaters/edit/:id(\\d+)' , component: EditMovieTheater },

     {path: '/movies/create' , component: CreateMovie },
    {path: '/movies/edit/:id(\\d+)' , component: EditMovie },
    {path: '/movies/filter' , component: FilterMovies },

    {path: '/' , component: LandingPage, exact : true},

    {path: '/genres/basic' , component: FormikFormTest},// for test 

    {path: '*' , component: RedirectTolandingpage},  // catch all




];

export default routes;