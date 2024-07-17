const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

getUserByUsername = async (req, res) => {
    try {
        const data = await UserModel.findOne({ username: req.params.uid });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getUserById) User not found!");
        }
        data.password = "redacted"; 
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
                    success: false,
                    error: "User not found!"
                }
            )
    }
};

compPassword = async (req, res) => {
    const body = req.body;
    console.log("*****************")
    try {
        const data = await UserModel.findOne({ username: body.username });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (compPassword) User not found!");
        }

        const result = await bcrypt.compareSync(body.password, data.password);
        if(!result){
            throw new Error("Passwords do not match")
        }
        const payload = { id: data._id, username: data.username };
        // change jwt secret to something good, get it from environment variables instead of hardcoding
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '5h' });
        return res
        .status(200)
        .json({
            success: true,
            message: "password match",
            token: token
        })

    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json(
                {
                    success: false,
                    message: "Error logging in",
                    error: error.message
                }
            )
    }
};

createUser = async(req, res) => {
    const body = req.body;

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an User.',
            });
    }

    var user = new UserModel(body);
    if (!user) {
        console.error(`[Feedback-Forward] - 400 - (createUser) 'User' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'User' is malformed"
            });
    }

    try{
        await user.save();
    }
    catch(error){
        return res
        .status(400)
        .json({
            success: false,
            error: error.message
        });
    }

            
    console.log(`[Feedback-Forward] - 201 in 'createUser': User created!`);
    return res
        .status(201)
        .json({
            success: true,
            id: user._id,
            message: 'User created!',
        });
};

updateUser = async(req, res) => {
    try {
        const body = req.body;

        if (!body) {
            throw new Error("You must provide a field to update.");
        }

        const jwt_username = jwt_decode.jwtDecode(req.headers.authorization).username;

        if(req.params.uid != jwt_username) {
            throw new Error('You are trying to update a user not of your own.')
        }

        const user = await UserModel.findOneAndUpdate({ username: req.params.uid }, body, {runValidators: true});
        if (!user) {
            throw new Error("[Feedback-Forward] - 404 - (updateUser) User not found!");
        }
    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json(
                {
                    success: false,
                    message: "Something went wrong!",
                    error: error.message
                }
            )
    }
    return res
        .status(200)
        .json({
            success: true,
            message: "user successfully updated"
        })
}

module.exports = {
    createUser,
    getUserByUsername,
    compPassword,
    updateUser
}