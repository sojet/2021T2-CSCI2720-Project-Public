/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import React, { useState, useCallback, useEffect } from 'react';
import Mapbox from './map';
import LocationTable from './table';


const containerStyle = {
    width: '100%',
    height: '100vh'
};


const Mappage=(props) =>{
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
    },[]);

    useEffect(() => {
        locations();
    }, [locations]);

    return(
        <div>
            <div className='row'>
                <div className='col'>
                    <Mapbox locations= {location} containerStyle= {containerStyle}/>
                </div>
                <div className='col'>
                    <LocationTable />
                </div>
            </div>
        </div>
    );
}

export default Mappage;