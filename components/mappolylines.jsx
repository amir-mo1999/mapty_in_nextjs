import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { decode } from '@googlemaps/polyline-codec';
const isEqual = require('lodash.isequal');

/***
 * Turns a list of longitude, latitude pairs into a string that can be passed to the OSRM API
 */
function latLngToString(latLngList) {
  let latLngString = '';
  latLngList.forEach(element => {
    latLngString += [element.lng, element.lat].toString() + ';';
  });

  latLngString = latLngString.slice(0, -1);
  return latLngString;
}

// calls the OSRM API and returns the response as promise
async function fetchPolyline(url) {
  const response = await fetch(url);
  return await response.json();
}

// calls the open route service with a given list of coordinates and returns distance and geometry
async function fetchRouteData(coordinates) {
  const headers = new Headers();

  headers.append(
    'Authorization',
    '5b3ce3597851110001cf6248c31c4e81e9f2452faf9ed8c333dca4d2'
  );
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append(
    'Accept',
    'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
  );

  const request = new Request(
    'https://api.openrouteservice.org/v2/directions/foot-walking',
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        coordinates: latLngToListOfLists(coordinates),
      }),
    }
  );

  const response = (await fetch(request)).json();
  const content = await response.then(x => x);
  const geometry = content['routes'][0]['geometry'];
  const distance = content['routes'][0]['summary']['distance'];

  return [geometry, distance];
}

// turns the list of latlng objects to a list of latlng lists
function latLngToListOfLists(latLngList) {
  let latLng = [];
  latLngList.forEach(x => latLng.push([x.lng, x.lat]));
  return latLng;
}

let lastMarkers = {};
let currentMarkers = {};
/***
 * Sets the geometry element in the local state according to the current markers
 */
function setGeometry(props) {
  if (props.workouts[props.editWorkout] === undefined) {
    return;
  }

  if (props.workouts[props.editWorkout].markers === undefined) {
    return;
  }

  currentMarkers = { ...props.workouts[props.editWorkout].markers };
  if (isEqual(lastMarkers, currentMarkers)) {
    return;
  }
  lastMarkers = { ...props.workouts[props.editWorkout].markers };

  const workout = props.workouts[props.editWorkout];
  // only call the api and set a polyline if at least two markers are present
  if (Object.keys(workout.markers).length >= 2) {
    fetchRouteData(Object.values(workout.markers)).then(x => console.log(x));

    fetchRouteData(Object.values(workout.markers))
      .then(res => {
        const geometry = res[0];
        const distance = res[1];

        props.setWorkouts({
          ...props.workouts,
          [props.editWorkout]: {
            ...props.workouts[props.editWorkout],
            ...{ geometry: geometry },
            ...{ distance: distance },
          },
        });
      })
      .catch(err => console.log(err));
  } else {
    props.setWorkouts({
      ...props.workouts,
      [props.editWorkout]: {
        ...props.workouts[props.editWorkout],
        ...{ geometry: '' },
        ...{ distance: 0 },
      },
    });
  }
}

const lineColor = '#b30000';
const lineOpacity = 0.6;
const highlightOpactiy = 1;
const lineWeight = 3;
const highlightWeight = 3.5;

export default function MapPolylines(props) {
  useEffect(() => setGeometry(props), [props.workouts]);
  const [localHighlightWorkout, setLocalHighlightWorkout] = useState(0);
  useEffect(
    () => setLocalHighlightWorkout(props.highlightWorkout),
    [props.highlightWorkout]
  );
  useEffect(() => {
    if (!(props.workouts[localHighlightWorkout] === undefined)) {
      props.setHighlightWorkout(localHighlightWorkout);
    }
  }, [localHighlightWorkout]);

  return (
    <div>
      {Object.keys(props.workouts).map(workoutKey =>
        workoutKey != props.highlightWorkout ? (
          <Polyline
            eventHandlers={{
              click: () => setLocalHighlightWorkout(workoutKey),
            }}
            positions={decode(props.workouts[workoutKey].geometry)}
            color={lineColor}
            opacity={lineOpacity}
            weight={lineWeight}
            key={workoutKey}
          />
        ) : (
          ''
        )
      )}

      {props.highlightWorkout != -1 ? (
        <Polyline
          positions={decode(props.workouts[props.highlightWorkout].geometry)}
          color={lineColor}
          opacity={highlightOpactiy}
          weight={highlightWeight}
        />
      ) : (
        ''
      )}
    </div>
  );
}
