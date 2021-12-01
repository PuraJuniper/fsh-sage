import {useState, useEffect} from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import {BaseCard} from"./baseCard";
import { CSSTransition } from 'react-transition-group';

export const Folder = (props: any) => {
    let [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, props.wait);
      }, []);

    
    return (
    <CSSTransition
        in={show}
        timeout={9999}
        classNames="res-folder"
        unmountOnExit
    >
    <div className="folder" style={{position:"relative", marginBottom:"65px", marginTop: "10px"}}
        onClick={(e: any) => {
            setShow(false);
            props.changeView("selectview", 250);
        }}>
        <BaseCard header="_" title="PlanDefinition" />
        <div className="folder-type" style={{position:"absolute", top:"-14px", left:"20px", maxWidth:"90%"}}>
            <BaseCard header={props.title} title="" link={props.link} />
        </div>
        <div style={{position:"absolute", top:"16px", left:"0px", width:"100%"}}>
            <BaseCard header="PlanDefinition" title="PlanDef Title" content="ActDef Title"/>
        </div>
    </div>
    </CSSTransition>
    )
}