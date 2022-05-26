/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const router = require("express").Router();
const { User } = require("../models/user");
const { Console } = require("console");

/*-------------------------------------------------------------------------------------------*/
//GET ALL USER
router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).send(JSON.stringify(user));


    } catch (error) {

    }


});

// userdetail
router.post("/userdetail", async (req, res) => {
    console.log(req.body);
    try {
        var condition = {};
        condition[req.body['element']] = req.body['value'];
        //console.log(req.body);
        const response = await User.find(condition);
        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get By value
router.post("/pushFavlocation", async (req, res) => {
    console.log(req.body);
    try {
        var condition1 = {};
        condition1[req.body['element']] = req.body['value'];
        var condition2 = {};
        condition2['favouriteLocation'] = req.body['favouriteLocation'];
        const response = await User.updateOne(
            condition1,
            { $push: condition2 }
         )
        res.send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/pullFavlocation", async (req, res) => {
    try {
        var condition1 = {};
        condition1[req.body['element']] = req.body['value'];
        var condition2 = {};
        condition2['favouriteLocation'] = req.body['favouriteLocation'];
        const response = await User.updateOne(
            condition1,
            { $pull: condition2 }
         )
        res.send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
module.exports = router;
