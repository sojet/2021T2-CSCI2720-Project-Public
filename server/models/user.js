/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const Joi = require('joi')


const userSchema = Schema({
    firstName: {
        type: String,
        unique: true, 
        required: true,
    },
    lastName: {
        type: String,
        unique: true, 
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        unique: true, 
        required: true,
    },
    username: {
        type: String,
        unique: true, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verified:
    {
        type: Boolean,
        default: false
    },
    favouriteLocation: [{ type: Array }]


}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" })
    return token
}
const User = mongoose.model('user', userSchema);
// check rule
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        username: Joi.string().min(4).max(20).required().label("username"),
        password: Joi.string().min(4).max(20).required().label("password"),
    });
    return schema.validate(data)
}

module.exports = { User, validate };