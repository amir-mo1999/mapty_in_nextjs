import { useMapEvent, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';

let disableAddMarker = false;

function AddMarkerPerClick(props) {
  const map = useMapEvent({
    click(e) {
      // if it equals -1 that means no workout is currently being edited
      if (!(props.editWorkout == -1)) {
        // work around so that no marker is added when closing a popup
        if (!props.disableAddMarker) {
          // set the workout thats being edited
          const workout = props.workouts[props.editWorkout];
          // add the new marker
          workout.markers[workout.markerCounter] = e.latlng;
          // increase marker counter
          workout.markerCounter += 1;
          // set workout state
          props.setWorkouts({
            ...props.workouts,
            [props.editWorkout]: workout,
          });
        } else {
          props.setDisableAddMarker(false);
        }
      } else {
        props.setHighlightWorkout(-1);
      }
    },
  });
  return '';
}

export default AddMarkerPerClick;
