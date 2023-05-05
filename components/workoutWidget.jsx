let dontHighlight = false;

function deleteWorkout(props) {
  const workouts = props.workouts;
  delete workouts[props.workoutKey];
  props.setWorkouts({ ...workouts });
  props.setHighlightWorkout(-1);
  dontHighlight = true;

  // delete workout from local storage
  localStorage.setItem('workouts', JSON.stringify({ ...workouts }));
  console.log({ ...workouts });
}

function formatDistance(d) {
  if (d === null) {
    return '0m';
  }
  if (d >= 1000) {
    return [(+(d / 1000).toFixed(1)).toString(), 'km'];
  } else {
    return [d.toFixed(0), 'm'];
  }
}

function zoomToAndHighlightWorkout(props) {
  if (dontHighlight) {
    dontHighlight = false;
    return;
  }
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
    <div>
      <li
        className={
          'workout ' +
          (props.workouts[props.workoutKey].workoutType == 'Running'
            ? 'workout--running '
            : 'workout--cycling ') +
          (props.highlightWorkout == props.workoutKey
            ? 'workout--highlight'
            : '')
        }
        key={props.workoutKey}
        onClick={() => zoomToAndHighlightWorkout(props)}
      >
        <div className="text-left row-start-1 row-span-1 col-start1 col-span-2 whitespace-nowrap">
          <h2 className="workout__title">
            {props.workouts[props.workoutKey].workoutType +
              ' on ' +
              props.workouts[props.workoutKey].workoutDate}
          </h2>
        </div>

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

        <button
          className="edit-button-img w-[1.8rem] -translate-y-[1rem] translate-x-[3rem] col-start-4 row-start-1"
          onClick={() => enableEdit(props)}
        >
          <img src={'/edit.png'} className="" />
        </button>
        <button
          onClick={() => deleteWorkout(props)}
          className="delete-button-img w-[2.5rem] translate-x-[5.4rem] -translate-y-[1rem] col-start-4 row-start-1"
        >
          <img src={'/close.png'} className="" />
        </button>
      </li>
    </div>
  );
}
