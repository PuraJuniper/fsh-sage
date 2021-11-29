import React, {useEffect, useState} from 'react';
import './App.css';
import {SelectView} from "./selectView"
import {Collection} from "./collection"
import {MetaData} from "./metaData"
import {BaseCard} from "./baseCard"
import { CSSTransition } from 'react-transition-group';
import {runSUSHI} from "./utils/FSHHelpers"

function App() {
  const rs = async () => {
  const outPackage = await runSUSHI(`
    // @Name: Simple Extensions
    // @Description: Examples of extensions with values (no sub-extensions)

    Extension: Laterality
    Description: "Body side of a body location."
    * value[x] only CodeableConcept
    * value[x] from http://hl7.org/fhir/ValueSet/bodysite-laterality (required)

    Extension: TherapySessionsCompleted
    Id:        therapy-sessions-completed
    Title:     "Therapy Sessions Completed"
    Description: "The number of sessions of some therapy."
    // Limit the context to Procedures -- Also see Rule Sets for a context-setting rule set
    * ^context[+].type = #element
    * ^context[=].expression = "Procedure"
    * value[x] only unsignedInt  // 0 or more

    Extension: RelatedCondition
    Id:        related-condition
    Title:    "Condition related to the current resource"
    Description: "The resource has an unspecified relationship with a Condition."
    * value[x] only Reference(Condition)
    `);
    console.log(outPackage);
    }
    rs();

  let [render, setRender] = useState("metadata");
  let [nextRender, setNextRender] = useState("");
  let [show, setShow] = useState(true);
  let [direction, setDirection] = useState("");
  let [commonMetaData, setCommonMetaData] = useState(null);

  const viewNums:{ [key: string]: any }= {
    "metadata":0,
    "selectview":1
  }

  useEffect(() => {
    if (!show) {
      if (viewNums[nextRender] > viewNums[render]) {
        setDirection("from-right")
      } else {
        setDirection("from-left");
      }
      setTimeout(() => {
        setRender(nextRender);
        setShow(true);
      }, 250); // 250ms is the transition time in App.css
    }
  }, [show]);

  const changeView = (nextRender:string) => {
    setShow(false);
    setNextRender(nextRender);
  }

  const toRender = (() => {
    if (render === "metadata") {
      return <MetaData changeView={changeView} commonMetaData={commonMetaData} 
      setCommonMetaData={setCommonMetaData}/>
    } else if (render === "selectview") {
      return <SelectView changeView={changeView}/>

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
