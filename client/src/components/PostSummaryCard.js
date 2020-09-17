import React, { Fragment } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { deletePost, likePost, dislikePost } from "../actions/post";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PostSummaryCard = ({ post, auth, deletePost, likePost, dislikePost }) => {
  return (
    !post.loading &&
    !auth.loading ? (
      <div className="post-summary-card">
        <h2>{post.title}</h2>
        {post.content.length >= 128
          ? parse(`${post.content.substring(0, 128)}...`)
          : parse(post.content)}
        <br />
        <p>Written by: {` ${post.author}`}</p>
        <div className="post-buttons">
          {post.likes.filter((like) => {
            return like.user.toString() === auth.user._id.toString();
          }).length === 0 ? (
            <button
              className="btn btn-light post-btns"
              onClick={(e) => likePost(post._id)}
            >
              <span className="fas fa-thumbs-up"></span>
              <span className="num-likes">{post.likes.length}</span>
            </button>
          ) : (
            <button
              className="btn btn-light post-btns"
              onClick={(e) => dislikePost(post._id)}
            >
              <span className="fas fa-thumbs-up dislike"></span>
              <span className="num-likes">{post.likes.length}</span>
            </button>
          )}

          <div className="user-btns">
            <Link to={`/post/${post._id}`}>
              <button className="btn btn-light" style={{ marginRight: "10px" }}>
                <strong>Read More</strong>
              </button>
            </Link>

            {auth.user._id.toString() === post.user.toString() ? (
              <button
                className="btn btn-light post-btns"
                onClick={(e) => deletePost(post._id)}
              >
                <span className="fas fa-trash"></span>
              </button>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </div>
      </div>
    ) : (
        <Fragment></Fragment>
    )
  );
};

PostSummaryCard.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost, likePost, dislikePost })(
  PostSummaryCard
);
