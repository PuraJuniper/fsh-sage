import {useState, useEffect} from "react";
import {Folder} from"./folder";
import { ExportDialog } from "./export-dialog";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDownload, faCaretLeft} from  '@fortawesome/pro-solid-svg-icons';


export const Collection = (props:any) => {
    let [showButton, setShowButton] = useState(false);
    let [showExport, setShowExport] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowButton(true);
        }, 16*25);
      });

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
        if (!showButton) {
            return <div></div>
        } else {
            return <button className="export-json col-8 offset-2" onClick={() => setShowExport(true)}>
                <FontAwesomeIcon icon={faDownload} />
                            &nbsp;Export to JSON
            </button>
        }
    })();

    return (
        <div style={{marginTop:"50px"}}>
            <ExportDialog 
                show={showExport} 
                handleHide={() => setShowExport(false)} 
                commonMetaData={props.commonMetaData}
            />
            <div className="row">
            <h3 className="col-lg-10 col-md-9" style={{color:"#b12c07"}}><b>Saved Resources</b></h3>
            <button className="navigate-reverse col-lg-2 col-md-3" onClick={() => props.changeView("selectview")}>
            <FontAwesomeIcon icon={faCaretLeft} />
                            &nbsp;Select Resource
            </button>
            </div>
            <div className="row box">
                {
                resources.map(
                        (resource, i) => {
                        return <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                            <Folder title={resource} wait={i*25} index={i} changeView={props.changeView}/>
                        </div>
                })
            } 
            </div>
            {button}
        </div>
    );
}