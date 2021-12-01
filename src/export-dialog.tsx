import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { runSUSHI } from './utils/FSHHelpers';


import { saveAs } from 'file-saver';

export const ExportDialog = (props:any) => {
    let [json, setJson] = useState("");
    let [converted, setConverted] = useState(false);

    const config = {
        canonical: 'http://example.org',
        version: '1.0.0',
        FSHOnly: true,
        fhirVersion: ['4.0.1']
      };
    const dependencyArr = ['hl7.fhir.r4.core', '4.0.1'];

    useEffect(() => {
        setConverted(false);
        const convert = (async () => {
            const unformattedjson = await runSUSHI(`
            // @Name: Require Element OR
            // @Description: Invariant requiring one or both of two elements to be present

            Profile:  MedicationAdministrationWithReason
            Parent:   MedicationAdministration
            Id:       medication-administration-with-reason
            Title:    "Medication Administration With Reason Required"
            Description:    "The reason for this medication administration must be documented using a code or a reference, or both."
            * obeys reason-required
            * reasonCode and reasonReference MS

            Invariant:  reason-required
            Description: "Either reasonCode or reasonReference MUST be populated"
            Expression: "reasonCode.exists() or reasonReference.exists()"
            Severity:   #error
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