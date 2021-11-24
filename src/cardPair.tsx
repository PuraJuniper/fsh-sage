import {useState, useEffect} from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import {BaseCard} from"./baseCard";

export const CardPair = (props: any) => {
    return (
    <div style={{position:"relative", marginBottom:"65px"}}>
        <BaseCard header="PlanDefinition" title="PlanDefinition"/>
        <div style={{position:"absolute", top:"-14px", left:"20px", maxWidth:"90%"}}>
            <BaseCard header={props.title} title="" link={props.link}/>
        </div>
        <div style={{position:"absolute", top:"16px", left:"0px", width:"100%"}}>
            <BaseCard header="PlanDefinition" title="PlanDef Title" content="ActDef Title"/>
        </div>
    </div>
    )
}