const VideoModel = require("../models/VideoModel");

module.exports = {
  postVideo: async (req, res) => {
    const { title, description } = req.body;
    console.log("This is title, description:", title, description);

    let imageFilename = null;
    let imagePath = null;

    try {
      const file = req.files;
      console.log("this is file:", file);

      const filename = req.files.video[0].filename;
      console.log("This is filename:", filename);

      const videoPath = req.files.video[0].path;
      console.log("This is videoPath:", videoPath);

      if (req.files.image) {
        imageFilename = req.files.image[0].filename;
        imagePath = req.files.image[0].path;
      }

      console.log("This is image filename:", imageFilename);
      console.log("This is image path:", imagePath);

      const video = new VideoModel({
        title: title,
        description: description,
        filename: filename,
        videoUrl: videoPath,
      });
      console.log("This is video:", video);
      await video.save();
      res.status(200).json({
        message: "Video saved successfully!",
        "This is your video:": video,
      });
    } catch (error) {
      res.status(400).json({ message: "Video upload failed", error });
      console.log(error);
    }
  },

  getAllVideos: async (req, res) => {
    try {
      const videos = await VideoModel.find();

      res.status(200).json({ message: "These are your videos:", videos });
    } catch (error) {
      res.status(400).json({ message: "Error getting videos:", error });
    }
  },
};
