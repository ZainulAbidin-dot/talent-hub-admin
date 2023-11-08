import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { useGetGeographyQuery } from 'state/api';

const LiveRides = (props) => {

  const theme = useTheme(); // Assuming you pass the theme as a prop
  const { data } = useGetGeographyQuery();

  const [mapState, setMapState] = React.useState({
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
  });

  const onMarkerClick = (props, marker) => {
    console.log("Opening Info Window");
    setMapState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  const onInfoWindowClose = () => {
    console.log("Closing Info Window");
    setMapState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LIVE RIDES" subtitle="Find where your rides are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
        style={{ position: 'relative' }}
      >
        <Map
          google={props.google}
          zoom={11}
          initialCenter={{
            lat: 24.958, // Specify the initial latitude
            lng: 67.057, // Specify the initial longitude
          }}
        >
          <Marker
            onClick={() => onMarkerClick("Current location", { lat: 24.958425, lng: 67.057989 })}
            name={"Current location"}
            position={{ lat: 24.958425, lng: 67.057989 }} // Specify marker position
          />
          <InfoWindow
            onClose={onInfoWindowClose}
            marker={mapState.activeMarker}
            visible={mapState.showingInfoWindow}
          >
            <div>
              <h1>{mapState.selectedPlace?.name ?? 'Default'}</h1>
            </div>
          </InfoWindow>
        </Map>
      </Box>
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBVS4hNSxdpKlxpHWrbe02IJ0tQjhQBdhQ",
})(LiveRides);
