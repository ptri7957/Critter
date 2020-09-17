import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getAllPosts } from "../actions/post";
import { connect } from "react-redux";
import PostSummaryCard from "./PostSummaryCard";

const Posts = ({ getAllPosts, post, auth }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    !post.loading &&
    !auth.loading ? (
      <Fragment>
        <div className="container mt-100 mb-100">
          <div className="card shadow post-container">
            <div className="card-body">
              {post.posts.length > 0 &&
                auth.user !== null &&
                post.posts.map((post) => (
                  <PostSummaryCard key={post._id} post={post} auth={auth} />
                ))}
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
        <Fragment></Fragment>
    )
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
