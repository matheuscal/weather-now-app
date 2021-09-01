const express = require('express');
require('./models/mongo');
const cookieSession = require('cookie-session');
const accountRoute = require('./routes/accountRoute');
const navigationRoute = require('./routes/navigationRoute');
const weatherRoute = require('./routes/weatherRoute');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./static/'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieSession({name: 'userSession', maxAge: 1000 * 60 * 60 * 24, keys: process.env.COOKIE_KEYS || ['A912kedkfKl', 'kLadi29lfvnzj', '731Kksdkl17c'], sameSite: 'none'}));
app.use(accountRoute);
app.use(navigationRoute);
app.use(weatherRoute);

app.listen(process.env.PORT || '3000');