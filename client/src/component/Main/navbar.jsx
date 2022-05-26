/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import styles from "./styles.module.css";
import React from 'react';


const Navbar = () =>{
    const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("Userfirstname");
        localStorage.removeItem("Username");
		localStorage.removeItem("Admin");
        localStorage.removeItem("favouriteLocation");
     //   window.location.reload();
		window.location.replace("/");
	};

	const Username = localStorage.getItem("Userfirstname");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" id= {styles.navbar}>
            <h1 className="navbar-brand">Hello, {Username}</h1>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                </div>
            </div>
            <button id={styles.white_btn} className="align-items-end" onClick={handleLogout}>         
                Logout     
            </button>
        </nav>
    );
};


export default Navbar;