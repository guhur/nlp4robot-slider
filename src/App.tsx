import React from 'react';
// import Visualizer from './components/Visualizer';
import {
  Step,
  defaultContext,
  APIContext,
  reducer,
  ActionTypes,
  Sample,
  Prediction,
  NalanbotState
} from './context';
import {askSample} from './actions';
import StepViewer from './components/StepViewer';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultContext);

  // Handle the submit button
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const target: any = event.target;
    dispatch({
      type: ActionTypes.SetManager,
      payload: {
        name: target.querySelector('input').value,
      },
    });
    askSample(state, dispatch);
  };

  const samples: Array<Sample> = state.samples;
  const predictions: Array<Prediction> = state.predictions;

  return (
    <APIContext.Provider value={{state, dispatch}}>
      <form onSubmit={handleSubmit}>
        {state.waiting ? <h3>Waiting</h3> : <h3> Not waiting </h3>}
        <label>
          Name (
          <a href="https://docs.google.com/spreadsheets/d/1JNlSHSy3FI34jCTpDmCLsGaRpudGKNs4INKM8DxkBJQ">
            hint
          </a>
          ):
          <input
            type="text"
            id="name"
            defaultValue={state.manager.name}
            data-testid="name"
          />
        </label>
        <input type="submit" id="submit" value="Submit" data-testid="submit" />
      </form>

      <h1>Visualizing samples</h1>
      {samples.map((sample, index) => {
	      const states: Array<NalanbotState> = sample.states;
	      return (
		<div key={index}>
			<h3>Sample: {sample.sentence}</h3>
		      {
			      states.map((state, index2) => {
		      console.log(state);
		return (
        	     <>
		      <StepViewer state={state} />
		</>
		);
			      })}
	      </div>);
      })}

      <h1>Visualizing predictions</h1>
      {predictions.map(prediction => {
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
    </APIContext.Provider>
  );
};

export default App;
