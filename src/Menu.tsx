import { Link, NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          React Movies
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/genres">
                Genres
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/movies/filter">
                Filter Movies
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/actors">
                Actors
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/movietheaters">
                Movie Theaters
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/movies/create">
                Create a movie
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
