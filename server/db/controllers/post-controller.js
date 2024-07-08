const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');
const mongoose = require("mongoose");

// Get post by ID
getPostById = async (req, res) => {
    try {
        const data = await PostModel.findOne({ _id: req.params.pid });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getPostById) Post not found!");
        }

        return res
            .status(200)
            .json({
                success: true,
                message: data
            });
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({
                success: false,
                error: "Post not found!"
            });
    }
};

// Get post by username
getPostByUsername = async (req, res) => {
    try {
        const data = await PostModel.find({ username: req.params.uid });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getPostByUsername) Post not found!");
        }

        return res
            .status(200)
            .json({
                success: true,
                message: data
            });
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({
                success: false,
                error: "Post not found!"
            });
    }
};

// Create post
createPost = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide a Post.',
            });
    }

    let post = new PostModel(body);

    if (!post) {
        console.error(`[Feedback-Forward] - 400 - (createPost) 'Post' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'Post' is malformed"
            });
    }

    try {
        await post.save();
    } catch (error) {
        console.log(error); 
        return res
            .status(400)
            .json({
                success: false,
                error: error
            });
    }

    console.log(`[Feedback-Forward] - 201 in 'createPost': Post created!`);
    return res
        .status(201)
        .json({
            success: true,
            id: post._id,
            message: 'Post created!',
        });
};

// Comment on post
commentOnPost = async (req, res) => {
    const body = req.body;

    if (!body) {
        console.error(`[Feedback-Forward] - 400 - (commentOnPost) 'Comment' is not provided.`);
        return res
            .status(400)
            .json({
                success: false,
                error: `You must provide a Comment.`,
            });
    }

    const userFound = await UserModel.findOne({ username: body.username });
    if (!userFound) {
        console.error(`[Feedback-Forward] - 400 - (commentOnPost) 'username' is not found in db.`);
        return res
            .status(400)
            .json({
                success: false,
                error: `user ${body.username} not found`
            });
    }

    const postId = req.params.pid; 
    try {
        const foundPost = await PostModel.findOne({ _id: postId });
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (getPostById) Post not found!");
        }

        foundPost.comments.push(body); 
        await foundPost.save();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                success: false,
                error: error
            });
    }

    return res
        .status(201)
        .json({
            success: true,
            message: `Comment created on post ${postId} by ${body.username}`
        });
};

// Delete comment on post
deleteCommentOnPost = async (req, res) => {
    const body = req.body;

    if (!body) {
        console.error(`[Feedback-Forward] - 400 - (deleteCommentOnPost) 'Comment' is not provided.`);
        return res
            .status(400)
            .json({
                success: false,
                error: `You must provide a Comment ID.`,
            });
    }

    const postId = req.params.pid; 
    const commentId = req.params.cid;
    console.log(commentId);
    try {
        const foundPost = await PostModel.findOne({ _id: postId });
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (deleteCommentOnPost) Post not found!");
        }

        // Finding the index of the comment id, returns -1 if comment not found
        const index = foundPost.comments.findIndex(comment => comment._id.toString() === commentId);
        if (index == -1) {
            throw new Error("[Feedback-Forward] - 404 - (deleteCommentOnPost) Comment not found!");
        }

        foundPost.comments.splice(index, 1);
        await foundPost.save();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                success: false,
                error: error
            });
    }

    return res
        .status(201)
        .json({
            success: true,
            message: `Comment ${commentId} deleted on post ${postId}`
        });
};

// Update post
updatePost = async (req, res) => {
    const postId = req.params.pid;
    const updateData = req.body;

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, { new: true });
        if (!updatedPost) {
            throw new Error("[Feedback-Forward] - 404 - (updatePost) Post not found!");
        }

        return res
            .status(200)
            .json({
                success: true,
                message: updatedPost
            });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({
                success: false,
                error: 'Error updating post'
            });
    }
};

module.exports = {
    createPost,
    getPostById,
    getPostByUsername,
    commentOnPost,
    deleteCommentOnPost,
    updatePost  // Export the updatePost function
};