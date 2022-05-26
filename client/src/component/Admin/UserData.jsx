/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/


import styles from "./styles.module.css";
import React from 'react';
import UserTable from "./userTable.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserData = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Userfirstname");
        localStorage.removeItem("Admin");
       window.location.href ="http://23.21.161.150";
    
    };
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",  
    });
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [msg, setMsg] = useState("");
    const [msg1, setMsg1] = useState("");
    const [msg2, setMsg2] = useState("");
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://23.21.161.150:4000/api/admin/create";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
            setError()
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg()
            }
        }
    };

    const loadUser = () => {
        console.log("Load");
        let url = 'http://23.21.161.150:4000/api/admin/user/' + document.querySelector("#rUserName").value;
        fetch(url)
        .then(response => response.json())
        .then(data => 
            {document.querySelector("#uFirstName").value = data.firstName;
                document.querySelector("#uLastName").value = data.lastName;
                document.querySelector("#uUserEmail").value = data.email;
                document.querySelector("#uUserName").value = data.username;
                document.querySelector("#uUserPW").value = data.password;
                document.querySelector("#uAdmin").checked = data.isAdmin;
                document.querySelector("#uVerified").checked = data.verified;
                console.log(data.firstName + " " + data.lastName + " " + data.username + " " + data.email)
                setMsg1("")
            } )
    }
    const updateUser = () => {
        console.log("Update");
        var statuscode;
        let uFirstName = document.querySelector("#uFirstName").value;
        let uLastName = document.querySelector("#uLastName").value;
        let uUserEmail = document.querySelector("#uUserEmail").value;
        let uUserName = document.querySelector("#uUserName").value;
        let uUserPW = document.querySelector("#uUserPW").value;
        let uAdmin = document.querySelector("#uAdmin").checked;
        let uVerified = document.querySelector("#uVerified").checked;
        
        let rUserName = document.querySelector("#rUserName").value;
            console.log(uFirstName + ' ' + uLastName + " " + uUserName + ' ' + uUserEmail);
        
        let bodytext = "uFirstName=" + encodeURIComponent(uFirstName);
            bodytext += "&uLastName=" + encodeURIComponent(uLastName);
            bodytext += "&uUserEmail=" + encodeURIComponent(uUserEmail);
            bodytext += "&uUserName=" + encodeURIComponent(uUserName);
            bodytext += "&uUserPW=" + encodeURIComponent(uUserPW);
            bodytext += "&uAdmin=" + encodeURIComponent(uAdmin);
            bodytext += "&uVerified=" + encodeURIComponent(uVerified);

        
        fetch("http://23.21.161.150:4000/api/admin/user/" + rUserName, {
            method: "PUT",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodytext})
        .then(res => {res.json()
            statuscode = res.status})
        .then((data) => {
            console.log(statuscode)
        if (statuscode==204)
        {
            setError1("The password and username length of 4–20 characters are required")
            setMsg1("")
        }else{
            setMsg1("User update successfully")
            setError1("")
        }
    });
        
    }

    const deleteUser = () => {
        let url = 'http://23.21.161.150:4000/api/admin/user/' + document.querySelector("#dUserName").value;

    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    }
    console.log("Delete");
    var statuscode;
    fetch(url, options)
    .then(response => {response.json()
       statuscode = response.status})
    .then(data => {
        console.log(statuscode)
        if (statuscode==204)
        {
            setError2("User Not Found!")
            setMsg2("")
        }else{
        setMsg2("User deleted successfully")
        setError2("")
    }
    });
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
            <li class="nav-item"><Link to="/">CRUD location data</Link></li>
                {/* <li class="nav-item"><Link to="/location">CRUD location data</Link></li> */}
                <li class="nav-item"><Link to="/user">CRUD user data</Link></li>
           </ul>
           </nav>
           <div class="container">
           <h1> 2. User Data</h1>
            <h2>User data (R)</h2>  
            <UserTable/>
            </div>   
            <div class="container-md">
            <div class="row">
            <div class="col-sm" className={styles.page2First}> 
            <h2 className={styles.smallHeadStyle}>Create new User data (C)</h2>
            <form  onSubmit={handleSubmit}>
            <label for="cFirstName">First name</label>
            <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={data.firstName} className={styles.input} required />
            <br/>
            <label for="cLastName">Last Name</label>
            <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={data.lastName} className={styles.input} required/>
            <br/>
            <label for="cUserEmail">Email</label>
            <input type="email" placeholder="Email"name="email" onChange={handleChange} value={data.email} className={styles.input}  required/>
            <br/>
            <label for="cUserName">User Name</label>
            <input type="text" placeholder="UserName" name="username" onChange={handleChange} value={data.username} className={styles.input} required/>
            <br/>
            <label for="cUserPW">Password</label>
            <input type="password" placeholder="Atleast four  characters are required" name="password"onChange={handleChange}value={data.password} className={styles.input} required/>
            <br/> 
             <button type="submit" >Create new User data</button>
             <br/>
             {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            </form>
            </div>
            <div class="col-sm" className={styles.page2Second}> 

            <h2 className={styles.smallHeadStyle}>Update User details (U)</h2>
                <label for="rUserName">User Name</label>
                <input type="text" id="rUserName" name="rUserName" className={styles.input} required/>
                <br/>
                <button type="button" onClick={() => loadUser()}>Load Event</button>
                <br/>

            <form>
            <label for="uFirstName">First name</label>
                <input type="text" id="uFirstName" name="uFirstName" className={styles.input}/>
                <br/>
                <label for="uLastName">Last Name</label>
                <input type="text" id="uLastName" name="uLastName" className={styles.input}/>
                <br/>
                <label for="uUserEmail">Email</label>
                <input type="email" id="uUserEmail" name="uUserEmail" className={styles.input}/>
                <br/>
                <label for="uUserName">Username</label>
                <input type="text" id="uUserName" name="uUserName" className={styles.input}/>
                <br/>
                <label for="uUserPW">Password </label>
                <input type="text" id="uUserPW" name="uUserPW" className={styles.input}/>
                <br/>
                <label for="uAdmin">Admin?</label>
                <input type="checkbox" id="uAdmin" name="uAdmin" value="true"/>
                <br/>
                <label for="uVerified">Verified?</label>
                <input type="checkbox" id="uVerified" name="uVerified" value="true"/>
                <br/>
                <button type="button" onClick={()=> updateUser()}>Update</button>
                {error1 && <div className={styles.error_msg}>{error1}</div>}
                {msg1 && <div className={styles.success_msg}>{msg1}</div>}
            </form>
            
            </div>



            <div class="col-sm" className={styles.page2Third}> 
            <h2 className={styles.smallHeadStyle}>Delete User data (D)</h2>
            <label for="dUserName">User Name</label>
                <input type="text" id="dUserName" name="dUserName" className={styles.input} required/>
                <br/>
            <button onClick={()=> deleteUser()}>Delete User Data</button>
            {error2 && <div className={styles.error_msg}>{error2}</div>}
            {msg2 && <div className={styles.success_msg}>{msg2}</div>}
            </div>
            </div>
        </div>
        </body>
    );
};

export default UserData;
