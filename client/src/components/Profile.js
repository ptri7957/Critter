import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPostByUserId } from "../actions/post";
import { getUserById } from "../actions/profile";
import { connect } from "react-redux";
import ProfileCard from "./ProfileCard";
import PostSummaryCard from "./PostSummaryCard";

const Profile = ({
  post,
  profile,
  auth,
  getPostByUserId,
  getUserById,
  match,
}) => {
  useEffect(() => {
    getUserById(match.params.user_id);
    getPostByUserId(match.params.user_id);
  }, [getPostByUserId, getUserById, match]);
  return (
    !profile.loading &&
    !post.loading &&
    profile.profile !== null &&
    auth !== null && (
      <div className="container mt-100 mb-100">
        <div className="row">
          <div className="col-lg-4 order-lg-2 profile-container">
            <ProfileCard profile={profile.profile} auth={auth} />
          </div>
          <div className="col-lg-8">
            <h3>Posts</h3>
            <div className="card shadow">
              <div className="card-body">
                {auth.user !== null &&
                  post.userPosts.length > 0 &&
                  post.userPosts.map((post) => (
                    <PostSummaryCard key={post._id} post={post} auth={auth} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

Profile.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPostByUserId: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostByUserId, getUserById })(
  Profile
);
