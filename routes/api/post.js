const express = require("express");
const auth = require("../../middleware/auth");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const sanitizeHtml = require('sanitize-html');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

// @Route        GET api/post
// @Description  Get post
// @Access       Public
router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    if (!post) {
      return res.status(400).json({ msg: "No posts found" });
    }
    return res.json(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        GET api/post/posts/:post_id
// @Description  Get a post with the specified post_id
// @Access       Public
router.get("/posts/:post_id", async (req, res) => {
  
  try {
    let post = await Post.findById(req.params.post_id).populate('user', ['username']);
    if (!post) {
      return res.status(400).json({ msg: "Post by that id not found" });
    }

    return res.json(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        GET api/post/me/posts
// @Description  Get logged-in user's posts
// @Access       Public
router.get("/me/posts", auth, async (req, res) => {
  try {
    const post = await Post.find({user: req.user.id});
    if (!post) {
      return res.status(400).json({ msg: "No posts found" });
    }
    return res.json(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        POST api/post
// @Description  Create a post
// @Access       Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("content", " Post body is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, content } = req.body;

    try {
      const newPost = new Post({
        user: req.user.id,
        author: req.user.username,
        title: title,
        content: sanitizeHtml(content, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2'])
        }),
      });

      newPost.populate('user', ['username'])

      await newPost.save();

      return res.json(newPost);
    } catch (error) {
      res.status(500).send("SERVER ERROR");
    }
  }
);

// @Route        PUT api/post/posts/:post_id
// @Description  Edit a post with the specified post_id
// @Access       Private
router.put("/posts/:post_id", auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    let post = await Post.findById(req.params.post_id).populate('user', ['username']);
    if (!post) {
      return res.status(400).json({ msg: "Post by that id not found" });
    }

    // check if logged in user wrote the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Only author of post can edit" });
    }

    post = await Post.findByIdAndUpdate(
      req.params.post_id,
      { $set: { title, content } },
      { new: true }
    );

    return res.json(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        DELETE api/post/posts/:post_id
// @Description  Delete a post with the specified post_id
// @Access       Private
router.delete("/posts/:post_id", auth, async (req, res) => {
  
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post by that id not found" });
    }

    // check if logged in user wrote the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Only author of post can edit" });
    }

    await Post.findByIdAndDelete(req.params.post_id);
    return res.json({ msg: "Post was deleted successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        PUT api/post/posts/:post_id/likes
// @Description  Like a post
// @Access       Private
router.put("/posts/:post_id/likes", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post does not exist" });
    }

    const checkLikes = post.likes.filter((like) => {
      return like.user.toString() === req.user.id;
    });

    if (checkLikes.length > 0) {
      return res.status(400).json({ msg: "A user can only like a post once" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        DELETE api/post/posts/:post_id/likes
// @Description  Remove a like from post
// @Access       Private
router.delete("/posts/:post_id/likes", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post does not exist" });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const updateLikes = post.likes.filter((like) => {
        return like.user.toString() !== req.user.id;
      });

      post.likes = updateLikes;
      await post.save();
      return res.json(post);
    }else{
      return res.status(400).json({msg: 'User has not liked the post'});
    }

    
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        PUT api/post/posts/:post_id/comments
// @Description  Delete a post with the specified post_id
// @Access       Private
router.put(
  "/posts/:post_id/comments",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
      let post = await Post.findById(req.params.post_id).populate('user', ['username']);
      if (!post) {
        return res.status(400).json({ msg: "Post does not exist" });
      }

      const comment = {
        user: req.user.id,
        username: req.user.username,
        text: text,
      };

      post.comments.push(comment);
      await post.save();

      return res.json(post);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @Route        DELETE api/post/posts/:post_id/comments/:comment_id
// @Description  Remove a comment from post
// @Access       Private
router.delete("/posts/:post_id/comments/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id).populate('user', ['username']);

    const comment = post.comments.find(comment => {
      return comment.id === req.params.comment_id
    });

    if(!comment){
      return res.status(400).json({ msg: "Comment does not exist" });
    }else{
      console.log('comment exists');
    }

    if(comment.user.toString() !== req.user.id){
      return res.status(400).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(comment => {
      return comment.id !== req.params.comment_id
    });

    await post.save();
    return res.json(post);

  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        GET api/post/posts/user/:user_id
// @Description  Get a post from user
// @Access       Public
router.get('/posts/user/:user_id', async (req, res) => {
  try {
    const posts = await Post.find({user: req.params.user_id});
    if(!posts){
      return res.status(400).json({ msg: 'Profile does not have any posts to display' });
    }
    return res.json(posts);
  } catch (error) {
    res.status(500).send('Server Error');
  }
})
module.exports = router;
