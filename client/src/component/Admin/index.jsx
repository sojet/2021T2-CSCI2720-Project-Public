/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import styles from "./styles.module.css";
import React, { useState, useCallback, useEffect} from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import LocTable from "./locTable.jsx";


const UpdateLocation= () =>{
    const [location, setLocation] = useState([]);
    const [msg2, setMsg2] = useState("");
    const defaultValues= {
        Id: "",
    };
    const locations= useCallback(() => {
        let url= 'http://23.21.161.150/api/location/';

        fetch(url).then(response => response.json())
        .then(
          (data) => {
            setLocation(data);
            // console.log(data);
          }
        ).catch(
          (err) => {
            console.log(err);
          }
        );
    });

    useEffect(() => {
        locations();
      }, [location]);

    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        let url= "http://23.21.161.150/api/admin/refresh/" + formValues.Id;

        fetch(url, {
            method: "put",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then((data) => {
           setMsg2("The following location is updated: \n" + 
                    "Location: " + data.Name + "\n" + 
                    "Last Updated time: " + data.Last_updated + "\n") 
                   
        });

    };

    return (
        <div>
            <h4>Update a location</h4>
            <TextField
            id="Id-input"
            select
            name="Id"
            label="Select a location"
            value={formValues.Id}
            onChange={handleInputChange}
            helperText="Please select a category"
            variant="standard"
            >
                {
                location.map((option) => (
                <MenuItem key={option.Name} value={option.Id}>
                {option.Id}: {option.Name}
                </MenuItem>
                ))
                }
            </TextField>
            {msg2 && <div className={styles.success_msg}>{msg2}</div>}
            <Button className="col" variant="contained" onClick={handleSubmit}>Update a location</Button>                         
        </div>
    )
};


const DeleteLocation= () =>{
    const [location, setLocation] = useState([]);
    const [msg1, setMsg1] = useState("");
    const defaultValues= {
        Id: "",
    };
    const locations= useCallback(() => {
        let url= 'http://23.21.161.150/api/location/';

        fetch(url).then(response => response.json())
        .then(
          (data) => {
            setLocation(data);
            // console.log(data);
          }
        ).catch(
          (err) => {
            console.log(err);
          }
        );
    });

    useEffect(() => {
        locations();
      }, [location]);

    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        let url= "http://23.21.161.150/api/admin/refresh/" + formValues.Id;

        fetch(url, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then((data) => {
            setMsg1("The location is deleted!");
        });

    };

    return (
        <div>
            <h4>Delete a location</h4>
            <TextField
            id="Id-input"
            select
            name="Id"
            label="Select a location"
            value={formValues.Id}
            onChange={handleInputChange}
            helperText="Please select a category"
            variant="standard"
            >
                {
                location.map((option) => (
                <MenuItem key={option.Name} value={option.Id}>
                {option.Id}: {option.Name}
                </MenuItem>
                ))
                }
            </TextField>
            {msg1 && <div className={styles.success_msg}>{msg1}</div>}
            <Button className="col" variant="contained" onClick={handleSubmit}>Delete a location</Button>                         
        </div>
    )
};


const NewLocation= () =>{
    const defaultValues = {
        loc: "",
    };
    const [msg, setMsg] = useState("");
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
        // console.log(formValues);
        console.log(JSON.stringify(formValues));
        let url= "http://23.21.161.150/api/admin/refresh";

        fetch(url, {
          method: "POST",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        })
        .then(response => {
            response.json();
        })
        .then(data => 
            {   
              //  alert('Updated');
                setMsg("Location updated successfully");
            }
        );
    };

    return (
        <div>
            <TextField 
                className="col" 
                id="loc" 
                variant= "outlined" 
                name="loc" 
                type= "text"
                label= "Location"
                onChange={handleInputChange}
                value={formValues.comment}
            />
            <br/>
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <Button className="col" variant="contained" onClick={handleSubmit}>Create new location</Button>
        </div>
    )
};

const Admin = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Userfirstname")
        localStorage.removeItem("Admin")
        window.location.replace("/");

    };

    const [msg3, setMsg3] = useState("");
    //Refresh weather data of all existing location (1.2)
    const handleRefreshAll = () =>{
        const url= 'http://23.21.161.150/api/admin/refresh';

        fetch(url)
        .then(response => response.json())
        .then((data) => {setMsg3("All Location data have been refreshed");})
        
    }


    return (
        <body className={styles.backImg}>
        <div className={styles.main_container}>
            <div className={styles.headerstyle}>
            <div class="col-md-12 col-xl-6">
                <h1>Hello,Admin </h1>
                </div>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
        
        <nav className={styles.navOutlook}>
            <ul className="navbar nav card-header">
                <li className="nav-item"><Link to="/">CRUD location data</Link></li>
                {/* <li className="nav-item"><Link to="/location">CRUD location data</Link></li> */}
                <li className="nav-item"><Link to="/user">CRUD user data</Link></li>
            </ul>
        </nav>

        <div className="container">
            <LocTable/>
            <div className="row">
                <div className={styles.page1}>
                
                <h1 className={styles.smallHeadStyle}>1. Location Data</h1>
                <h4>Create a new location</h4>
                    <NewLocation />
                    <div className="row">
                        <div className="col"><UpdateLocation /></div>
                        <div className="col"><DeleteLocation /></div>
                    </div>
                <br/>
                <h4>Refresh data for all location</h4>
                <Button onClick={handleRefreshAll}>Refresh for all Location</Button>
                {msg3 && <div className={styles.success_msg}>{msg3}</div>}
                </div> 
            </div>
        </div>
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
        </body>
    );
};

export default Admin;
