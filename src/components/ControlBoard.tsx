import React from 'react';
import {reducer, defaultContext, ActionTypes} from '../context';
import {askSample} from '../actions';

const ControlBoard: React.FunctionComponent = () => {
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

  return (
    <form onSubmit={handleSubmit}>
	  {
		  state.waiting ? <h3>Waiting</h3> : <h3> Not waiting </h3>
	  }
      <label>
        Name (
        <a href="https://docs.google.com/spreadsheets/d/1JNlSHSy3FI34jCTpDmCLsGaRpudGKNs4INKM8DxkBJQ">
          hint
        </a>
        ):
        <input type="text" id="name" defaultValue={ state.manager.name } data-testid="name" />
      </label>
      <input type="submit" id="submit" value="Submit" data-testid="submit"/>
    </form>
  );
};

export default ControlBoard;
