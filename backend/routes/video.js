const { videoUpload } = require("../middlewares/videoUpload");
const videoController = require("../controllers/video");

const router = require("express").Router();

router.get("/videos", videoController.getAllVideos);

// router.post("/upload", videoUpload.single("image"), (req, res) => {
router.post(
  "/upload",
  videoUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  videoController.postVideo
);

module.exports = router;
