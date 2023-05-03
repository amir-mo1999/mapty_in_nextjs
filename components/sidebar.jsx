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
      className="button-3 w-1/2 mt-5"
    >
      Create new Workout
    </button>
  );
}

export default function Sidebar(props) {
  // what workout should be rendered with a form rather than a widget, meaning that it is currently being edited
  return (
    <div className="flex pt-5 flex-col w-[30%] bg-[#2d3439] items-center">
      {Object.keys(props.workouts).map(key =>
        key == props.editWorkout ? (
          <div className="h-full w-full" key={key}>
            <WorkoutForm
              workouts={props.workouts}
              setWorkouts={props.setWorkouts}
              editWorkout={props.editWorkout}
              setEditWorkout={props.setEditWorkout}
              setHighlightWorkout={props.setHighlightWorkout}
            />
          </div>
        ) : (
          <div key={key}>
            <WorkoutWidget
              setMapFocus={props.setMapFocus}
              workoutKey={key}
              workouts={props.workouts}
              setWorkouts={props.setWorkouts}
              editWorkout={props.editWorkout}
              setEditWorkout={props.setEditWorkout}
              setHighlightWorkout={props.setHighlightWorkout}
            />
          </div>
        )
      )}

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
