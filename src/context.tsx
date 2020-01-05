import {createContext} from 'react';

export interface NalanbotAction {
  color: string;
  gripper: Array<number>;
  action: string;
}

export interface NalanbotBody {
  size: Array<number>;
  position: Array<number>;
  orig: Array<number>;
  shape: string;
  color_name: string;
  color: Array<number>;
}

export interface NalanbotState {
  manipulator: any;
  bodies: Array<NalanbotBody>;
}

export interface Step {
  action: NalanbotAction;
  state: NalanbotState;
}

export interface Prediction {
  sentence: string;
  ground_truth_steps: Array<Step>;
  teacher_forcing_steps: Array<Step>;
  student_forcing_steps: Array<Step>;
}

export interface Sample {
  sentence: string;
  action: Array<string>;
  color: Array<string>;
  position: Array<number>;
  states: Array<NalanbotState>;
}

export interface Server {
  askUrl: string | undefined;
  predictUrl: string | undefined;
}

// See experiments.py
export interface Manager {
  name: string;
}

export interface State {
  waiting: boolean;
  server: Server;
  samples: Array<Sample>;
  predictions: Array<Prediction>;
  manager: Manager;
}

export const defaultContext: State = {
  waiting: false,
  samples: [],
  predictions: [],
  server: {
    askUrl: process.env.SERVER_URL_ASK,
    predictUrl: process.env.SERVER_URL_PREDICT,
  },
  manager: {
    name: '',
  },
};

export const APIContext = createContext(defaultContext);

export enum ActionTypes {
  SetManager,
  SetWaiting,
  AddSample,
  AddPrediction,
  Reset,
}

export class Action {
  type: ActionTypes = ActionTypes.Reset;
  payload: any = {};
}

export const reducer = (state: State = defaultContext, action: Action) => {
  switch (action.type) {
    case ActionTypes.SetWaiting:
      return {
        ...state,
        waiting: action.payload,
      };
    case ActionTypes.SetManager:
      return {
        ...state,
        context: action.payload,
      };
    case ActionTypes.AddSample:
      return {
        ...state,
        samples: [...state.samples, action.payload],
      };
    case ActionTypes.AddPrediction:
      return {
        ...state,
	predictions: [
	  ...state.predictions,
	  action.payload
	],
      };
    case ActionTypes.Reset:
      return defaultContext;
    default:
      throw new Error('Unknown action');
  }
};
