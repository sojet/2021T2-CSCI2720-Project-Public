/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

import { React, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
 

const center = {
    lat: 22.3193,
    lng: 114.1694
};


const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 1
}


const MapLabel= (props) =>{
    const [selectedElement, setSelectedElement] = useState(null);

    const position = {
        lat: props.Latitude,
        lng: props.Longitude
    };

    return(
        <div key={props.id}>
            <Marker
                position={position}
                onClick= { (props) => {
                    if (selectedElement != null){
                        setSelectedElement(null);
                        setSelectedElement(-1);
                    }
                    else if (selectedElement ==null){
                        setSelectedElement(-1);
                    }
                }
                }
            />
            { selectedElement ? (<InfoWindow 
                    position={position} 
                >
                    <div style={divStyle}>
                        <Link to={{pathname: "/location/" + props.id}}>{props.name}</Link> 
                    </div>
                </InfoWindow>) : null
            }
        </div>
    );
};


const Mapbox=(props) => {
    var locations= props.locations;

    return (
        <LoadScript
          googleMapsApiKey=""
        >
            <GoogleMap
            mapContainerStyle={props.containerStyle}
            center={center}
            zoom={3}
            >
                { locations.map((location) => <MapLabel id={location.Id} name={location.Name} Latitude= {location.Latitude} Longitude= {location.Longitude}/>)}
            </GoogleMap>
        </LoadScript>
      );
}


export default Mapbox;