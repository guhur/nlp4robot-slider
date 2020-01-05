import React from 'react';
import {Prediction, Step } from '../context';
import StepViewer from './StepViewer';


const PredictionViewer: React.FC = (props) => {
  if(props.prediction) {
    const prediction: Prediction = props.prediction;
    const groundTruth: Array<Step> = prediction.ground_truth_steps;
    const teacherForcing: Array<Step> = prediction.teacher_forcing_steps;
    const studentForcing: Array<Step> = prediction.student_forcing_steps;
    return (<>
      <h1>Ground truth</h1>
      groundTruth.forEach( step => <StepViewer action={step.action} state={step.state} /> 
      <h1>Teacher forcing</h1>
      teacherForcing.forEach( step => <StepViewer action={step.action} state={step.state} /> 
      <h1>Student forcing</h1>
      studentForcing.forEach( step => <StepViewer action={step.action} state={step.state} /> 
        </>
      );
  } else {
    throw Error("TODO use PropTypes");
  }
}

export default PredictionViewer;
