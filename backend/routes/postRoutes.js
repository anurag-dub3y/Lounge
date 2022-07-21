const express = require('express');
const router = express.Router();
const { createPost, getOnePost, getPostByGenre, getallPosts, deletePost, updatePost } = require("../controller/postControls");
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,callback){    // will determine which directory the files will store, here they will be stored in 'upload' folder
        callback(null,'upload/')
        console.log("File is uploading");
    },
    filename : function(req,file,callback){
        callback(null, Date.now() + '.png')
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter: fileFilter,
})

router.route("/new/post").post(createPost, upload.single("image"));
router.route("/home").get(getallPosts);
router.route("/post/:id").get(getOnePost);
router.route("/delete/post/:id").delete(deletePost);
router.route("/update/post/:id").put(updatePost);
router.route("/:genre").get(getPostByGenre);

module.exports = router;
