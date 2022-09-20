import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "./mapStyles.js";

function Map() {
    const libraries = ["places"];
    const MapContainerStyle = {
        width: "100vw",
        height: "100vh",
    };
    const mapCenter = {
        lat: 37.774929,
        lng: -122.419418,
    };
    const options = {
        styles: mapStyles,
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error Loading map";
    if (!isLoaded) return "Map loading";

    return (
        <div>
            <GoogleMap mapContainerStyle={MapContainerStyle} zoom={12} center={mapCenter} options={options}></GoogleMap>
            <Marker key="marker_1" position={{ lat: 37.774929, lng: -122.419418 }} />
        </div>
    );
}
export default Map;
