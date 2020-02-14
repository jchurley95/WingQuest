import React from 'react';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import styled from 'styled-components';

const MapWrapper = styled.div`
    height: 400px;
    width: 400px;
    margin: 20px;
`

const mapStyle = {
    width: '400px',
    height: '400px'
}

const GoogleMap = (props) => {
    // let bounds = new props.google.maps.LatLngBounds();
    // for (var i = 0; i < props.locations.length; i++) {
    //     console.log(props.locations[i])
    //     bounds.extend(props.locations[i].points);
    // }
    let initialCenterPoint = props.locations.length > 1 ? props.locations[0].points : {lat: "33.7490", lng: "84.3880"};
    return (
        <MapWrapper>
            <Map 
                google={props.google} 
                // zoom={10}
                // bounds={bounds}
                initialCenter={props.locations[0].points}
                style={mapStyle}
            >
            {/* {
                props.locations.map((location, index) => {
                    return ( */}
                        <Marker
                            // key={index}
                            title={props.locations[0].name}
                            name={props.locations[0].name}
                            position={{lat: props.locations[0].points.lat, lng: props.locations[0].points.lng}} 
                        />
                    {/* )
                })
            } */}
            </Map>
        </MapWrapper>
    );
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCSobo_XT_KbUTz3zXu_JnvEQaFQqKl6lk")
})(GoogleMap)