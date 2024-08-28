import React from 'react';
import { Link } from 'react-router-dom';
export default function IndexMovieTheaters() {
   return (
    <>
      <h3>Movies Theaters</h3>
      <Link className="btn btn-primary" to="/movietheaters/create">Create Movie Theaters</Link>
    </>
  );
}
