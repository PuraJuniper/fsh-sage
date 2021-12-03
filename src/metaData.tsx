import React, { FormEvent, useEffect, useState } from "react";
import { Form, Row , Col} from 'react-bootstrap';
import { propTypes } from "react-bootstrap/esm/Image";
import {SelectView} from './selectView';


export const MetaData = (props:any) => {
    const [configFields, setConfigFields] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            await fetch(`/fsh/config.fsh`)
            .then(async response => response.text())
            .then(async (txt) => {
                setConfigFields(txt.split("\n"));
            })
        }
        fetchData();
      }, []);
    
    if (configFields.length < 5) return <div>Loading</div>;

    //might need to change the way of saving data
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

    let defaultValues:{ [key: string]: any } = {
        version:props.commonMetaData?.version,
        date:props.commonMetaData?.date,
        status:props.commonMetaData?.status,
        publisher:props.commonMetaData?.publisher,
        copyright:props.commonMetaData?.copyright,
        approval:props.commonMetaData?.approval,
        lastapproval:props.commonMetaData?.lastapproval,
        author:props.commonMetaData?.author,
        editor:props.commonMetaData?.editor,
        reviewer:props.commonMetaData?.reviewer,
        endorser:props.commonMetaData?.endorser,
        name: props.commonMetaData?.name
    }

    const buildInput = (field:string) => {
        const cmdSaved = props.commonMetaData;
        let defaultValue = "";
        let [name, blank] = field.split(": ");
        blank = blank.replaceAll('%', '');
        if (["id", "canonical", "fhirVersion", "FSHOnly"].includes(name)) {
            defaultValue = blank;
        }
        return (
            <Form.Group as= {Col} controlId={name}>
            <Form.Label as="b">{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
            <Form.Control type="text" defaultValue={cmdSaved?.[name] ?? defaultValue} placeholder={blank}/>
            </Form.Group>
        );
    }

    const configFormBreakpoints = [0,2,3,5];
    const configFormFields = (
        <div>
            {
            configFormBreakpoints.slice(0,3).map((breakpoint, i) => {
                return (
                <Row className="mb-3">
                    {
                    configFields.slice(breakpoint,configFormBreakpoints[i+1]).map((field) => {
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
        <Row className="mb-3">
            <Form.Group as= {Col} controlId="version">
            <Form.Label as="b">Version</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.version} placeholder="1.0.0"/>
            </Form.Group>

            <Form.Group as={Col} controlId="date">
            <Form.Label as="b">Date</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.date} placeholder="2021-01-01" />
            </Form.Group>

            <Form.Group as={Col} controlId="status">
            <Form.Label as="b">Status</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.status} placeholder="Draft"/>
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="publisher">
            <Form.Label as="b">Publisher</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.publisher} placeholder="Publisher Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="copyright">
            <Form.Label as="b">Copyright</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.copyright} placeholder="(C) [Copyright information]" />
            </Form.Group>

            <Form.Group as={Col} controlId="approval">
            <Form.Label as="b">Approval Date</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.approval} placeholder="2021-01-01" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastapproval">
            <Form.Label as="b">Last Approval Date</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.lastapproval} placeholder="2021-01-01" />
            </Form.Group>
        </Row>
            <Form.Group className="mb-3" controlId="author">
            <Form.Label as="b">Author Name</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.author} placeholder="Author Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editor">
            <Form.Label as="b">Editor Name</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.editor} placeholder="Editor Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reviewer">
            <Form.Label as="b">Reviewer Name</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.reviewer} placeholder="Reviewer Name" />
            </Form.Group>

            <Form.Group className="mb-5" controlId="endorser">
            <Form.Label as="b">Endorser Name</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.endorser} placeholder="Endorser Name" />
            </Form.Group>
        {configFormFields}

        <button className="open-resource navigate" type="submit" onClick={() => props.changeView("selectview")}>
            <b>Open Resource</b>
        </button>

        </Form>
        </div>
    )
}