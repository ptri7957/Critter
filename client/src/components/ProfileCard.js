import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile: { user, bio }, auth }) => {
  return (
    <div className="card shadow">
      <div className="card-body profile-card">
        <div className="profile-header"></div>

        <div className="profile-content">
          {/* <div className="profile-pic">{user.username[0].toUpperCase()}</div>
          <h3>{user.username}</h3> */}
          {user !== null && auth.user !== null && (
            <Fragment>
              <div className="profile-pic">
                {user.username[0].toUpperCase()}
              </div>
              <h3>{user.username}</h3>
              <p>{bio}</p>
              {auth.user._id === user._id && (
                <Link to="/submit">
                  <button className="btn btn-primary">Create Post</button>
                </Link>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default ProfileCard;
