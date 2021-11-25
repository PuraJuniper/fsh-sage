import React, { FormEvent, useState } from "react";
import { Form, Row , Col} from 'react-bootstrap';
import {SelectView} from './selectView';

const HandleViewer = () => {
    return (
        <SelectView/>
    )
};

//might need to change the way of saving data
const sendValues = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {version, date, status, publisher, copyright, approval, lastapproval, author, editor, reviewer, endorser} = event.target as typeof event.target &{
        version: {value : string}
        date: {value : string}
        status: {value: string}
        publisher: {value: string}
        copyright: {value: string}
        approval: {value: string}
        lastapproval: {value: string}
        author: {value: string}
        editor: {value: string}
        reviewer: {value: string}
        endorser: {value: string}
    }
    console.log(version.value, date.value, status.value);
};


export const MetaData = (props:any) => {
    const [showResource, setResource] = useState(false);
    // const {handleSubmit} = useForm();
     
    return (
        <div className = "container">
        <Form onSubmit= {sendValues}>
        <h3 style={{color:"#b12c07"}}><b>Clinical Practice Guideline</b></h3>
        <Row className="mb-3">
            <Form.Group as= {Col} controlId="version">
            <Form.Label htmlFor="version">Version</Form.Label>
            <Form.Control type="text" placeholder="1.0.0" />
            </Form.Group>

            <Form.Group as={Col} controlId="date">
            <Form.Label htmlFor="date">Date</Form.Label>
            <Form.Control type="text" placeholder="2021-01-01" />
            </Form.Group>

            <Form.Group as={Col} controlId="status">
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Control type="text" placeholder="Draft"/>
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="publisher">
            <Form.Label htmlFor="publisher">Publisher</Form.Label>
            <Form.Control type="text" placeholder="Publisher Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="copyright">
            <Form.Label htmlFor="copyright">Copyright</Form.Label>
            <Form.Control type="text" placeholder="(C) [Copyright information]" />
            </Form.Group>

            <Form.Group as={Col} controlId="approval">
            <Form.Label htmlFor="approval">Approval Date</Form.Label>
            <Form.Control type="text" placeholder="2021-01-01" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastapproval">
            <Form.Label htmlFor="lastapporval">Last Approval Date</Form.Label>
            <Form.Control type="text" placeholder="2021-01-01" />
            </Form.Group>
        </Row>
            <Form.Group className="mb-3" controlId="author">
            <Form.Label>Author Name</Form.Label>
            <Form.Control type="text" placeholder="Author Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editor">
            <Form.Label>Editor Name</Form.Label>
            <Form.Control type="text" placeholder="Editor Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reviewer">
            <Form.Label>Reviewer Name</Form.Label>
            <Form.Control type="text" placeholder="Reviewer Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="endorser">
            <Form.Label>Endorser Name</Form.Label>
            <Form.Control type="text" placeholder="Endorser Name" />
            </Form.Group>

        <button type="submit" onClick={() => setResource((showResource => !showResource))}>Open Resource</button>
        {showResource && <HandleViewer />}
        </Form>
        </div>
    )
}