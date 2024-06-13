const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            throw new Error("compPassword error")
        }
        return res
        .status(200)
        .json({
            success: true,
            message: "password match"
        })

    } 
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json(
                {
                    success: false,
                    error: error
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
            error: error
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

module.exports = {
    createUser,
    getUserByUsername,
    compPassword
}