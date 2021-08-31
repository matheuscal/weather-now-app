const router = require('express').Router();
const {postApiCreateAccount, postApiLogin, getLogout} = require('../controls/accountControl');

router.get('/login', (req, res) => {
    if (req.query.accountCreated === 'true'){
        res.render('login', {message: {form: 'Account Successfully created, you may now Log In.'}});
    }
    else
        res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/api/createaccount', postApiCreateAccount);

router.post('/api/login', postApiLogin);

router.get('/logout', getLogout);

module.exports = router;