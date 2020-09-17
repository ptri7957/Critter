import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile } from "../actions/profile";
import PropTypes from "prop-types";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    bio: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
  });

  const { bio, youtube, facebook, twitter, instagram } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(bio, youtube, facebook, twitter, instagram, history);
  };
  return (
    <div className="container mt-100 mb-100">
      <div className="card shadow">
        <div className="card-body">
          <h2>Create Profile</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Bio: </label>
              <input
                type="text"
                name="bio"
                className="form-control"
                value={bio}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Youtube: </label>
              <input
                type="text"
                name="youtube"
                className="form-control"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Facebook: </label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Twitter: </label>
              <input
                type="text"
                name="twitter"
                className="form-control"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Instagram: </label>
              <input
                type="text"
                name="instagram"
                className="form-control"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
