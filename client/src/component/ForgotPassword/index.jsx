/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import React from 'react';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://23.21.161.150:4000/api/password-reset`;
            const { data } = await axios.post(url, { email });
            setMsg(data.message);
            setError("");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                {msg && <div className={styles.success_msg}>{msg}</div>}
                <button type="submit" className={styles.green_btn}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;