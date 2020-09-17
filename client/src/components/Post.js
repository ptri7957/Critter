import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostById, postComment } from "../actions/post";
import parse from "html-react-parser";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CommentCard from "./CommentCard";

const editorConfig = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
};

const Post = ({
  post: { post },
  auth: { user },
  getPostById,
  postComment,
  match,
}) => {
  useEffect(() => {
    getPostById(match.params.post_id);
  }, [getPostById, match]);

  const [formData, setFormData] = useState({
    text: "",
  });

  const { text } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    postComment(text, match.params.post_id);
    setFormData({
      ...formData,
      text: "",
    });
  };

  return (
    post !== null &&
    user !== null && (
      <Fragment>
        <div className="container mt-100 mb-100">
          <div className="card shadow">
            <div className="card-body">
              <h1>{post.title}</h1>
              {parse(post.content)}
              <h3>Comments</h3>
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    comment={comment}
                    user_id={user._id}
                    post_id={match.params.post_id}
                  />
                ))
              ) : (
                <Fragment>
                  No comments to show. Be the first to comment.
                </Fragment>
              )}
              <form onSubmit={(e) => onSubmit(e)}>
                <CKEditor
                  style={{ height: "500px" }}
                  editor={ClassicEditor}
                  onInit={(editor) => {
                    console.log("Editor Ready");
                  }}
                  config={editorConfig}
                  onChange={(e, editor) =>
                    setFormData({ ...formData, text: editor.getData() })
                  }
                  data={text}
                />
                <br />
                <button type="submit" className="btn btn-primary">
                  Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostById, postComment })(Post);
