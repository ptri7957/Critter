import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Fragment>
        <div className="container mt-100">
          <div className="card shadow form">
            <div className="card-body">
              <h2>Login</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label>Email: </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <button className="btn btn-primary mb-5" type="submit">
                  Log In
                </button>
              </form>
              <p>
                {" "}
                <Link to="/register">Register</Link> if you don't have an
                account
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
