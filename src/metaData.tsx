import React, { FormEvent, useState } from "react";
import { Form, Row , Col} from 'react-bootstrap';
import { propTypes } from "react-bootstrap/esm/Image";
import {SelectView} from './selectView';


export const MetaData = (props:any) => {
    const [showResource, setResource] = useState(false);
    console.log(1);

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
        props.setCommonMetaData({
            version:version.value,
            date:date.value,
            status:status.value,
            publisher:publisher.value,
            copyright:copyright.value,
            approval:approval.value,
            lastapproval:lastapproval.value,
            author:author.value,
            editor:editor.value,
            reviewer:reviewer.value,
            endorser:endorser.value
        });
    };

    let defaultValues = {
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
        endorser:props.commonMetaData?.endorser
    }
     
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

            <Form.Group className="mb-3" controlId="endorser">
            <Form.Label as="b">Endorser Name</Form.Label>
            <Form.Control type="text" defaultValue={defaultValues.endorser} placeholder="Endorser Name" />
            </Form.Group>

        <button className="open-resource" type="submit" onClick={() => props.changeView("selectview")}>
            <b>Open Resource</b>
        </button>

        </Form>
        </div>
    )
}