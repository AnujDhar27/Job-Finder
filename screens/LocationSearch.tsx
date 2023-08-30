import React from "react";
import MapboxPlacesAutocomplete from "react-native-mapbox-places-autocomplete";
import Config from "react-native-config";

const LocationSearch = () => {
  return (
    <MapboxPlacesAutocomplete
      id="origin"
      placeholder="Origin"
      accessToken={Config.MAPBOX_PUBLIC_TOKEN} // MAPBOX_PUBLIC_TOKEN is stored in .env root project folder
      onPlaceSelect={(data) => {
        dispatch(setOrigin(data));
        dispatch(setDestination(null));
      }}
      onClearInput={({ id }) => {
        id === "origin" && dispatch(setOrigin(null));
      }}
      countryId="id"
      containerStyle={{
        marginBottom: 12,
      }}
    />
  );
};

export default LocationSearch;