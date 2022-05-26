/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Mapbox from '../Map/map';
import { Grid, Paper, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import Navbar from '../Main/navbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from 'moment';


const containerStyle = {
    width: '100%',
    height: '100vh'
};


const Favorite= () => {
    let {id} = useParams();
    const username= localStorage.getItem("Username");
    const text = {
        element: "username",
        value: username,
        favouriteLocation: id,
    };

    // console.log(text);
    const [isClick, setClick] = React.useState(localStorage.getItem('favouriteLocation').split(",").includes(id));

    useEffect( () => {
        return () => {
            if(!isClick)
            {
                let url= "http://23.21.161.150:4000/api/user/pushFavlocation";
                fetch(url, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
                })
                .then(res => res.json())
                .then(json =>console.log(isClick))
            }else
            {
                let url= "http://23.21.161.150:4000/api/user/pullFavlocation";
                fetch(url, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
                })
                .then(res => res.json())
                .then(json =>console.log(isClick))
            } 
        }
      }, [isClick]);

    const [ favloc, setfavloc ] = useState();
    useEffect(() => {
        
    fetch('http://23.21.161.150:4000/api/user/userdetail', {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
        }).then(response => response.json())
        .then(
            (data) => {
                localStorage.removeItem('favouriteLocation');
                localStorage.setItem('favouriteLocation', data[0].favouriteLocation);
                data[0].favouriteLocation.includes(id) ? setfavloc(true) : setfavloc(false);
            }
        );
   } ,[favloc]);
      
    const handleToggle = () => {
        setClick(!isClick);
        setfavloc(!favloc);
    };

    return (
      <div>
        {isClick ? <Button onClick={handleToggle}><FavoriteIcon /></Button> :  <Button onClick={handleToggle}><FavoriteBorderIcon/></Button>}
      </div>
    );
};


const Realtimeinfo= (props) =>{
    props= props.info;
    return(
        <div>
            <label>Weather Information</label>
            <table class= "table">
                <tbody>
                    <tr>
                        <th scope= "row">Last Updated</th>
                        <td>{props.current.last_updated}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Temperature / C</th>
                        <td>{props.current.temp_c}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Temperature (Feel Like) / C</th>
                        <td>{props.current.feelslike_c}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Precipitation / mm</th>
                        <td>{props.current.precip_mm}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Pressure / mb</th>
                        <td>{props.current.pressure_mb}</td>
                    </tr>
                    <tr>
                        <th scope= "row">UV</th>
                        <td>{props.current.uv}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Visibility (km)</th>
                        <td>{props.current.vis_km}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Wind Degree</th>
                        <td>{props.current.wind_degree}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Wind Direction</th>
                        <td>{props.current.wind_dir}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Wind kph</th>
                        <td>{props.current.wind_kph}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
const Locationinfo= (props) =>{
    const [detail, setDetail]= useState([]);
    const [isLoaded, setIsloaded]= useState(false);
    const text = {"name": props.content.Name};

    useEffect(() => { fetch('http://23.21.161.150:4000/api/admin/search', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
    })
    .then(response => response.json())
    .then(data => {
        setDetail(data);
        setIsloaded(true);
    });
    },[]);

    return (
        <div key={props.content.Name}>
            <label>City</label>
            <table class= "table">
                <tbody>
                    <tr>
                        <th scope= "row">City</th>
                        <td>{props.content.Name}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Country</th>
                        <td>{props.content.Country}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Region</th>
                        <td>{props.content.Region}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Latitude</th>
                        <td>{props.content.Latitude}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Longitude</th>
                        <td>{props.content.Longitude}</td>
                    </tr>
                    <tr>
                        <th scope= "row">Timezone</th>
                        <td>{props.content.Timezone}</td>
                    </tr>
                </tbody>
            </table>
            {isLoaded && <Realtimeinfo info= {detail}/>}
        </div>
    )
};


const Commentbox= () =>{
    const username= localStorage.getItem("Username");
    let {id} = useParams();
    const defaultValues = {
        element: "username",
        value: username,
        location_id: id,
        comment: "",
    };
    
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(formValues);
        console.log(JSON.stringify(formValues));
        let url= "http://23.21.161.150:4000/api/comment/updatecomment/";

        fetch(url, {
          method: "POST",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        })
    };

    return (
        <div>
            <TextField 
                className="col" 
                id="comment" 
                variant= "outlined" 
                name="comment" 
                type= "text"
                label= "Comment"
                onChange={handleInputChange}
                value={formValues.comment}
            />
            <br/>
            <Button className="col" variant="contained" onClick={handleSubmit}>Add a new comment</Button>
        </div>
    )
};


const Comment= (props) =>{
    props= props.data;
    return (
        <div key={props._id}>
            <Paper>
                <Grid>
                    <div className='row'>
                        <label className='col' style={{color: "blue"}}>{props.user_id.username}</label>
                        <label className='col' style={{color: "red"}}>{moment(props.postTime).format("YYYY/MM/DD HH:mm:ss")}</label>
                    </div>
                    <Typography>{props.content}</Typography>
                </Grid>
            </Paper>
        </div>
    )
};


const Locationpage= () =>{
    let {id} = useParams();
    const [ location, setLocation ] = useState([]);
    const [ comments, setComment ] = useState([]);
    useEffect(() => {
        let url= 'http://23.21.161.150:4000/api/location/' + id ;
        // console.log(url);
        fetch(url, {
                method: "GET",
            }
        ).then(response => response.json())
        .then(
            (data) => {
                setLocation(data);
            }
        )
    },[]);

    useEffect(() => {
        let url= 'http://23.21.161.150:4000/api/comment/LocationId/' + id ;
        fetch(url
        ).then(response => response.json())
        .then(
            (data) => {
                setComment(data);
            }
        )
    },[comments]);
    
    return(
        <div id="location">
            <Navbar />
            <div className= 'row'>
                <div className= 'col'>
                    <Mapbox locations= {location} containerStyle= {containerStyle}/>
                </div>
                <div className='col'>
                    <div className= 'row'>
                        <div className='col'>
                        {
                            location.map( (loc) => 
                            <Locationinfo 
                                content= {loc}
                            />
                            )
                        }
                        </div>
                        <div className='col col-lg-2'><Favorite /></div>
                    </div>
                    <Commentbox />
                    {
                            comments.reverse().map((comment) => <Comment data= {comment} />)
                    }
                </div>
            </div>
        </div>
    );
};


export default Locationpage;