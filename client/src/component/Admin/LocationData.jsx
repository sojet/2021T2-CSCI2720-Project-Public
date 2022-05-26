/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import styles from "./styles.module.css";
import React from 'react';
import LocTable from "./locTable.jsx";
import { Link } from "react-router-dom";


const LocationData = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Userfirstname");
        localStorage.removeItem("Admin");
        window.location.href ="http://23.21.161.150";
    
    };

    //Func for Loading Location data for update (2.3.1)
    const loadLoc =()=>{
        console.log("Load");
        let url = 'http://23.21.161.150:4000/api/admin/loc/' + document.querySelector("#rLocName").value;
        fetch(url)
        .then(response => response.json())
        .then(data => {document.querySelector("#uLocId").value = data.Id;
                document.querySelector("#uLocName").value = data.Name;
                document.querySelector("#uLat").value = data.Latitude;
                document.querySelector("#uLon").value = data.Longitude;
                console.log(data.Id + " " + data.Name + " " + data.Latitude + " " + data.Longitude)
            } )
        /* 
        console.log("Load");
        let eid = document.querySelector("#eventid").value;
        console.log("eid = " + eid);
        
        fetch("http://localhost:4000/event/" + eid)
            .then(res=>res.json())
            .then(data=> {document.querySelector("#eventname").value = data.name;
                document.querySelector("#eventloc").value = data.loc.locId;
                document.querySelector("#eventquota").value = data.quota;
            }) 
        */              
    }

    //Func for updating Location data (2.3.2)
    const updateLoc = () => {
        console.log("Update");
        let newId = document.querySelector("#uLocId").value;
        let newName = document.querySelector("#uLocName").value;
        let newLat = document.querySelector("#uLat").value;
        let newLon = document.querySelector("#uLon").value;
        let ogName = document.querySelector("#rLocName").value;
            console.log(newId + newName + newLat + newLon + ogName);
        
        let bodytext = "Id=" + encodeURIComponent(newId);
            bodytext += "&Name=" + encodeURIComponent(newName);
            bodytext += "&Lat=" + encodeURIComponent(newLat);
            bodytext += "&Lon=" + encodeURIComponent(newLon);
            bodytext += "&OgName=" + encodeURIComponent(ogName);

        
        fetch("http://23.21.161.150:4000/api/admin/loc/" + ogName, {
            method: "PUT",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodytext})
        .then(res => res.text())
        .then(data => console.log(data));
    }

    const deleteLoc = () =>{
        let url = 'http://23.21.161.150:4000/api/admin/loc/' + document.querySelector("#dLocName").value;

        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            //body: JSON.stringify()
        }
        console.log("Delete");

        fetch(url, options)
        .then(response => response.json())
        .then((data) => {console.log(data);})
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
            <ul class="navbar nav card-header">
        <li class="nav-item"><Link to="/">CRUD loctaion data</Link></li>
        {/* <li class="nav-item"><Link to="/location">CRUD location data</Link></li> */}
        <li class="nav-item"><Link to="/user">CRUD user data</Link></li>
           </ul>
           </nav>
           <div class="container">
            <h1>2. Location Data</h1>
            <h2>Location data (R)</h2>            
            <LocTable/>
            </div>
            <div class="container-md">
            <div class="row">
            <div class="col-sm" className={styles.page2First}> 
            <h2 className={styles.smallHeadStyle}>Create new location data (C)</h2>
            <p><i>(*Details will be changed later)</i></p>
            <form action="http://23.21.161.150:4000/api/admin/loc/" method="post">
                
                <label for="cLocId">Location Id</label>
                <input type="text" id="cLocId" name="cLocId"/>
                
                <br/>            
                <label for="cLocName">Location name</label>
                <input type="text" id="cLocName" name="cLocName"/>
                <br/>
                <label for="cLat">Latitude</label>
                <input type="text" id="cLat" name="cLat"/>
                <br/>
                <label for="cLon">Longitude</label>
                <input type="text" id="cLon" name="cLon"/>
                <br/>
                <button type="submit" onClick={() => window.location.reload()}>Create new Location data</button>
            </form>
           </div>

           <div class="col-sm" className={styles.page2Second}> 
            <h2 className={styles.smallHeadStyle}>Update Location details (U)</h2>
                <label for="rLocName">Location Name</label>
                <input type="text" id="rLocName" name="rLocName"/>
                <br/>
                <button type="button" onClick={() => loadLoc()}>Load Event</button>
                <br/>

            <form>
                <label for="uLocId">Location Id</label>
                <input type="text" id="uLocId" name="uLocId"/>
                <br/>
                <label for="uLocName">Location Name</label>
                <input type="text" id="uLocName" name="uLocName"/>
                <br/>
                <label for="uLat">Latitude</label>
                <input type="text" id="uLat" name="uLat"/>
                <br/>
                <label for="uLon">Longitude</label>
                <input type="text" id="uLon" name="uLon"/>
                <br/>
                <button type="button" onClick={() => updateLoc()}>Update Event</button>
            </form>
            </div>
            <div class="col-sm" className={styles.page2Third}>
            <h2 className={styles.smallHeadStyle}>Delete Location details (D)</h2>
            <label for="dLocName">Location name</label>
                <input type="text" id="dLocName" name="dLocName"/>
                <br/>
            <button onClick={() => deleteLoc()}>Delete location data</button>
            </div> 
            </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </body>
    );
};

export default LocationData;
