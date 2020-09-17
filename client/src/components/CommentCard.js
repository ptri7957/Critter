import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { deleteComment } from "../actions/post";
import { Link } from "react-router-dom";

const CommentCard = ({
  comment: { _id, user, username, text },
  user_id,
  post_id,
  deleteComment,
}) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div
              className="col-lg-2 col-md-2 col-sm-2 col-xs-2"
              style={{ textAlign: "center" }}
            >
              <div className="profile-pic profile-pic-mini">
                {username[0].toUpperCase()}
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <div className="comment">
                <div className="username">
                  <Link
                    to={`/${user}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {username}
                  </Link>
                </div>
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    {parse(text)}
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    {user.toString() === user_id.toString() && (
                      <button
                        className="btn btn-light trash"
                        style={{ float: "right" }}
                        onClick={(e) => deleteComment(post_id, _id)}
                      >
                        <span className="fas fa-trash"></span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  user_id: PropTypes.string.isRequired,
  post_id: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(null, { deleteComment })(CommentCard);
