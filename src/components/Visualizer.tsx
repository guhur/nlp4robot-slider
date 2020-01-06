import React from 'react';
import {APIContext, Step} from '../context';
import StepViewer from './StepViewer';

const Visualizer: React.FunctionComponent = () => {
  const state = React.useContext(APIContext);

  return (
    <>
      <h1>Visualizing samples</h1>
      {state.predictions.forEach(prediction => {
        const groundTruth: Array<Step> = prediction.ground_truth_steps;
        const teacherForcing: Array<Step> = prediction.teacher_forcing_steps;
        const studentForcing: Array<Step> = prediction.student_forcing_steps;
        return (
          <>
            <h1>Ground truth</h1>
          {
            groundTruth.map( (step) => (
            <StepViewer action={step.action} state={step.state} /> ))
          }
            <h1>Teacher forcing</h1>
          {
            teacherForcing.map( step => <StepViewer action={step.action} state={step.state} /> )
          }
            <h1>Student forcing</h1>
          {
            studentForcing.map( step => <StepViewer action={step.action} state={step.state} /> )
          }
          </>
        );
      })}
    </>
  );
};
export default Visualizer;
