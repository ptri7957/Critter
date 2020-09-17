const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

// @Route        GET api/profile
// @Description  Get all profile
// @Access       Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['username']);
    if (!profiles) {
      return res.status(400).json({ msg: "No profiles found" });
    }

    return res.json(profiles);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        POST api/profile
// @Description  Create and Update profile
// @Access       Private
router.post("/", auth, async (req, res) => {
  const { 
    bio, 
    youtube,
    facebook,
    twitter,
    instagram
   } = req.body;

  const profileData = {}

  profileData.user = req.user.id;
  if(bio) profileData.bio = bio;
  
  profileData.social = {}
  if(youtube) profileData.social.youtube = youtube;
  if(facebook) profileData.social.facebook = facebook;
  if(twitter) profileData.social.twitter = twitter;
  if(instagram) profileData.social.instagram = instagram;

  try {
    // If account exists, update else create new.
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileData },
        { new: true }
      );
      return res.json(profile);
    } else {
      profile = new Profile(
        profileData
      );
      profile = await profile.populate('user', ['username']).execPopulate();
      await profile.save();
      return res.json(profile);
    }

    
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        GET api/profile/me
// @Description  Get user profile
// @Access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username']);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    return res.json(profile);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        DELETE api/profile/me
// @Description  Delete user profile
// @Access       Private
router.delete("/me", auth, async (req, res) => {
  try {
    // Attempt to find profile in database
    // Check if profile belongs to logged in user (auth middleware does this)
    // Delete if so. Return error otherwise.

    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    await Profile.findOneAndDelete({ user: req.user.id });
    return res.json({ msg: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        GET api/profile/profiles/{user_id}
// @Description  Get profile by user id
// @Access       Public
router.get("/profiles/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['username']);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.json(profile);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        PUT api/profile/profiles/{user_id}/follow
// @Description  Follow a profile
// @Access       Private
router.put("/profiles/:user_id/follow", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id});
    // Grab auth'd user profile
    const myProfile = await Profile.findOne({ user: req.user.id });

    // Check if profile id exists
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    // Grab my follows list
    // filter through the follows list to check if user id is already in it
    // return error if it is.
    // add to list otherwise

    if (
      myProfile.follows.filter(
        (follow) => follow.user.toString() === profile.user.toString()
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Already liked profile" });
    }

    myProfile.follows.unshift({ user: profile.user });
    await myProfile.save();

    return res.json(myProfile);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @Route        DELETE api/profile/profiles/{profile_id}/follow
// @Description  Delete a profile
// @Access       Private
router.delete("/profiles/:user_id/follow", auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.params.user_id});
      // Grab auth'd user profile
      const myProfile = await Profile.findOne({ user: req.user.id });
  
      // Check if profile id exists
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }
  
      // Grab my follows list
      // filter through the follows list to check if user id in it
      // return error if it is.
      // add to list otherwise
  
      if (
        myProfile.follows.filter(
          (follow) => follow.user.toString() === profile.user.toString()
        ).length === 0
      ) {
        return res.status(400).json({ msg: "User not following profile" });
      }
  
      myProfile.follows = myProfile.follows.filter(follow => follow.user.toString() !== profile.user.toString());
      await myProfile.save();
  
      return res.json(myProfile);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
