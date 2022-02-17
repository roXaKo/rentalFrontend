import React from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "./login";

const NavBar = (props) => {
  const { routes, user } = props;

  const renderNav = (nav) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link to="/" className="navbar-brand mx-3">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav"></div>
          {nav.map((el) => (
            <NavLink
              key={el}
              className={"text-capitalize nav-item nav-link"}
              to={`/${el}`}
            >
              {el}
            </NavLink>
          ))}

          {!user && (
            <div className="dropdown">
              <button className="btn nav-item nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton1">Login</button>
            <Login/>
            </div>
          )}
        </div>
      </nav>
    );
  };

  if (user) {
    const nav = routes.filter((m) => m !== "login" && m !== "register");
    nav.push(user.name, "logout");
    return renderNav(nav);
  }
  const nav = routes;
  return renderNav(nav);
};

export default NavBar;
