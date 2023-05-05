//import { useMap, MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { GestureHandling } from 'leaflet-gesture-handling';
import MapMarkers from './mapmarkers';
import MapPolylines from './mappolylines';
import FocusMap from './focusmap';

let autoCenterToUserLocation = true;

import AddMarkerPerClick from './addmarkerperclick';

/***
 * Helper component that centers the map to the users geolocation after loading
 */
function CenterToUserLocation() {
  if (autoCenterToUserLocation) {
    const map = useMap();
    map.locate().on('locationfound', function (e) {
      map.setView(e.latlng);
    });
    map.setZoom(13);
    autoCenterToUserLocation = false;
  }
}

function getWorkoutsAndCounterFromLocalStorage() {
  const workouts =
    localStorage.getItem('workouts') === null
      ? {}
      : JSON.parse(localStorage.getItem('workouts'));

  const workoutCounter =
    localStorage.getItem('workoutCounter') === null
      ? 0
      : Number(localStorage.getItem('workoutCounter'));
  return [workouts, workoutCounter];
}

function MapWrapper(props) {
  const [disableAddMarker, setDisableAddMarker] = useState(false);

  const workoutsAndCounter = getWorkoutsAndCounterFromLocalStorage();
  // load workouts and workout counter from local storage
  useEffect(() => {
    console.log(workoutsAndCounter);
    props.setWorkouts({ ...workoutsAndCounter[0] });
    props.setWorkoutCounter(workoutsAndCounter[1]);
  }, []);

  return (
    <div id="map" className="relative h-full w-full">
      <MapContainer
        className="w-full h-full absolute"
        center={[51.1657, 10.4515]}
        zoom={7}
        minZoom={2}
        zoomDelta={1}
        wheelPxPerZoomLevel={60}
        gestureHandling={true}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW1pci1tbzE5OTkiLCJhIjoiY2xoMTA3cnhwMHlodjNkcG4waDdqcGh2dCJ9.dCjkjQd45OAjmquX1H-IRQ`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <MapMarkers
          workouts={props.workouts}
          setMapFocus={props.setMapFocus}
          setHighlightWorkout={props.setHighlightWorkout}
          setWorkouts={props.setWorkouts}
          setDisableAddMarker={setDisableAddMarker}
          editWorkout={props.editWorkout}
        />
        <MapPolylines
          highlightWorkout={props.highlightWorkout}
          setHighlightWorkout={props.setHighlightWorkout}
          workouts={props.workouts}
          setWorkouts={props.setWorkouts}
          editWorkout={props.editWorkout}
        />
        <AddMarkerPerClick
          setHighlightWorkout={props.setHighlightWorkout}
          workouts={props.workouts}
          setWorkouts={props.setWorkouts}
          editWorkout={props.editWorkout}
          disableAddMarker={disableAddMarker}
          setDisableAddMarker={setDisableAddMarker}
        ></AddMarkerPerClick>
        <CenterToUserLocation />
        <FocusMap mapFocus={props.mapFocus} setMapFocus={props.setMapFocus} />
      </MapContainer>
    </div>
  );
}

export default MapWrapper;
