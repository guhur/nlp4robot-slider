import React from 'react';
import Visualizer from './components/Visualizer';
import ControlBoard from './components/ControlBoard';
import { defaultContext, APIContext } from './context';

const App: React.FC = () => {
  return (
    <div className="App">
	  <APIContext.Provider value={ defaultContext }>
		  <Visualizer />
		  <ControlBoard />
	  </APIContext.Provider>
    </div>
  );
}

export default App;
