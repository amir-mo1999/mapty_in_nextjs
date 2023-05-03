import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import L from 'leaflet';

const markerIcon = L.icon({
  iconUrl: '/marker.png',
  iconSize: [30, 30],
  iconAnchor: [14, 25],
  popupAnchor: [-3, -76],
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
            }}
          >
            {workoutKey == props.editWorkout ? (
              <Popup>
                Hey
                <button
                  onClick={() => removeMarker(markerKey)}
                  className=" border-4 border-gray-700"
                ></button>
              </Popup>
            ) : (
              ''
            )}
          </Marker>
        ))
      )}
    </div>
  );
}
