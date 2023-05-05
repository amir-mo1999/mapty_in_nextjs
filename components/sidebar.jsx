import { useEffect } from 'react';
import WorkoutForm from './workoutForm';
import WorkoutWidget from './workoutWidget';
// create a new workouts and set it in the given workouts state
function createNewWorkout(
  workoutCounter,
  setWorkoutCounter,
  workouts,
  setWorkouts,
  setHighlightWorkout
) {
  // create new workout with the workout counter as key
  const newWorkout = {
    [workoutCounter]: {
      markerCounter: 0,
      workoutDate: null,
      markers: {},
      geometry: '',
      distance: null,
      workoutType: null,
      cadence: null,
      elevation: null,
      duration: null,
    },
  };
  // highlight the workout being edited
  setHighlightWorkout(workoutCounter);
  // send to workouts state
  setWorkouts({ ...workouts, ...newWorkout });
  // increase workout counter
  setWorkoutCounter(workoutCounter + 1);
}

function CreateWorkoutButton(props) {
  if (props.editWorkout != -1) {
    return '';
  }
  return (
    <button
      className="button-3 m-auto"
      onClick={() => {
        createNewWorkout(
          props.workoutCounter,
          props.setWorkoutCounter,
          props.workouts,
          props.setWorkouts,
          props.setHighlightWorkout
        );
        props.setEditWorkout(props.workoutCounter); // set the created workout as the one being edited
      }}
    >
      Create new Workout
    </button>
  );
}

export default function Sidebar(props) {
  // what workout should be rendered with a form rather than a widget, meaning that it is currently being edited
  return (
    <div className="sidebar">
      <img src="/logo.png" alt="Logo" className="logo" />
      <ui className="workouts">
        {Object.keys(props.workouts).map(key =>
          key == props.editWorkout ? (
            <WorkoutForm
              key={key}
              workoutKey={key}
              workouts={props.workouts}
              workoutCounter={props.workoutCounter}
              setWorkouts={props.setWorkouts}
              editWorkout={props.editWorkout}
              setMapFocus={props.setMapFocus}
              setEditWorkout={props.setEditWorkout}
              setHighlightWorkout={props.setHighlightWorkout}
            />
          ) : (
            <WorkoutWidget
              key={key}
              setMapFocus={props.setMapFocus}
              workoutKey={key}
              workouts={props.workouts}
              setWorkouts={props.setWorkouts}
              editWorkout={props.editWorkout}
              setEditWorkout={props.setEditWorkout}
              highlightWorkout={props.highlightWorkout}
              setHighlightWorkout={props.setHighlightWorkout}
            />
          )
        )}
      </ui>
      <CreateWorkoutButton
        workouts={props.workouts}
        setWorkouts={props.setWorkouts}
        workoutCounter={props.workoutCounter}
        setWorkoutCounter={props.setWorkoutCounter}
        editWorkout={props.editWorkout}
        setEditWorkout={props.setEditWorkout}
        setHighlightWorkout={props.setHighlightWorkout}
      ></CreateWorkoutButton>
    </div>
  );
}
