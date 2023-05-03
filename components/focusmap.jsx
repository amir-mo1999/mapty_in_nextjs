import { useMap } from 'react-leaflet';

export default function FocusMap(props) {
  const map = useMap();
  if (props.mapFocus[0]) {
    const latlng = props.mapFocus[1];
    map.setView(latlng, map.getZoom(), { animate: true, duration: 0.9 });
    props.setMapFocus([false, { ...latlng }]);
  }
}
