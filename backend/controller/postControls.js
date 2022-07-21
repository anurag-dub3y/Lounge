const mongoose = require('mongoose');
const Post = require('../model/postsModel')
const User = require('../model/userModel')
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// create post
exports.createPost = async (req, res) => {

    const img = (req.file) ? req.file.filename : null
    // console.log(req.file);

    let existingUser;
    try {
        existingUser = await User.findById(req.body.author)
        console.log(existingUser);
    } catch (error) {
        console.log(error.message);
    }

    if (!existingUser) {
        res.json({ message: "You are not an existing User, please sign in"})
    }

    const post = new Post({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        img: img,
        genre: req.body.genre
    })

    // Transactions let you execute multiple operations in isolation and potentially undo all the operations if one of them fails. 

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        const newpost = await post.save({ session })
        existingUser.blogs.push(post)
        await existingUser.save({ session })
        await session.commitTransaction()
        res.send(newpost)
    } catch (error) {
        res.send("Post could not be created, please try again or contact the admin.")
    }

}


// Read All the Post
exports.getallPosts = async (req, res) => {
    try {
        const blogs = await Post.find({}).populate('author')
        res.send(blogs)
    } catch (error) {
        res.json({ message: "No blogs found" })
    }
}

// Read particular Post
exports.getOnePost = async (req, res) => {
    try {
        const id = req.params['id']
        console.log(id);
        const blog = await Post.findById(id).populate('author')
        let filename = blog.img
        let address = path.join(__dirname, '../', 'upload', filename)
        console.log(address);
        res.send({ blog, address })
    } catch (error) {
        console.log(error.message)
    }
}

// delete the post
exports.deletePost = async (req, res) => {
    const id = req.params['id']
    let existingPost;
    let author;
    try {
        existingPost = await Post.findByIdAndRemove(id)
        author = existingPost.author;
        let filename = existingPost.img
        let address = path.join(__dirname, '../', 'upload', filename)
        console.log(address);
        fs.unlink(address, (err) => {
            console.log(err);
        })
        let exist = await User.findByIdAndUpdate({ _id: author }, {
            $pull: {
                blogs: id
            }
        })
        res.send("Post successfully deleted")
    } catch (error) {
        console.log(error.message);
    }

}


// Update the Post
exports.updatePost = async (req, res, next) => {
    const id = req.params['id']
    console.log(id);
    console.log(req.body.title);
    try {
        const post = await Post.findById(id);
        post.title = req.body.title;
        post.content = req.body.content;
        post.createdAt = Date.now();
        await post.save();

    } catch (error) {
        console.log(error.message);
    }
}

exports.getPostByGenre = async(req,res,next) => {
    const theme = req.params['genre'];
    try{
        const posts = await Post.find({"genre.vibes":theme});
        res.send(posts);
    } catch(err){
        console.log(err.message);
    }
}
