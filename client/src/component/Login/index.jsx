/*
The login and nodemailer function is referenced from https://www.youtube.com/watch?v=HGgyd1bYWsE
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


const Login = () => {
	const [data, setData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {

		e.preventDefault();
		try {
			const url = "http://23.21.161.150:4000/api/auth";
			const { data: res } = await axios.post(url, data);
			console.log("Response.data is: " + JSON.stringify(res.userfirstname))
			localStorage.setItem("token", res.data);
			localStorage.setItem("Userfirstname", res.userfirstname)
			localStorage.setItem("Username", res.username)
			localStorage.setItem("favouriteLocation", res.favouriteLocation);
			if (res.Admin === true) {
				localStorage.setItem("Admin", res.Admin)
			}
			window.location = "/";
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
		
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>

						<Link to="/forgot-username" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Username ?</p>
						</Link>
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/home">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	
	);
};

export default Login;
