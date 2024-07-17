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
                message: "Something went wrong!",
                error: error.message
            });
    }

};

// Get post by username
getPostByUsername = async (req, res) => {
    try {
        const data = await PostModel.find({ username: req.params.uid, published: true }).sort({createdAt: -1});
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
                message: "Something went wrong!",
                error: error.message
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
                message: data
            });
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({
                success: false,
                message: "Something went wrong!",
                error: error.message
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
                message: "Something went wrong!",
                error: error.message
            });
    }


};

getPostByTags = async (req, res) => {
    try {
        if(!req.query.q){
            throw new Error("[Feedback-Forward] - 404 - (getPostByTags) Tags not passed!")
        }
        const tags = req.query.q.split(",");
        const sort = req.query.sort;

        const data = await PostModel.find({published: true, tags: {$all: tags}});
        let posts = data;
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getPostByTags) Post not found!");
        }

        if (sort === "top") {
            posts = data.sort(
                (a, b)=>{
                    return b.upvotes - a.upvotes;
                }
            );
        }

        if (sort === "new"){
            posts = data.sort( 
                (a,b) => {
                    if(a.createdAt > b.createdAt){
                        return 1;
                    }
                    if (b.createdAt > a.createdAt){
                        return -1;
                    }
                    return 0;
                }
            );
        }
        return res
            .status(200)
            .json({
                success: true,
                message: posts
            });
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({
                success: false,
                message: "Something went wrong!",
                error: error.message
            });
    }

};

// Create post
createPost = async (req, res) => {
    try {
        const body = req.body;

        if (!body) {
            throw new Error("[Feedback-Forward] - 400 - (createPost) 'Post' is malformed.");
        }
    
        const jwt_username = getUsernameFromJWT(req.headers.authorization);
    
        body.username = jwt_username;

        let post = new PostModel(body);

        if (!post) {
            throw new Error("[Feedback-Forward] - 400 - (createPost) 'Post' is malformed.");
        }

        await post.save();

        console.log(`[Feedback-Forward] - 201 in 'createPost': Post created!`);
        return res
            .status(201)
            .json({
                success: true,
                postId: post._id,
                message: 'Post created!',
                post: post
            });
    } catch (error) {
        console.log(error); 
        return res
            .status(400)
            .json({
                success: false,
                message: "Something went wrong!",
                error: error.message
            });
    }
};

// Comment on post
commentOnPost = async (req, res) => {
    try {
        const comment = req.body;

        if (!comment) {
            throw new Error(`[Feedback-Forward] - 400 - (commentOnPost) 'Comment' is not provided.`);
        }
    
        const jwt_username = getUsernameFromJWT(req.headers.authorization);
        if(comment.username != null && comment.username != jwt_username) {
            return res
                .status(404)
                .json({
                    succes: false,
                    error: `trying to comment as another user, true_user = ${jwt_username}, body_user = ${comment.username}`
                })
        }
    
        comment.username = jwt_username;
    
        const postId = req.params.pid; 

        const foundPost = await PostModel.findOneAndUpdate({ _id: postId }, {$push:{comments: comment}});
        console.log(foundPost);
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (getPostById) Post not found!");
        }

        return res
        .status(201)
        .json({
            success: true,
            message: `Comment created on post ${postId} by ${comment.username}`,
            postId: postId
        });

    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                success: false,
                error: error
            });
    }
};

// Delete comment on post
deleteCommentOnPost = async (req, res) => {
    const body = req.body;
    if (!body) {
        throw new Error(`[Feedback-Forward] - 400 - (deleteCommentOnPost) 'Comment' is not provided.`);
    }

    const jwt_username = getUsernameFromJWT(req.headers.authorization)
    const postId = req.params.pid; 
    const commentId = req.params.cid;
    
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
                message: "Something went wrong!",
                error: error.message
            });
    }

    return res
        .status(201)
        .json({
            success: true,
            message: `Comment ${commentId} deleted on post ${postId}`,
            postId: postId,
            commentId: commentId
        });
};

deletePost = async (req, res) => {
    const postId = req.params.pid;
    const jwt_username = getUsernameFromJWT(req.headers.authorization);

    try {
        const foundPost = await PostModel.findOne({ _id: postId });
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (deletePost) Post not found!");
        }
        if(jwt_username != foundPost.username){
            throw new Error("[Feedback-Forward] - 404 - (deletePost) Trying to delete another users post!")
        }

        await PostModel.deleteOne(foundPost);
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                success: false,
                message: "Something went wrong!",
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
        if (!foundPost) {
            throw new Error("[Feedback-Forward] - 404 - (updatePost) Post not found!");
        }
        if(jwt_username != foundPost.username) {
            throw new Error("[Feedback-Forward] - 404 - (updatePost) Attempting to update post that is not yours!")
        }

        const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {new:true});

        return res
        .status(200)
        .json({
            success: true,
            message: `Successfully updated post ${postId}`,
            postId: postId,
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
            postId: postId,
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
    getPostByTags,
    commentOnPost,
    deletePost,
    deleteCommentOnPost,
    updatePost,
    upvotePost  // Export the updatePost function
};