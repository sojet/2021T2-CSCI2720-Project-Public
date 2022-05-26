/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/
import {useMatch, useParams, useLocation, useState, useRef} from 'react';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";


function logoutAction(){
  console.log("LOL");
  // if(confirm("Are you sure you want to log out?")==true){
  //   //logout function
  // }
}

function NoMatch() {
    let location = useLocation();
    return (
    <div>
    <h3>
    No match for <code>{location.pathname}</code>
    </h3>
    </div>
    );
    }
  
  function File() {
    let { id } = useParams();
    return (
    <div>
    <h3>ID: {id}</h3>
    </div>
    );
    }
  
  
  function LongLink({label, to}) {
    let match = useMatch({
    path: to
    });
    return (
    <li className={match ? "active" : ""}>
    {match && "> "}
    <Link to={to}>{label}</Link>
    </li>
    );
    }
  
  class TEST2 extends React.Component {
    locAction(){
      console.log(123);
      let locOption = document.getElementById("locAction").value;
      console.log(locOption);
      if(locOption=="create"){
           //create function
      }
      else if(locOption=="read"){
        // read function
      }
      else if(locOption=="update"){
        //update function
        alert("The location data is updated!");
      }
      else {
        // if(confirm("Are you sure that you want to delete this location's data?")==true){
        //   console.log("Confirm delete location");
        //   // delete function
        //   alert("The location data is deleted.");
        // }
        console.log('hi')
;      }
    }
    userAction(){
      console.log(123);
      let userOption = document.getElementById("userAction").value;
      console.log(userOption);
      if(userOption=="create"){
           //create function
           alert("User created!")
      }
      else if(userOption=="read"){
        // read function
      }
      else if(userOption=="update"){
        //update function
        alert("The user data is updated!");
      }
      else {
        // if(confirm("Are you sure that you want to delete this user's data?")==true){
        //   console.log("Confirm delete user");
        //   // delete function
        //   alert("The user's data is deleted.");
        // }
        console.log('hi');
      }
    }

    render() {
      return (
        <label>
        CRUD the stored location data:
        <select name="action" id="locAction">
          <option value="create">Create</option>
          <option value="read">Read</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
        <body>
            &nbsp; Latitude: <input type="text" name="data"/>&nbsp;
            longtitude: <input type="text" name="data"/>&nbsp;
            Location name: <input type="text" name="data"/><br/>
        </body>
        <button onClick={this.locAction}>Confirm action</button><br /><br />
        CRUD the user data: 
        <select name="action" id="userAction">
          <option value="create">Create</option>
          <option value="read">Read</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
        <body>
            &nbsp; Username: <input type="text" name="data"/>&nbsp;
            Password: <input type="text" name="data"/><br/>
        </body>
        <button onClick={this.userAction}>Confirm action</button><br /><br />
      </label>
      
      )
    }
  }

class Title extends React.Component {
    render() {
    return (
    <header className="bg-warning">
    <h1 className="display-4 textcenter">{this.props.name}</h1>
    </header>
    );
    }
    }


export default TEST2;
