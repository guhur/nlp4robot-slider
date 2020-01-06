import {State, Sample, ActionTypes} from './context';

export const setWait = (dispatch: any, value: boolean) => {
  dispatch({
    type: ActionTypes.SetWaiting,
    payload: value,
  });
};

// Action creator for getting a prediction from a sample while using the API
export const predictSample = (
  state: State,
  dispatch: any,
  sampleId: number = -1,
) => {
  if (state.server.predictUrl) {
    const sample: Sample = state.samples[sampleId];
    const url: RequestInfo = state.server.predictUrl;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(sample),
    })
      .then(response => response.json())
      .then(prediction => {
        dispatch({
          type: ActionTypes.AddPrediction,
          payload: prediction,
        });
      })
      .catch(error => console.log(error));
  } else {
    throw Error('Please setup .env file');
  }
};

// Action creator for getting a sample while using the API
export const askSample = (state: State, dispatch: any) => {
  setWait(dispatch, true);
  if (state.server.predictUrl) {
    const url: RequestInfo = state.server.predictUrl;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(state.manager),
    })
      .then(response => response.json())
      .then(sample => {
        dispatch({
          type: ActionTypes.AddSample,
          payload: sample,
        });
        predictSample(state, dispatch, -1);
        setWait(dispatch, false);
      })
      .catch(error => console.log(error));
  } else {
    throw Error('Please setup .env file');
  }
};
