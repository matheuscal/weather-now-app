const mongo = require('mongoose');
mongo.connect('mongodb+srv://lancelot:netgate@cluster0.xxxgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then((data) => {
        console.log('Database: Connected.');
    })
    .catch((err) => {
        console.log('Database: Error while connecting.', err);
    })
