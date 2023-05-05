import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapWrapper = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function Index() {
  const [workouts, setWorkouts] = useState({});
  const [workoutCounter, setWorkoutCounter] = useState(0);
  const [editWorkout, setEditWorkout] = useState(-1);
  const [highlightWorkout, setHighlightWorkout] = useState(-1);
  const [mapFocus, setMapFocus] = useState([false, {}]);

  return (
    <main className="">
      <Sidebar
        highlightWorkout={highlightWorkout}
        setHighlightWorkout={setHighlightWorkout}
        setMapFocus={setMapFocus}
        workouts={workouts}
        setWorkouts={setWorkouts}
        workoutCounter={workoutCounter}
        setWorkoutCounter={setWorkoutCounter}
        editWorkout={editWorkout}
        setEditWorkout={setEditWorkout}
      ></Sidebar>
      <MapWrapper
        highlightWorkout={highlightWorkout}
        setHighlightWorkout={setHighlightWorkout}
        mapFocus={mapFocus}
        setMapFocus={setMapFocus}
        workouts={workouts}
        setWorkouts={setWorkouts}
        workoutCounter={workoutCounter}
        setWorkoutCounter={setWorkoutCounter}
        editWorkout={editWorkout}
        setEditWorkout={setEditWorkout}
      ></MapWrapper>
    </main>
  );
}
