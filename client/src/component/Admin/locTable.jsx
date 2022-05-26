/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import React, { useState, useEffect, useCallback } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';


const LocTable= ()=>{
    const [ location, setLocation ] = useState([]);

    const locations= useCallback(() => {
        let url= 'http://23.21.161.150:4000/api/location/';

        fetch(url).then(response => response.json())
        .then(
          (data) => {
            setLocation(data);
          }
        ).catch(
          (err) => {
            console.log(err);
          }
        );
    },[location]);

    useEffect(() => {
        locations();
      }, [locations]);

    // const columns = ["Name", "Latitude", "Longitude"];
    const columns = [
      {
        name: "Id",
        label: "ID",
        options: {},
      },
      {
        name: "Name",
        options:{
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Link to={{pathname: "/location/" + tableMeta.rowData[0]}}>
                {value}
              </Link>
            )
          }
        }
      },
      {
        name: "Latitude",
        label: "Latitude",
        options: {},
      },
      {
        name: "Longitude",
        label: "Longitude",
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
        rowsPerPage: 10,
    };

    return (
        <MUIDataTable
        title={"Location List"}
        data={location}
        columns={columns}
        options={options}
        />)
}

export default LocTable;