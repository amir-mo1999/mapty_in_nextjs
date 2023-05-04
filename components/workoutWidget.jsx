function deleteWorkout(props) {
  const workouts = props.workouts;
  delete workouts[props.workoutKey];
  props.setWorkouts({ ...workouts });
}

function formatDistance(d) {
  if (d >= 1000) {
    return [(+(d / 1000).toFixed(1)).toString(), 'km'];
  } else {
    return [d.toFixed(0), 'm'];
  }
}

function zoomToAndHighlightWorkout(props) {
  const markers = props.workouts[props.workoutKey].markers;
  const markerKeys = Object.keys(markers).map(x => Number(x));
  const minMarkerKey = Math.min(...markerKeys);
  const firstMarker = markers[minMarkerKey];

  props.setHighlightWorkout(props.workoutKey);
  props.setMapFocus([true, { ...firstMarker }]);
}

function enableEdit(props) {
  props.setEditWorkout(props.workoutKey);
  props.setHighlightWorkout(props.workoutKey);
}

export default function WorkoutWidget(props) {
  return (
    <div className="">
      <li
        className={
          'workout ' +
          (props.workouts[props.workoutKey].workoutType == 'running'
            ? 'workout--running'
            : 'workout--cycling')
        }
        key={props.workoutKey}
        onClick={() =>
          zoomToAndHighlightWorkout(props.workouts[props.workoutKey].type)
        }
      >
        <h2 className="workout__title row-start-1 row-span-1 col-start1 col-span-1">
          {props.workouts[props.workoutKey].workoutType}
        </h2>

        <div className="workout__details row-start-2 row-span-1 col-span-1">
          <span className="workout__icon">🏃‍♂️</span>
          <span className="workout__value">
            {formatDistance(props.workouts[props.workoutKey].distance)[0]}
          </span>
          <span className="workout__unit">
            {formatDistance(props.workouts[props.workoutKey].distance)[1]}
          </span>
        </div>
        <div className="workout__details row-start-2 row-span-1 col-span-1">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">
            {props.workouts[props.workoutKey].duration}
          </span>
          <span className="workout__unit">min</span>
        </div>
        <div className="workout__details row-start-2 row-span-1 col-span-1">
          <span className="workout__icon">⚡️</span>
          <span className="workout__value">
            {props.workouts[props.workoutKey].cadence}
          </span>
          <span className="workout__unit">min/km</span>
        </div>
        <div className="workout__details row-start-2 row-span-1  col-span-1">
          <span className="workout__icon">🦶🏼</span>
          <span className="workout__value">
            {props.workouts[props.workoutKey].elevation}
          </span>
          <span className="workout__unit">spm</span>
        </div>

        <div className="row-start-1 row-span-1 col-start-4 col-span-1 ml-auto mr-0">
          <button onClick={() => enableEdit(props)}>...</button>
          <button onClick={() => deleteWorkout(props)}>x</button>
        </div>
      </li>
    </div>
  );
}
