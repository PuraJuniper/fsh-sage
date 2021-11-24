import {Card} from "react-bootstrap";
import React from "react";

export const BaseCard = (props:any) => {
    let index = props.header.indexOf("Activity");
    let header = index >= 0 && props.header.length > "ActivityDefinition".length 
        ? props.header.slice(0, index) : props.header;
    if (header.length > 26) {
        header = header.slice(0,22) + "...";
    }
    index = props.title.indexOf("Activity");
    let title = index >= 0 ? props.title.slice(0, index) : props.title;
    if (title.length > 24) {
        title = title.slice(0,21) + "...";
    }
    const content = props.content;

    return (
        <Card
            onClick={(e: any) => {
                if (e.target.tagName !== "I") alert("Clicked " + title);
            }}
        >
            <Card.Header as="h6">
                {header}
            </Card.Header>
            <Card.Body>
             <Card.Title as="h5">{title}</Card.Title>
                <Card.Text as="div">
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}