import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/post";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

const ComposePost = ({ createPost, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(title, content, history);
  };

  return (
    <div className="container mt-100 mb-100">
      <div className="card shadow">
        <div className="card-body">
          <h2>Create a post</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <CKEditor
                style={{ height: "500px" }}
                editor={ClassicEditor}
                onInit={(editor) => {
                  console.log("Editor Ready");
                }}
                config={editorConfig}
                onChange={(e, editor) =>
                  setFormData({ ...formData, content: editor.getData() })
                }
                data={content}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

ComposePost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(withRouter(ComposePost));
