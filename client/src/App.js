/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/


import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";


import Admin from "./component/Admin"
import EmailVerify from "./component/EmailVerify";
import ForgotPassword from "./component/ForgotPassword";
import ForuserName from "./component/ForgotUserName";
import Locationpage from "./component/Location";
import Login from "./component/Login";
import Main from "./component/Main";
import PasswordReset from "./component/PasswordReset";
import Signup from "./component/PasswordReset/Signup";
import UserData from "./component/Admin/UserData";


function App() {
	const user = localStorage.getItem("token");
	const admin = localStorage.getItem("Admin");

	console.log(admin)
	return (
		<Routes>
			{admin && <Route path="/" exact element={<Admin />} />}
			{admin && <Route path="/user" exact element={<UserData />} />}
			{user && <Route path="/" exact element={<Main />} />}
			{(admin || user )&& <Route path="/location/:id" element={<Locationpage />} />}
			<Route path="/home" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/home" />} />
			<Route path="/api/signup/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/forgot-username" element={<ForuserName />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			
		</Routes>
	);
}

export default App;