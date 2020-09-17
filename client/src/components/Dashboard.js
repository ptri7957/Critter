import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostSummaryCard from "./PostSummaryCard";
import ProfileCard from "./ProfileCard";
import { getUserPosts } from "../actions/post";
import { getUserProfile } from "../actions/profile";

const Dashboard = ({ getUserPosts, getUserProfile, post, auth, profile }) => {
  useEffect(() => {
    getUserPosts();
    getUserProfile();
  }, [getUserProfile, getUserPosts]);

  return (
    !post.loading &&
    !auth.loading &&
    !profile.loading &&
    auth.user !== null && (
      <Fragment>
        <div className="container mt-100 mb-100">
          <div className="row">
            <div className="col-lg-4 order-lg-2 profile-container">
              {profile.yourProfile !== null ? (
                <ProfileCard profile={profile.yourProfile} auth={auth} />
              ) : (
                <Fragment></Fragment>
              )}
            </div>
            <div className="col-lg-8">
              <h3>Your Posts</h3>

              {auth.user !== null && post.myPosts.length > 0 ? (
                <div className="card shadow">
                  <div className="card-body">
                    {post.myPosts.map((post) => (
                    <PostSummaryCard key={post._id} post={post} auth={auth} />
                    ))}
                  </div>
                </div>
              ) : (
                <p>No post to show.</p>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

Dashboard.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUserPosts, getUserProfile })(
  Dashboard
);
