const userModel = require('../models/userModel');

module.exports.getIndexRedirect = (req, res, next) => {
    if (!req.session.id) {
        res.redirect('/login');
    }
    else {
        next();
    }
}
module.exports.getIndex = async(req, res) => {
    const user = await userModel.findById(req.session.id);
    res.render('index', {user: {displayName: user.displayName, weatherCards: user.weatherCards}});
}