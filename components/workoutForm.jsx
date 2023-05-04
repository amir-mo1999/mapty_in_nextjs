function formatDistance(d) {
  if (d >= 1000) {
    return (+(d / 1000).toFixed(1)).toString() + ' km';
  } else {
    return d.toFixed(0) + ' m';
  }
}

function isSubmitValid(duration, cadence, elevation, editWorkoutMarkers) {
  if (
    duration <= 0 ||
    cadence <= 0 ||
    elevation <= 0 ||
    Object.keys(editWorkoutMarkers).length < 2
  ) {
    return false;
  } else {
    return true;
  }
}

function onFormSubmit(e, props) {
  const workoutType = e.target.workoutType.value;
  const duration = Number(e.target.duration.value);
  const cadence = Number(e.target.cadence.value);
  const elevation = Number(e.target.elevation.value);

  if (
    isSubmitValid(
      duration,
      cadence,
      elevation,
      props.workouts[props.editWorkout].markers
    )
  ) {
    const workout = props.workouts[props.editWorkout];
    workout['workoutType'] = workoutType;
    workout['cadence'] = cadence;
    workout['duration'] = duration;
    workout['elevation'] = elevation;
    props.setWorkouts({ ...props.workouts, [props.editWorkout]: workout });
    props.setEditWorkout(-1);
    props.setHighlightWorkout(-1);
  }
}

export default function WorkoutForm(props) {
  return (
    <form
      key={props.workoutKey}
      method="post"
      className="form"
      action="/api/postworkout"
      onSubmit={e => {
        e.preventDefault();
        onFormSubmit(e, props);
      }}
    >
      <div className="form__row">
        <label className="form__label">Type</label>
        <select id="workoutType" className="form__input form__input--type">
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>
      <div className="form__row">
        <label className="form__label">Distance</label>
        <p className="text-slate-950 form__input form__input--distance">
          {props.workouts[props.workoutKey].distance == null
            ? '0 km'
            : formatDistance(props.workouts[props.workoutKey].distance)}
        </p>
      </div>

      <div className="form__row">
        <label className="form__label">Duration</label>
        <input
          type="number"
          id="duration"
          className="form__input form__input--duration"
          placeholder="min"
        />
      </div>

      <div className="form__row">
        <label className="form__label">Cadence</label>
        <input
          type="number"
          id="cadence"
          className="form__input form__input--cadence"
          placeholder="step/min"
        />
      </div>

      <div className="form__row form__row">
        <label className="form__label">Elev Gain</label>
        <input
          type="number"
          id="elevation"
          className="form__input form__input--elevation"
          placeholder="meters"
        />
      </div>
      <button className="button-3 text-left ">Submit</button>
    </form>
  );
}
