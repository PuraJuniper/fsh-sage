import {useState, useEffect} from "react";
import {Folder} from"./folder";
import {BaseCard} from "./baseCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDownload} from  '@fortawesome/pro-solid-svg-icons';


export const Collection = (props:any) => {
    let [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 16*25);
      }, []);

    const resources = [
        "CPGAdministerMedicationActivityDefinition",
        "CPGCollectInformationActivityDefinition",
        "CPGCommunicationRequestActivityDefinition",
        "CPGComputableActivityDefinition",
        "CPGDispenseMedicationActivityDefinition",
        "CPGDocumentMedicationActivityDefinition",
        "CPGEnrollmentActivityDefinition",
        "CPGGenerateReportActivityDefinition",
        "CPGImmunizationRecommendationActivityDefinition",
        "CPGMedicationRequestActivityDefinition",
        "CPGProposeDiagnosisTaskActivityDefinition",
        "CPGRecordDetectedIssueTaskActivityDefinition",
        "CPGRecordInferenceTaskActivityDefinition",
        "CPGReportFlagTaskActivityDefinition",
        "CPGServiceRequestActivityDefinition",
        "Questionnaire"
    ];

    const button = (() => {
        if (!show) {
            return <div></div>
        } else {
            return <button className="export-json col-8 offset-2" onClick={() => console.log("export")}>
                <FontAwesomeIcon icon={faDownload} />
                            &nbsp;Export to JSON
            </button>
        }
    })();

    return (
        <div style={{marginTop:"50px"}}>
            <div className="row">
            <h3 className="col-lg-10 col-md-9" style={{color:"#b12c07"}}><b>Saved Resources</b></h3>
            <button className="navigate col-lg-2 col-md-3" onClick={() => props.changeView("selectview")}>
                            New Resource
            </button>
            </div>
            <div className="row box">
                {
                resources.map(
                        (resource, i) => {
                        return <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                            <Folder title={resource} wait={i*25} index={i}/>
                        </div>
                })
            } 
            </div>
            {button}
        </div>
    );
}