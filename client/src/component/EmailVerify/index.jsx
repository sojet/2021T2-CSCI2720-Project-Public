/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";
import React from 'react';


const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://23.21.161.150:4000/api/signup/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log("data is" + data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <Fragment>
            {validUrl ? (
                <div className={styles.container}>
                    <img src={success} alt="success_img" className={styles.success_img} />
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <button className={styles.green_btn}>Login</button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found Please try again</h1>
            )}
        </Fragment>
    );
};

export default EmailVerify;