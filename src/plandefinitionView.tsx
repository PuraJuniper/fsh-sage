import React, { FormEvent, useEffect, useState } from "react";
import { Form, Row , Col} from 'react-bootstrap';
import './App.css';

export const PlanDefinitionView= (props:any) => {

    const [plandefinitionFields, setPlanDefinitionFields] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            fetch(`/fsh/PlanDefinition.fsh`)
            .then(async response => response.text())
            .then(async (txt) => {
                setPlanDefinitionFields(txt.split("\n").slice(8,15));
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

    const buildInputs = (field:string) => {
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

    const plandefinitionBreakpoints = [0,3,5,7]
    const buildForms = (fields:string[], breakpoints:number[]) => (
        <div>
            {
            breakpoints.slice(0, breakpoints.length - 1).map((breakpoint, i) => {
                return (
                <Row className="mb-3">
                    {
                    fields.slice(breakpoint,breakpoints[i+1]).map((field) => {
                        return buildInputs(field);
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
<h3 className="col-lg-10 col-md-9" style={{color:"#b12c07"}}><b>Plan Definition: </b></h3>
        {buildForms(plandefinitionFields, plandefinitionBreakpoints)}
        <button className="open-resource navigate" type="submit">
            <b>Open Activity Definition </b>
        </button>
        </div>
    );
}
