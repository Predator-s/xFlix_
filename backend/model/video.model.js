const mongoose = require('mongoose');
const video = new mongoose.Schema({
  // _id: {
  //   type: String,
  // },
  votes: {
    upVotes: { type: Number, required: true, },
    downVotes: { type: Number, required: true, },
  },

  previewImage: {
    type: String,

    required: true,
  },

  viewCount: {
    type: Number,

    required: true,
  },

  videoLink: {
    type: String,

    required: true,
  },

  title: {
      type:String,
      required:true,
  },

  genre: {
      type:String,
      required: true,
  },

  contentRating:{
      type: String,
      required: true,
  },

  releaseDate:{
      type:String,
      required: true,
  }
});



module.exports = mongoose.model("Video", video);