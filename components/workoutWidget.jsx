function deleteWorkout(props) {
  const workouts = props.workouts;
  delete workouts[props.workoutKey];
  props.setWorkouts({ ...workouts });
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
    <div className="flex flex-row justify-between">
      <li
        className="relative h-[15%] workout workout--running list-none flex flex-col flex-1"
        onClick={() => zoomToAndHighlightWorkout(props)}
      >
        <h2 className="pl-4 pt-0.5 workout__title text-left flex-1">
          {props.workouts[props.workoutKey].workoutType}
        </h2>

        <div className="w-[90%] pl-4 pb-0.5 flex-row flex mt-auto justify-stretch">
          <div className="workout__details">
            <span className="workout__icon">🏃‍♂️</span>
            <span className="workout__value">
              {props.workouts[props.workoutKey].distance}
            </span>
            <span className="workout__unit">km</span>
          </div>
          <div className="workout__details">
            <span className="workout__icon">⏱</span>
            <span className="workout__value">
              {props.workouts[props.workoutKey].duration}
            </span>
            <span className="workout__unit">min</span>
          </div>
          <div className="workout__details">
            <span className="workout__icon">⚡️</span>
            <span className="workout__value">
              {props.workouts[props.workoutKey].cadence}
            </span>
            <span className="workout__unit">min/km</span>
          </div>
          <div className="workout__details">
            <span className="workout__icon">🦶🏼</span>
            <span className="workout__value">
              {props.workouts[props.workoutKey].elevation}
            </span>
            <span className="workout__unit">spm</span>
          </div>
        </div>
      </li>
      <div className="">
        <button className=" top-0 relative " onClick={() => enableEdit(props)}>
          ...
        </button>
        <button
          className=" top-0 relative "
          onClick={() => deleteWorkout(props)}
        >
          x
        </button>
      </div>
    </div>
  );
}
