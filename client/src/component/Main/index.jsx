/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import styles from "./styles.module.css";
import React from 'react';
import Mappage from "../Map";
import Navbar from "./navbar";


const Main = () => {
	return (
		<div className={styles.main_container}>
			<Navbar />
			<Mappage />
		</div>
	);
};

export default Main;
