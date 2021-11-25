import {Card} from "react-bootstrap";
import {useState, useEffect} from "react";
import { CSSTransition } from 'react-transition-group';
import React from "react";

import './App.css';

export const BaseCard = (props:any) => {
    let [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, props.wait);
      }, []);


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

    
    console.log(show);
    
    return (
        <CSSTransition
        in={show}
        timeout={300}
        classNames="res-card"
        >
        <Card
                onClick={(e: any) => {
                    if (e.target.tagName !== "svg" && e.target.tagName !== "path") alert("Clicked " + title);
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
        </CSSTransition>
    );
}