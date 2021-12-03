import React, { FormEvent, useEffect, useState } from "react";
import { Form, Row , Col} from 'react-bootstrap';
import { propTypes } from "react-bootstrap/esm/Image";
import {SelectView} from './selectView';


export const MetaData = (props:any) => {
    const [rulesetFields, setRulesetFields] = useState<string[]>([]);
    const [configFields, setConfigFields] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            fetch(`/fsh/config.fsh`)
            .then(async response => response.text())
            .then(async (txt) => {
                setConfigFields(txt.split("\n"));
            })
            fetch(`/fsh/Rulesets.fsh`)
            .then(async response => response.text())
            .then(async (txt) => {
                setRulesetFields(txt.split("\n").slice(7,18)); // lines 8-19 hold the common metadata
            })
        }
        fetchData();
      }, []);
    
    if (configFields.length < 5) return <div>Loading</div>;

    const sendValues = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let elements = (document.getElementById("commonMetaDataForm") as HTMLFormElement).elements;
        let obj:{ [key: string]: any } = {};
        for(let i = 0 ; i < elements.length ; i++){
            let item = (elements.item(i) as HTMLInputElement);
            let value = item.value;
            obj[item.id] = value;
        }
        props.setCommonMetaData(obj);
    };

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
    const configFieldBreakpoints = [0,2,3,5];
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
     
    return (
        <div style={{marginTop:"50px"}}>
        <Form onSubmit= {sendValues} style={{color:"#b12c07"}} id="commonMetaDataForm">
        <h3 ><b>Clinical Practice Guideline</b></h3>
        {buildForm(rulesetFields, rulesetBreakpoints)}
        <br />
        {buildForm(configFields, configFieldBreakpoints)}
        <button className="open-resource navigate" type="submit" onClick={() => props.changeView("selectview")}>
            <b>Open Resource</b>
        </button>
        </Form>
        </div>
    )
}