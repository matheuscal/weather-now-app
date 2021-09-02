const userModel = require('../models/userModel');

module.exports.postApiCreateAccount = async(req, res, next) => {
    const {login, password, displayName} = req.body;
    const userAlreadyExists = await userModel.findOne({login});

    if (userAlreadyExists && userAlreadyExists.login === login)
        res.status(400).send({error: {login: 'Login already in use'}});
    else {
        const newUser = new userModel({login, password, displayName});
        newUser.validateSync();
        newUser.save().then(
            () => {
                res.send({});
            }).catch(err => {
                console.log(err.message);
                res.status(400).send({error: 'Signup inputs have the wrong format.'});
            });
    }
}

module.exports.postApiLogin = async(req, res, next) => {
    const {login, password} = req.body;
    const user = await userModel.findOne({login, password});
    // If login and password is correct...
    if (user) {
        // Set up a valid cookie id, this info is used to identify a particular user.
        req.session.id = user._id;
        res.send({});
    }
    else {
        res.status(400).send({error: {form: "Login or Password is incorrect."}});
    }
}

module.exports.getLogout = (req, res) => {
    req.session = null;
    res.redirect('/login');
}
