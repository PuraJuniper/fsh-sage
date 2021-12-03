import React from "react"

import { SelectView } from "./selectView"
import { useState } from "react";
import { Form, Row , Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBracketsCurly, faBookMedical, faCode, faTurtle, faCaretLeft} from  '@fortawesome/pro-solid-svg-icons';
import './App.css';

export const DefinitionView= (props:any) => {

    const handleMouseEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const HandleViewer = () => {
        return (
            <SelectView/>
        )
    };
    const [showResources, setResources] = useState(false);
    const version = props.commonMetaData?.version;
    const date =  props.commonMetaData?.date;
    const status = props.commonMetaData?.status;

    return (
        <div style={{marginTop:"50px", paddingRight:"12px"}}>
            <div className="row">
            <h3 className="col-lg-10 col-md-9" style={{color:"#b12c07"}}><b>Activity Definition</b></h3>
            <button className="navigate-reverse col-lg-2 col-md-3" onClick={() => props.changeView("selectview")}>
                <FontAwesomeIcon icon={faCaretLeft} />
                            &nbsp;Back to Resource
            </button>
            </div>
            <div className="row box">
            <div style={{marginTop:"50px"}}>
            <Form>
            <Row className="mb-3">
            <Form.Group as= {Col} controlId="version">
            <Form.Label as="b">Version</Form.Label>
            <Form.Control type="text" defaultValue={version}/>
            </Form.Group>

            <Form.Group as={Col} controlId="date">
            <Form.Label as="b">Date</Form.Label>
            <Form.Control type="text" defaultValue={date}/>
            </Form.Group>

            <Form.Group as={Col} controlId="status">
            <Form.Label as="b">Status</Form.Label>
            <Form.Control type="text" defaultValue={status}/>
            </Form.Group>
            </Row>
            </Form>
            <button type="submit" className="open-resource navigate" onClick={() => setResources((showResources => !showResources))}>Open Extra Fields</button>
            {showResources && <HandleViewer />}
                </div>        
            </div>
        </div>
    );
}