/* this sign up and jsonwebtoken and the nodemailer is referenced to this youtube link https://www.youtube.com/watch?v=HGgyd1bYWsE&t=1656s
but the nodemailer is working fine on localhost but not on server    
*/
/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from 'react';


const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://23.21.161.150:4000/api/signup";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>CSCI2720</h1>
                    <h1>Weather System</h1>
                    <h3>Welcome Back</h3>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="UserName"
                            name="username"
                            onChange={handleChange}
                            value={data.username}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Atleast four  characters are required"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    );
};

export default Signup;