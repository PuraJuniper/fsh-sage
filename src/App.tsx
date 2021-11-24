import React from 'react';
import './App.css';
import {SelectView} from "./selectView"
import {Collection} from "./collection"

function App() {
  return (
    <div className="App container">
      <SelectView />
      <Collection />
    </div>
  );
}

export default App;
