import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { runSUSHI } from './utils/FSHHelpers';


import { saveAs } from 'file-saver';

export const ExportDialog = (props:any) => {
    let [json, setJson] = useState("");
    let [converted, setConverted] = useState(false);

    let cmd = props.commonMetaData

    const config = {
        canonical: cmd.canonical,
        version: cmd.version,
        FSHOnly: cmd.FSHOnly ?? true,
        fhirVersion: [cmd.fhirVersion],
        id: cmd.id,
        name: cmd.name,
        status: cmd.status,
      };
    const dependencyArr = [['hl7.fhir.r4.core', '4.0.1'], ['hl7.fhir.us.core', '3.1.0'], 
    ['hl7.fhir.uv.cpg', '1.0.0'], ['hl7.fhir.uv.sdc', '2.7.0']];

    useEffect(() => {
        setConverted(false);
        const convert = (async () => {
            const unformattedjson = await runSUSHI(`
            Instance: chf-bodyweight
            InstanceOf: http://hl7.org/fhir/uv/cpg/StructureDefinition/cpg-computableactivity
            Usage: #example
            * extension[0].url = "http://hl7.org/fhir/uv/cpg/StructureDefinition/cpg-knowledgeCapability"
            * extension[=].valueCode = #shareable
            * extension[+].url = "http://hl7.org/fhir/uv/cpg/StructureDefinition/cpg-knowledgeCapability"
            * extension[=].valueCode = #computable
            * extension[+].url = "http://hl7.org/fhir/uv/cpg/StructureDefinition/cpg-knowledgeCapability"
            * extension[=].valueCode = #publishable
            * extension[+].url = "http://hl7.org/fhir/uv/cpg/StructureDefinition/cpg-knowledgeRepresentationLevel"
            * extension[=].valueCode = #structured
            * url = "http://hl7.org/fhir/uv/cpg/ActivityDefinition/chf-bodyweight"
            * version = "1.0.0"
            * name = "CHFBodyWeight"
            * title = "CHF Body Weight"
            * status = #draft
            * experimental = true
            * date = "2021-02-11T20:30:11+00:00"
            * publisher = "HL7 International - Clinical Decision Support WG"
            * description = "Measure body weight"
            * jurisdiction = http://unstats.un.org/unsd/methods/m49/m49.htm#001 "World"
            * kind = #ServiceRequest
            * profile = "http://hl7.org/fhir/uv/cpg/StructureDefinition/cpg-servicerequest"
            * code = http://hl7.org/fhir/uv/cpg/CodeSystem/cpg-activity-type#order-service "Order a service"
            * intent = #proposal
            * doNotPerform = false
            * location = Reference(Location/chf-locationdefinition)
            * participant.type = #practitioner
            * participant.role = http://terminology.hl7.org/CodeSystem/practitioner-role#nurse "Nurse"
            * productCodeableConcept = http://snomed.info/sct#307818003 "Weight monitoring (regime/therapy)"
            * dynamicValue.path = "status"
            * dynamicValue.expression.language = #text/cql
            * dynamicValue.expression.expression = "'draft'"
            `,
            config, dependencyArr);
            setJson(JSON.stringify(unformattedjson, null, 3));
            setConverted(true)
        });
        convert();
    }, [props.show])
    
    

    return (
        <Modal show={props.show} onHide={props.handleHide}>
            <Modal.Header closeButton={true}>
                    <Modal.Title>Export JSON</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        id="json-textarea"
                        readOnly={true}
                        className="form-control"
                        style={{height: "450px"}}
                        value={converted ? json : "Loading"}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="export-json" onClick = {() => {
                        /* Get the text field */
                        let copyText = document.getElementById("json-textarea") as HTMLInputElement;
                        copyText.select();
                        copyText.setSelectionRange(0, 99999);
                        navigator.clipboard.writeText(copyText.value);
                    }}>
                        Copy
                    </button>
                    <button className="export-json" onClick = {() => {
                        const fileName = "fsh-sage-cpg.json";
                        const blob = new Blob([json], {type: "text/plain;charset=utf-8"});
                        return saveAs(blob, fileName);
                    }}>
                        Download
                    </button>
                </Modal.Footer>
        </Modal>
    );
}