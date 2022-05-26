/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
        let username = await User.findOne({ username: req.body.username });
        if (username)
            return res.status(409).send({ message: "User with given username already Exist!" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        console.log(process.env.BASE_URL)
        const url = `${process.env.BASE_URL}signup/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res
            .status(201)
            .send({ message: "An Email sent to your account please verify" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id/verify/:token", async (req, res) => {
    try {
        //console.log(req)
        console.log(req.params.id)
        console.log(req.params.token)
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link ,Can not find the User" });
        console.log(user._id)
        const token = await Token.findOne({
            userId: req.params.id,
            token: req.params.token,
        });
        console.log(token)
        if (!token) return res.status(400).send({ message: "Invalid link,Can not find the token" });
        var updatedUser = await User.findOne({ _id: user._id });
        updatedUser.verified = true;
        await updatedUser.save();
        await token.remove();

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;