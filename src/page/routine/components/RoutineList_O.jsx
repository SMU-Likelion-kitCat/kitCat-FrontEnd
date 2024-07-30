import React from 'react';
import RoutineCard from './RoutineCard';


const RoutineList_O = ({ routines, viewMode }) => {
    const formatDescription = (routine) => {
        const { type, duration, unit, amount } = routine;
        return `${type} · ${duration} 루틴 · ${unit}에 ${amount}번`;
      };
    

      return (
        <div className={`routine-list ${viewMode}`}>
          {routines.map((routine) => (
            <RoutineCard
              id={routine.id}
              title={routine.title}
              description={formatDescription(routine)}
              progress={routine.progress}
              color={routine.color}
              highlight={routine.highlight}
            />
          ))}
        </div>
      );
};


export default RoutineList_O;
