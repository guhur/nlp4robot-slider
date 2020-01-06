import React from 'react';
import {APIContext, Step, reducer, defaultContext} from '../context';
import StepViewer from './StepViewer';

const Visualizer: React.FunctionComponent = () => {
	//   const context = React.useContext(APIContext);
	//   const [state, setState] = React.useState(context);
	//
	//	React.useEffect(() => {
	//		setState(context);
	//	}, [context]);
   const [state, dispatch] = React.useReducer(reducer, defaultContext);
 console.log("state", state);

  return (
    <>

	  {
		  state.waiting ? <h3>Waiting</h3> : <h3> Not waiting </h3>
	  }
      <h1>Visualizing samples</h1>
	  {state.samples.forEach(sample => {
		  return (
			  <h3>{sample.sentence}</h3>
		  );
	  })}
      <h1>Visualizing predictions</h1>
      {state.predictions.forEach(prediction => {
        const groundTruth: Array<Step> = prediction.ground_truth_steps;
        const teacherForcing: Array<Step> = prediction.teacher_forcing_steps;
        const studentForcing: Array<Step> = prediction.student_forcing_steps;
        return (
          <>
            <h1>Ground truth</h1>
            {groundTruth.map(step => (
              <StepViewer action={step.action} state={step.state} />
            ))}
            <h1>Teacher forcing</h1>
            {teacherForcing.map(step => (
              <StepViewer action={step.action} state={step.state} />
            ))}
            <h1>Student forcing</h1>
            {studentForcing.map(step => (
              <StepViewer action={step.action} state={step.state} />
            ))}
          </>
        );
      })}
    </>
  );
};
export default Visualizer;
