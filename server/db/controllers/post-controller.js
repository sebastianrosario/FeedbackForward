const PostModel = require('../models/post-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

getPostById = async (req, res) => {
    try {
        const data = await PostModel.findOne({ _id: req.params.uid });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getPostById) Post not found!");
        }

        return res
            .status(200)
            .json({
                success: true,
                message: data
            })
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json(
                {
                    succes: false,
                    error: "Post not found!"
                }
            )
    }
};

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
            })
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json(
                {
                    succes: false,
                    error: "Post not found!"
                }
            )
    }
};

createPost = async(req, res) => {
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

    try{
        await post.save();
    }
    catch(error){
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

module.exports = {
    createPost,
    getPostById,
    getPostByUsername
}