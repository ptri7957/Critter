import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { register } from "../actions/auth";

const Register = ({ register, history }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(username, email, password, history);
  };

  return (
    <Fragment>
      <div className="container mt-100">
        <div className="card">
          <div className="card-body">
            <h2>Register</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => onChange(e)}
                />
              </div>
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
                Register
              </button>
            </form>
            <p>
              {" "}
              <Link to="/login">Sign in</Link> if you have an account
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(withRouter(Register));
