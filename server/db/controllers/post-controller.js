const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');
const mongoose = require("mongoose");
const jwtd = require('jwt-decode');


function getUsernameFromJWT(jwt) { 
    const jwt_username = jwtd.jwtDecode(jwt).username;
    console.log(`JWT USERNAME FOR CALL: ${jwt_username}`)
    return jwt_username
}

// Get post by ID
getPostById = async (req, res) => {
    try {
        const data = await PostModel.findOne({ _id: req.params.pid, published: true });
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
        const data = await PostModel.find({ username: req.params.uid, published: true });
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

getPostByTime = async (req, res) => {
    try {
        const twoHoursAgo = new Date(Date.now() - (60 * 60 * 2000));
        const data = await PostModel.find({ createdAt: {$gte: twoHoursAgo}, published: true });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getPostByUsername) Posts not found!");
        }

        return res
            .status(200)
            .json({
                success: true,
                message: 'Posts successfully found',
                posts: data
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
}

getPostByUpvotes = async (req, res) => {
    try {
        const data = await PostModel.find({published: true}).sort({upvotes: -1});
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

getPostByTags = async (req, res) => {
    try {
        const {tags} = req.query;
        const data = await PostModel.find({published: true}).sort({upvotes: -1});
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

    const jwt_username = getUsernameFromJWT(req.headers.authorization);

    body.username = jwt_username;

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

    const jwt_username = getUsernameFromJWT(req.headers.authorization);
    if(body.username != null && body.username != jwt_username) {
        return res
            .status(404)
            .json({
                succes: false,
                error: `trying to comment as another user, true_user = ${jwt_username}, body_user = ${body.username}`
            })
    }

    body.username = jwt_username;

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
            message: `Comment created on post ${postId} by ${body.username}`,
            postId: postId,
            commentId: commentId
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
    const jwt_username = getUsernameFromJWT(req.headers.authorization)
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
        
        if(foundPost.comments[index].username != jwt_username){
            throw new Error("[Feedback-Forward] - 404 - (deleteCommentOnPost) Username not equal to JWT username")
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

deletePost = async (req, res) => {
    const postId = req.params.pid;
    const jwt_username = getUsernameFromJWT(req.headers.authorization);

    try {
        const foundPost = await PostModel.findOne({ _id: postId });
        if(jwt_username != foundPost.username){
            throw new Error("[Feedback-Forward] - 404 - (deletePost) Trying to delete another users post!")
        }
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (deletePost) Post not found!");
        }

        await PostModel.deleteOne(foundPost);
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                success: false,
                error: error.message
            });
    }

    return res
        .status(201)
        .json({
            success: true,
            message: `Deleted post ${postId}`
        });
}; 

// Update post
updatePost = async (req, res) => {
    const postId = req.params.pid;
    const updateData = req.body;
    const jwt_username = getUsernameFromJWT(req.headers.authorization);

    try {
        const foundPost = await PostModel.findById(postId);
        if(jwt_username != foundPost.username) {
            throw new Error("[Feedback-Forward] - 404 - (updatePost) Attempting to update post that is not yours!")
        }
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (updatePost) Post not found!");
        }

        const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {new:true});

        return res
        .status(200)
        .json({
            success: true,
            message: `Successfully updated post ${postId}`,
            post: updatedPost
        });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({
                success: false,
                error: 'Error updating post',
                message: error.message
            });
    }
};

upvotePost = async (req, res) => {
    const postId = req.params.pid;

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId, 
            {$inc: {upvotes: 1}}, 
            { new: true }
        );
        
        if (!updatedPost) {
            throw new Error("[Feedback-Forward] - 404 - (updatePost) Post not found!");
        }

        return res
            .status(200)
            .json({
                success: true,
                message: `New post upvotes: ${updatedPost.upvotes}`,
                post: updatedPost
            });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({
                success: false,
                message: 'Error updating post',
                error: error.message
            });
    }
};


module.exports = {
    createPost,
    getPostById,
    getPostByUsername,
    getPostByTime,
    getPostByUpvotes,
    commentOnPost,
    deletePost,
    deleteCommentOnPost,
    updatePost,
    upvotePost  // Export the updatePost function
};