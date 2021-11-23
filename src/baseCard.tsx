import {Card, Button} from "react-bootstrap";
import React from "react";

export const BaseCard = (props:any) => {
    const cutoff = "ActivityDefinition".length;
    const title = props.title.length > cutoff ? props.title.slice(0,-cutoff) : props.title;
    const type = props.title.length > cutoff ? "ActivityDefinition" : "Questionnaire";

    return (
        <Card 
            style={{cursor:"pointer", margin:"10px 0px 10px 0px", borderRadius:"10px", border: "3px solid white" }}
            onClick={(e: any) => {
                if (e.target.tagName !== "A") alert("Clicked Card");
            }}
        >
            <Card.Header 
                style={{backgroundColor:"#41b3a3", borderRadius:"10px 10px 0 0"}}
                as="h6"
            >
                {type}
            </Card.Header>
            <Card.Body style={{backgroundColor:"rgb(156,204,202)", borderRadius:"0 0 10px 10px"}}>
             <Card.Title as="h5">{title}</Card.Title>
                <Card.Text>
                    <a href={props.link} style={{color:"black"}}>HL7 FHIR Reference - {title}</a>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}