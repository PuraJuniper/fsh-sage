import {useState, useEffect} from "react";
import {CardPair} from"./cardPair";
import {BaseCard} from "./baseCard";


export const Collection = () => {

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

    return (
        <div style={{marginTop:"50px"}}>
            <h3 style={{color:"#b12c07"}}><b>Saved Resources</b></h3>
            <div className="row box">
                {
                resources.map(
                        (resource, i) => {
                        return <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                            <CardPair title={resource}/>
                        </div>
                })
            } 
            </div>
        </div>
    );
}