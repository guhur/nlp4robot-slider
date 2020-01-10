import {State, Sample, ActionTypes, PredictRequest} from './context';

export const setWait = (dispatch: any, value: boolean) => {
  dispatch({
    type: ActionTypes.SetWaiting,
    payload: value,
  });
};

// Action creator for getting a prediction from a sample while using the API
export const predictSample = (state: State, dispatch: any, sample: Sample) => {
  if (state.server.predictUrl) {
    const url: RequestInfo = state.server.predictUrl;
    console.log(state);
    const data: PredictRequest = {
      context: state.manager,
      sample: sample,
    };
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
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
  if (state.server.askUrl) {
    const url: RequestInfo = state.server.askUrl;
    console.log(url);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        context: state.manager,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(sample => {
        dispatch({
          type: ActionTypes.AddSample,
          payload: sample.resource.sample,
        });
        dispatch({
          type: ActionTypes.SetManager,
	    payload: {
		...state.manager,
		datasetName: sample.resource.dataset_name
	    },
        });
        predictSample(state, dispatch, sample.resource);
        setWait(dispatch, false);
      })
      .catch(error => console.log(error));
  } else {
    throw Error('Please setup .env file');
  }
};
