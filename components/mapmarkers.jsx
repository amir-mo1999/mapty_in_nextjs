import { Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import L from 'leaflet';

const markerIcon = L.icon({
  iconUrl: '/marker.png',
  iconSize: [40, 40],
  iconAnchor: [30, 40],
  popupAnchor: [-8, -40],
  shadowUrl: null,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export default function MapMarkers(props) {
  /***
   * Remove marker with input markerID from shared data and local state
   */
  function removeMarker(markerID) {
    props.setDisableAddMarker(true);
    const workout = props.workouts[props.editWorkout];
    delete workout.markers[markerID];
    props.setWorkouts({ ...props.workouts, [props.editWorkout]: workout });
  }

  /***
   * updates the shared data for the markers whenever the marker is dragged (only at drag end)
   */
  function onMarkerDragend(e) {
    // get id of marker
    const markerID = e.target.options.markerID;
    // get new coordinates
    const newlatlng = e.target._latlng;
    const workout = props.workouts[props.editWorkout];
    workout.markers[markerID] = newlatlng;
    props.setWorkouts({ ...props.workouts, [props.editWorkout]: workout });
  }

  return (
    <div>
      {Object.keys(props.workouts).map(workoutKey =>
        Object.keys(props.workouts[workoutKey].markers).map(markerKey => (
          <Marker
            icon={markerIcon}
            draggable={props.editWorkout == workoutKey ? true : false}
            markerID={markerKey}
            key={markerKey}
            position={props.workouts[workoutKey].markers[markerKey]}
            eventHandlers={{
              dragend: e => {
                onMarkerDragend(e);
              },
              // theres this weird bug that makes the map panning stop when the popup opens, here a not so optimal work around
              click: e => {
                if (props.editWorkout == -1) {
                  props.setHighlightWorkout(workoutKey);
                  e.target.off('click');
                  props.setDisableAddMarker(true);
                  props.setMapFocus([true, e.target.getLatLng()]);
                  e.target.openPopup();
                } else {
                  e.target.on('click', () => e.target.openPopup());
                }
              },
              mouseover: e => {
                e.target.openPopup();
              },
            }}
          >
            {workoutKey == props.editWorkout ? (
              <Popup>
                <button
                  className="popup-button"
                  onClick={() => removeMarker(markerKey)}
                >
                  Delete
                </button>
              </Popup>
            ) : (
              <Popup>
                {props.workouts[workoutKey].workoutType +
                  ' on ' +
                  props.workouts[workoutKey].workoutDate}
              </Popup>
            )}
          </Marker>
        ))
      )}
    </div>
  );
}
