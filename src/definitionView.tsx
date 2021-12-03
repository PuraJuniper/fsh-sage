import React, { FormEvent, useEffect, useState } from "react";
import { SelectView } from "./selectView"
import { Form, Row , Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBracketsCurly, faBookMedical, faCode, faTurtle, faCaretLeft} from  '@fortawesome/pro-solid-svg-icons';
import './App.css';
import { PlanDefinitionView } from "./plandefinitionView";

export const DefinitionView= (props:any) => {

    const [rulesetFields, setRulesetFields] = useState<string[]>([]);
    const [showResources, setResources] = useState(false);

    useEffect(() => {
        async function fetchData() {
            fetch(`/fsh/Rulesets.fsh`)
            .then(async response => response.text())
            .then(async (txt) => {
                setRulesetFields(txt.split("\n").slice(7,18)); // lines 8-19 hold the common metadata
            })
        }
        fetchData();
      }, []);

    //   const sendValues = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     let elements = (document.getElementById("commonMetaDataForm") as HTMLFormElement).elements;
    //     let obj:{ [key: string]: any } = {};
    //     for(let i = 0 ; i < elements.length ; i++){
    //         let item = (elements.item(i) as HTMLInputElement);
    //         let value = item.value;
    //         obj[item.id] = value;
    //     }
    //     props.setCommonMetaData(obj);
    // };

    const buildInput = (field:string) => {
        let defaultValue = null;
        let [name, blank] = field.split(" = ");
        name = name.slice(2);
        blank = blank.replaceAll('%', '');
        if (["id", "canonical", "fhirVersion", "FSHOnly"].includes(name)) {
            defaultValue = blank;
        }
        return (
            <Form.Group as= {Col} controlId={name}>
            <Form.Label as="b">{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
            <Form.Control type="text" defaultValue={props.commonMetaData?.[name] ?? defaultValue}/>
            </Form.Group>
        );
    }

    const rulesetBreakpoints = [0,4,8,9,11]
    const buildForm = (fields:string[], breakpoints:number[]) => (
        <div>
            {
            breakpoints.slice(0, breakpoints.length - 1).map((breakpoint, i) => {
                return (
                <Row className="mb-3">
                    {
                    fields.slice(breakpoint,breakpoints[i+1]).map((field) => {
                        return buildInput(field);
                    })
                    }
                </Row>
                );
            })
            }
        </div>
    );

    const HandleViewer = () => {
        return (
            <PlanDefinitionView/>
        )
    }; 

    return (
        <div style={{marginTop:"50px", paddingRight:"12px"}}>
            <div className="row">
            <h3 className="col-lg-10 col-md-9" style={{color:"#b12c07"}}><b>{props.title}</b></h3>
            <button className="navigate-reverse col-lg-2 col-md-3" onClick={() => props.changeView("selectview")}>
                <FontAwesomeIcon icon={faCaretLeft} />
                            &nbsp;Back to Resources
            </button>
            </div>
            <div className="row box">
            <div style={{marginTop:"50px"}}>
            <h3 className="col-lg-10 col-md-9" style={{color:"#b12c07"}}><b>Pre-Filled Fields:</b></h3>
            {buildForm(rulesetFields, rulesetBreakpoints)}
            <button type="submit" className="open-resource navigate" onClick={() => setResources((showResources => !showResources))}>Open PlanDefinition</button>
            {showResources && <HandleViewer />}
                </div>        
            </div>
        </div>
    );
}