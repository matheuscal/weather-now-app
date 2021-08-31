const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Proper filtering for space and special characters is recommended.
    login: {
        type: String,
        minlength: 4,
        maxlength: 32,
        required: true,
        validate: {
            validator: (v) => /[a-zA-Z][\w]{3,31}/gi.test(v),
            message: (props) => `The login "${props.value}" didn\'t pass the regex test.` 
        }
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 32,
        required: true
    },
    displayName: {
        type: String,
        minlength: 4,
        maxlength: 32,
        required: true
    },
    weatherCards: [{}]
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;