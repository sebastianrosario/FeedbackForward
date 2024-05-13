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
    getUserById
}