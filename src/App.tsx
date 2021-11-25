import React, {useEffect, useState} from 'react';
import './App.css';
import {SelectView} from "./selectView"
import {Collection} from "./collection"
import {MetaData} from "./metaData"
import {BaseCard} from "./baseCard"
import { CSSTransition } from 'react-transition-group';

function App() {
  let [render, setRender] = useState("metadata");
  let [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setRender("selectview");
        setShow(true);
      }, 300)
    }
  }, [show]);

  const toRender = (() => {
    if (render === "metadata") {
      return <MetaData changeView={setShow}/>
    } else if (render == "selectview") {
      return <SelectView />

    }
  })();

  return (
    <div className="App container">
      <CSSTransition
        in={show}
        timeout={9999}
        classNames="view"
        unmountOnExit
        >
      {toRender}
      </CSSTransition>
    </div>
  );
}

export default App;
