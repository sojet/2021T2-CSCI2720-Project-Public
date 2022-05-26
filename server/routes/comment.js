/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const router = require("express").Router();
const { Comment } = require("../models/comment");
const { Location } = require("../models/location");
const { User, validate } = require("../models/user");
// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended: true}));


router.post("/", async (req, res) => {
    try {

        res.send('test');

    } catch (error) {

    }


})
//Get All Comment
router.get("/", async (req, res) => {
    try {
       const AllComment = await Comment.find().populate('location_id').populate('user_id');
       //const AllLocation = await Comment.deleteMany( { } );
        res.status(200).send(AllComment);

    } catch (error) {
        res.status(500).send(error);
    }
});

// Get By locatId (Get by location Id)
router.get("/LocationId/:LocationId", async (req, res) => {
    try {
        var condition = {};
        condition['Id'] = req.params['LocationId'];
        const loc = await Location.findOne(condition);

        var condition = {};
        condition['location_id'] = loc._id;
        const response = await Comment.find(condition).sort({postTime:-1}).populate('location_id').populate('user_id');

        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// update comment
router.post("/updatecomment", async (req, res) => {
    // console.log(req.body);
    // console.log(typeof(req.body));
    try {
        var condition = {};
        condition[req.body['element']] = req.body['value'];
        const user = await User.find(condition);
        if (!user)
            return res.status(401).send({ message: "Invalid User" });

        var condition = {};
        condition['Id'] = req.body.location_id;
        const loc = await Location.find(condition);
        if (!loc)
            return res.status(401).send({ message: "Invalid loc" });

        let response = Comment.create({
            location_id: loc[0]._id,
            content: req.body.comment,
            postTime: Date.now(),
            user_id: user[0]._id
        });

        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;