import React, {useEffect, useState} from 'react';
import './App.css';
import {SelectView} from "./selectView"
import {Collection} from "./collection"
import {MetaData} from "./metaData"
import { CSSTransition } from 'react-transition-group';

function App() {
  let [render, setRender] = useState("metadata");
  let [nextRender, setNextRender] = useState("");
  let [show, setShow] = useState(true);
  let [direction, setDirection] = useState("");
  let [commonMetaData, setCommonMetaData] = useState(null);

  const viewNums:{ [key: string]: any }= {
    "metadata":0,
    "selectview":1,
    "collection":3
  }

  useEffect(() => {
    if (!show) {
      if (viewNums[nextRender] > viewNums[render]) {
        setDirection("from-right")
      } else if (viewNums[nextRender] < viewNums[render]) {
        setDirection("from-left");
      }
      setTimeout(() => {
        setRender(nextRender);
        setShow(true);
      }, 500); // 500ms is the transition time in App.css
    }
  }, [show]);

  const changeView = (nextRender:string, delay:number = 0) => {
    setTimeout(() => {
      setNextRender(nextRender);
      setShow(false);
    }, delay);
  }

  const toRender = (() => {
    if (render === "metadata") {
      return <MetaData changeView={changeView} commonMetaData={commonMetaData} 
      setCommonMetaData={setCommonMetaData}/>
    } else if (render === "selectview") {
      return <SelectView changeView={changeView}/>
    } else if (render === "collection") {
      return <Collection changeView={changeView}/>
    } else {
      return <div>Empty</div>
    }
  })();

  return (
    <div className="App container">
      <CSSTransition
        in={show}
        timeout={9999}
        classNames={`view-${direction}`}
        unmountOnExit
        >
      {toRender}
      </CSSTransition>
    </div>
  );
}

export default App;
