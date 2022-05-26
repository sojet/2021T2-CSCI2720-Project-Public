/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import React, { useState, useEffect, useCallback } from 'react';
import MUIDataTable from "mui-datatables";


const UserTable = ()=>{
    const [ user, setUser ] = useState([]);

    const users = useCallback(() => {
        let url= 'http://23.21.161.150:4000/api/admin/user';

        fetch(url).then(response => response.json())
        .then(
          (data) => {
            setUser(data);
          }
        ).catch(
          (err) => {
            console.log(err);
          }
        );
    },[user]);

    useEffect(() => {users();}, [users]);

    // const columns = ["Name", "Latitude", "Longitude"];
    const columns = [
      {
        name: "firstName",
        label: "FirstName",
        options: {},
      },
      {
        name: "lastName",
        label: "LastName",
        options:{}
      },
      {
        name: "email",
        label: "Email",
        options: {},
      },
      {
        name: "username",
        label: "Username",
        options: {},
      }
    ];
    
    const options = {
        responsive: 'standard',
        print: false,
        download: false,
        viewColumns: false,
        filter: true,
        selectableRowsHideCheckboxes: true,
        filterType: 'textField',
        rowsPerPage: 15,
    };

    return (
        <MUIDataTable
        title={"User List"}
        data={user}
        columns={columns}
        options={options}
        />)
}

export default UserTable;