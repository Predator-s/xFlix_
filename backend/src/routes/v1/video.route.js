const express = require("express");
const router = express.Router();

const video = require("../../../model/video.model");
var mongoose = require("mongoose");
const status = require("http-status");

router.get("/", async (req, res) => {
  let genre = req.query.genres;
  let contentRating = req.query.contentRating;
  let sortBy = req.query.sortBy;
  let title = req.query.title;

  if (!!genre && genre.indexOf(",") > -1) {
    var genArray = genre.split(",");
  } else if (!!genre && genre.indexOf(",") == -1) {
    var genArray = [];
    genArray[0] = genre;
  }

  let finder = {};
  if (genre) {
    finder.genre = { $in: genArray };
  }

  if (contentRating) {
      let cRat=decodeURI(contentRating);
    let cntRat = ["Anyone", "7+", "12+", "16+", "18+"];
    if (cRat !== "Anyone") {
        let cIn=cntRat.indexOf(cRat);
        if(cIn>-1){
            let nArry=cntRat.slice(0,cIn+1);
            finder.contentRating={ $in: nArry };
        }else{
            res.status(status.BAD_REQUEST).send(`must be one of [Anyone, 7+, 12+, 16+, 18+, All]`);
        }
        
    }else{
        finder.contentRating=cRat;
    }
  }


  if (title) {
    finder.title = { $regex: title, $options: "i" };
  }

  try {
    if (sortBy === "releaseDate") {
      var videos = await video.find(finder);
      videos.sort((a, b) => {
        let as = new Date(a.releaseDate);
        let bs = new Date(b.releaseDate);
        return bs - as;
      });
    } else {
      var videos = await video.find(finder).sort(sortBy);
    }
  } catch (error) {
    return null;
  }
  res.send({ videos: videos });
});

router.get("/:videoId", async (req, res) => {
  console.log("faisal");
  let videoId = req.params.videoId;
  let isValid = mongoose.Types.ObjectId.isValid(videoId);
  var data = await video.findById(videoId);
  if (isValid) {
    var data = await video.findById(videoId);
  } else {
    res.status(status.BAD_REQUEST).send(`${videoId} must be a valid mongo id`);
  }

  if (data) {
    res.status(status.FOUND).send(data);
  } else {
    res.status(status.NOT_FOUND).send("No video found with matching id");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    var uPvid = req.body;
    uPvid.viewCount = 0;
    uPvid.votes = {
      upVotes: 0,
      downVotes: 0,
    };

    var uPdata = await video.create(uPvid);

    res.status(status.CREATED).send(uPdata);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error);
  }
});

router.patch("/:videoId/votes", async (req, res) => {
  let videoId = req.params.videoId;

  try {
    var vid = await video.findById(videoId);
    if (!vid) {
      res.status(status.NOT_FOUND).send("No video found with matching id");
    }
    if (req.body && req.body.vote) {
      if (req.body.vote === "upVote") {
        vid.votes.upVotes += 1;
      } else {
        vid.votes.downVotes += 1;
      }
      await vid.save();
    }
    res.status(status.NO_CONTENT).send();
  } catch (error) {
    res.send("server Error");
  }
});

router.patch("/:videoId/views", async (req, res) => {
  let videoId = req.params.videoId;
  let isValid = mongoose.Types.ObjectId.isValid(videoId);
  var data = await video.findById(videoId);
  if (isValid) {
    var data = await video.findById(videoId);
    if (!data) {
      res.status(status.NOT_FOUND).send("No video found with matching id");
    }

    data.viewCount += 1;
    await data.save();
    res.status(status.NO_CONTENT).send();
  } else {
    res.status(status.BAD_REQUEST).send(`${videoId} must be a valid mongo id`);
  }
});

module.exports = router;
