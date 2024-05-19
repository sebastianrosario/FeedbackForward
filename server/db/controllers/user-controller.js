const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

getUserById = async (req, res) => {
    try {
        const data = await UserModel.find({ username: req.params.uid });
        if (!data) {
            throw new Error("[Feedback-Forward] - 404 - (getUserById) User not found!");
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
        console.log(body);
        console.log(data.password);

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
                    succes: false,
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

    let user = new UserModel(body);

    if (!user) {
        console.error(`[Feedback-Forward] - 400 - (createUser) 'User' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'User' is malformed"
            });
    }

    // hashing password, no clue what its gonna do
    const hashedPassword = await bcrypt.hashSync(user.password, saltRounds);
    console.log(hashedPassword);

    // console.log('----------------------- createUser: User -----------------------')
    // console.log(User);
    try{
        user.password = hashedPassword;
        const success = user.save();
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
    getUserById,
    compPassword
}