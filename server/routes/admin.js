/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/
const router = require("express").Router();
const request = require("request");
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
router.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors'); 
router.use(cors());

const {Location} = require("../models/location");
const {User, validate} = require("../models/user");
const { type } = require("os");
const { time } = require("console");
const { response } = require("express");

const key = "";

//  ****** Refresh data ******

//Refresh weather data of specific location
router.post("/refresh", (req, res) => {
    console.log(req.body);
    Location.findOne({Name: req.body.loc}, (err, result)=>{
        console.log(result);
        console.log(typeof(result));
        if (result== null){
            const loc= req.body.name;
            const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + req.body.loc;
            request(url, (error, response, body) => {
                const location_query= Location.findOne({});
                    location_query.sort({Id: -1});
                    location_query.exec((e, event) =>{
                        if (e)
                            return handleError(e);
                        else{
                            var max_Id= event.Id+1;
                            console.log(max_Id);
                            console.log(body);
                            body= JSON.parse(body);
                            Location.create({
                                Id: max_Id,
                                Name: req.body.loc,
                                Latitude: body.location.lat,
                                Longitude: body.location.lon,
                                Country: body.location.country,
                                Region: body.location.region,
                                Timezone: body.location.tz_id,
                                Temp_c: body.current.temp_c,
                                Wind_kph: body.current.wind_kph,
                                Wind_degree: body.current.wind_degree,
                                Wind_dir: body.current.wind_dir,
                                Pressure_mb: body.current.pressure_mb,
                                Precip_mm: body.current.precip_mm,
                                Humidity: body.current.humidity,
                                Cloud: body.current.cloud,
                                Feelslike_c: body.current.feelslike_c,
                                Vis_km: body.current.vis_km,
                                Uv: body.current.uv,
                                Last_updated: body.current.last_updated,
                            }, (error1, location2) =>{
                                if (error1)
                                    handleError(error1);
                                else{
                                    console.log(location2);
                                    res.send(location2);
                                }
                            })
                        }
                    })
            })
        }
        else{
            console.log("The location exists in the database!");
            res.send("The location exists in the database!");
        }
    })
})


// refresh a location by id
router.put("/refresh/:Id", async (req, res) => {
    console.log(req.params);

    Location.findOne({Id: req.params.Id}, (error, response) =>{
        const loc= response.Name;
        const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + loc
        request(url, (error, response2, body) => {
            console.log(body);
            body= JSON.parse(body);
            response.Latitude = body.location.lat;
            response.Longitude = body.location.lon;
            response.Country = body.location.country;
            response.Region = body.location.region;
            response.Timezone = body.location.tz_id;
            response.Temp_c = body.current.temp_c;
            response.Wind_kph = body.current.wind_kph;
            response.Wind_degree = body.current.wind_degree;
            response.Wind_dir = body.current.wind_dir;
            response.Pressure_mb = body.current.pressure_mb;
            response.Precip_mm = body.current.precip_mm;
            response.Humidity = body.current.humidity;
            response.Cloud = body.current.cloud;
            response.Feelslike_c = body.current.feelslike_c;
            response.Vis_km = body.current.vis_km;
            response.Uv = body.current.uv;
            response.Last_updated = body.current.last_updated;
            response.save();
        })
        res.send(response);
        })
})


// Delete a location by ID
router.delete("/refresh/:Id", async (req, res) => {
    console.log(req.params);
    Location.deleteOne({Id: req.params.Id}, (error, result) => {
        if (error)
            res.send(error);
        else
            res.send(result);
    })
})


//Refresh weather data of all existing location (found in from /weather_data)
router.get("/refresh", async (req, res) => {
    Location.find({}, (err, result)=>{
        if (err){
            return handleError(err);
        }
        else{
            for (let i=0 ; i< result.length; i++){
                console.log(result[i].Name);
                Location.findOne({Name: result[i].Name}, (error, response) =>{
                    const loc= result[i].Name;
                    const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + loc
                    request(url, (error, response2, body) => {
                        console.log(body);
                        body= JSON.parse(body);
                        response.Latitude = body.location.lat;
                        response.Longitude = body.location.lon;
                        response.Country = body.location.country;
                        response.Region = body.location.region;
                        response.Timezone = body.location.tz_id;
                        response.Temp_c = body.current.temp_c;
                        response.Wind_kph = body.current.wind_kph;
                        response.Wind_degree = body.current.wind_degree;
                        response.Wind_dir = body.current.wind_dir;
                        response.Pressure_mb = body.current.pressure_mb;
                        response.Precip_mm = body.current.precip_mm;
                        response.Humidity = body.current.humidity;
                        response.Cloud = body.current.cloud;
                        response.Feelslike_c = body.current.feelslike_c;
                        response.Vis_km = body.current.vis_km;
                        response.Uv = body.current.uv;
                        response.Last_updated = body.current.last_updated;
                        response.save();
                    })
                })
            }
        }
    })
})



//Search for live weather api
router.post("/search", (req, res) => {
    const loc= req.body.name;
    const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + loc
    request(url, (error, response, body) => {
        res.send(body);
    })

})
//  ****** Location data ******

//  *** Location C ***
router.post("/loc", async (req, res) => {

    
    const locId = req.body['cLocId']
    const locName = req.body['cLocName']
    //locName = locName.split(" ").join("")
    const lat = req.body['cLat']
    const lon = req.body['cLon']

    console.log("Location post Success " + locId + locName + lat + lon);
    
    /**/
    Location.create({
        Id:locId,          
        Name: locName,
        Latitude: lat,
        Longitude: lon,

    },(err,e)=>{

        if (err)
            res.json('Error: Cannot create event');

        else {      
            
            //printEvLoc(e)
            res.set('Content-Type', 'text/plain');
            res.statusCode = 201;

            console.log("Location Creation Success");
                
        }
    });
})

// function printLoc(results){   //This function helps printing the Location details
    
//     return "{\n\"Id\": " + results.Id + ",\n" +
//             "\"Name\": " + results.Name + ",\n" +
//             "\"Latitude\": " + results.Latitude + "\"\n" +
//             "\"Longitude\": " + results.Longitude + "\n" +
//             "}";
// }

//  *** Location R ***
router.get("/loc/:locName", async (req, res) => {
    
    try {
        //console.log("(Loc R) get loc req success")
        let name= req.params['locName'];
        Location.findOne( {Name: name}, 'Id Name Latitude Longitude', (err, result) => {
            // console.log(result);
            // console.log(typeof(result));
            if (err){
                return handleError(err);
            }
            else if (result === null){
                res.status(204).send();
            }
            else{
                console.log("Fetching Loc data: " + result);
                res.json(result);
            }
    });


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error (post Loc)" });
    } 
})

//  *** Location U ***
router.put("/loc/:locName", async (req, res) => {
    console.log("PUT now");
    console.log(req.body);
    Location.findOne({Name: req.params['locName']},
        (err, loc) => {
            loc.Id = req.body['Id'];
            loc.Name = req.body['Name'];
            loc.Latitude = req.body['Lat'];
            loc.Longitude = req.body['Lon'];
            loc.save();
            
        })
        res.send("PUT ok");
})

//  *** Location D ***
router.delete("/loc/:locName", async (req, res) => {
    Location.findOne({Name: req.params['locName']},(err, e) => {
        if (err|| e === null){
            res.status(204) .send();
        } else {
            
            Location.deleteOne({Name: req.params['locName']},(re_err, re_e) => {
            if (re_err|| re_e === null){
                res.send('Unexpected Error: Failed to remove');
            } else {
                res.status(201).send({ message: "User delete successfully" });
            }
        }) 
            console.log("Delete success")

        }
    })
})




//  ****** User data ******

//  *** User C ***
router.post("/create", async (req, res) => {
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

        user = await new User({ ...req.body, password: hashPassword, verified:true }).save();

        res
        .status(201)
        .send({ message: "User create successfully" });
})

//  *** User R ***
router.get("/user/:userName", async (req, res) => {
    try {
        //console.log("(Loc R) get loc req success")
        let userName= req.params['userName'];
        User.findOne( {username: userName}, (err, result) => {
            console.log(result);
            // console.log(typeof(result));
            if (err){
                res
                .status(409)
                .send({ message: "Error!" });
                return handleError(err);

            }
            else if (result === null){
               res.status(204).send();
                
            }
            else{
                console.log("Fetching User data: " + result);
                result.password=""
               res.json(result);
             
            }
    });


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error (post Loc)" });
    } 
})

router.get("/user", async (req, res)=>{
    try {
        const AllUser = await User.find();
        res.status(200).send(JSON.stringify(AllUser));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

})



//  *** User U ***
router.put("/user/:userName", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body['uUserPW'], salt);
        console.log(salt);
        console.log("PUT user data now");
        console.log(req.body);
        const userName = req.params['userName']
        console.log("Username: " + userName)
        
    User.findOne({username: userName},
        (err, user) => {

            if(err|| user === null)
            res.json("Error 1" + err);
            else {
               if(req.body['uUserPW'].length<4 || req.body['uUserPW'].length>20 ||  req.body['uUserName'].length <4 ||req.body['uUserName'].length>20)
               {
                return res.status(204).send({ message: "The password length  of 4–20 characters and  username length of 4–20 characters  are required" });
               }else{
                user.firstName = req.body['uFirstName'],     
                user.lastName = req.body['uLastName'],
                user.email = req.body['uUserEmail'],
                user.username = req.body['uUserName'],
                user.password = hashPassword,
                user.isAdmin = req.body['uAdmin'],
                user.verified = req.body['uVerified'],
                user.save(); 
            res.status(201).send({ message: "User update successfully" });
        } 
                //res.json("Success 2");
            }
           
        })
        
    }catch (err){
            res.status(500).send({ message: "Internal Server Error (post User)" });
    }

    
})

//  *** User D ***
router.delete("/user/:userName", async (req, res) => {
    User.findOne({username: req.params['userName']},(err, e) => {
        if (err|| e === null)
        {
            res.status(204)
                .send({ message: "User Not Found!" });
        } else {

            User.deleteOne({username: req.params['userName']},(re_err, re_e) => {
                if (re_err|| re_e === null){
                    res.send('Unexpected Error: Failed to remove');
                } else {
                    res
                    .status(201)
                    .send({ message: "User delete successfully" });
                }
            })
            console.log("Delete success")
        }
    })
})

module.exports = router;
