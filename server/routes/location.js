/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const router = require("express").Router();
const { reset } = require("nodemon");
const { Location } = require("../models/location");
const { User, validate } = require("../models/user");


router.post("/", async (req, res) => {
    try {

        res.send('test');

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }


})


router.get("/createLocation", async (req, res) => {
    try {
        //const location = await Location.deleteOne({id: 1});
        const location = await Location.create({ Id: 2,Name:'Hong Kong',Latitude:6.1,Longitude:8.2});
        res.send(location);

    } catch (error) {
        res.send(error);
    }


});

//Get All Location
router.get("/", async (req, res) => {
    try {
        const AllLocation = await Location.find();
        res.status(200).send(JSON.stringify(AllLocation));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// Get Locations by ID
router.get("/:id", (req, res) => {
    let id= req.params['id'];
    Location.findOne( {Id: id}, (err, result) => {
        // console.log(result);
        // console.log(typeof(result));
        if (err){
            return handleError(err);
        }
        else if (result === null){
            res.status(204).send();
        }
        else{
            var result_list= [result];
            res.send(JSON.stringify(result_list));
        }
    });
});
// Get by sort
router.get("/element/:element/sort/:sort", async (req, res) => {
    try {
        var mysort = {};
        mysort[req.params['element']] = req.params['sort'];
        const response = await Location.find().sort(mysort);
        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get By value
router.get("/element/:element/value/:value", async (req, res) => {
    try {
        var condition = {};
        condition[req.params['element']] = req.params['value'];
        const response = await Location.find(condition);
        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// Get By value and by sort
// E.g. http://localhost:4000/api/location/element1/Id/value/1/element2/Id/sort/-1 | select * from LocationTable where Id=1 sort by -1/1.
router.get("/element1/:element1/value/:value/element2/:element2/sort/:sort", async (req, res) => {
    try {
        var condition = {};
        condition[req.params['element1']] = req.params['value'];
        var mysort = {};
        mysort[req.params['element']] = req.params['sort'];
        const response = await Location.find(condition).sort(mysort);
        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;