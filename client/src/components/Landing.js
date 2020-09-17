import React, { Fragment } from "react";
import Login from "./Login";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 right-landing order-lg-2">
            <div
              className="mt-100"
              style={{
                width: "70%",
                margin: "150px auto 0 auto",
                fontWeight: "bold",
                lineHeight: "2",
                fontSize: "1.2em",
              }}
            >
              <p>
                <span className="fas fa-search"></span> Follow your interests
              </p>
              <p>
                <span className="fas fa-user-friends"></span> See what people
                are talking about
              </p>
              <p>
                <span className="fas fa-comments"></span> Create posts you care
                about
              </p>
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <Login />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
