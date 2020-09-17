import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ isAuthenticated, logout, history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
        <div className="navbar-brand">Critter</div>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/submit"
                >
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/posts"
                >
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="#"
                  onClick={(e) => logout(history)}
                >
                  Logout
                </a>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
