import React from 'react';
import './App.css';
import {SelectView} from "./selectView"
import {Collection} from "./collection"
import {MetaData} from "./metaData"

function App() {
  return (
    <div className="App container">
      <MetaData/>
      {/* <SelectView />
      <Collection /> */}
    </div>
  );
}

export default App;
