import { useMap } from 'react-leaflet';

export default function FocusMap(props) {
  const map = useMap();
  if (props.mapFocus[0] && props.editWorkout == -1) {
    console.log(props.editWorkout == -1);
    const latlng = props.mapFocus[1];
    map.setView(latlng, map.getZoom(), {
      animate: true,
      duration: 0,
    });
  }
}
