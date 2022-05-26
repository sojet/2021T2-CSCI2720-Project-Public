/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const session = require('express-session');


router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ username: req.body.username }); //checking the user exist or not
        if (!user)
            return res.status(401).send({ message: "Invalid username or Password" });

        const validPassword = await bcrypt.compare( //checking the password is correct or not
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid username or Password" });

        if (!user.verified) { //If the user is not verified ,send the email again
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
                await sendEmail(user.email, "Verify Email", url);
            }

            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }
        console.log("Admin status: ", user.isAdmin)
        const token = user.generateAuthToken();

        res.status(200).send({ data: token, message: "logged in successfully", userfirstname: user.firstName, username: user.username, Admin: user.isAdmin, favouriteLocation: user.favouriteLocation});
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("username"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;