const PostModel = require('../models/post-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

getPostById = async (req, res) => {
    try {
        const data = await PostModel.find({ postid: req.params.uid });
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

createPost = async(req, res) => {
    const body = req.body;

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an Post.',
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

    // hashing password, no clue what its gonna do
    const hashedPassword = await bcrypt.hashSync(post.password, saltRounds);

    // console.log('----------------------- createPost: Post -----------------------')
    // console.log(Post);
    try{
        post.password = hashedPassword;
        const success = post.save();
    }
    catch(error){
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
    getPostById
}