import {useState, useEffect} from "react";
import {BaseCard} from"./baseCard";
import { CSSTransition } from 'react-transition-group';
import { Container, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBracketsCurly, faBookMedical, faCode, faTurtle, faGripLinesVertical} from  '@fortawesome/pro-solid-svg-icons';

import './App.css';

export const SelectView = () => {
    const [links, setLinks] = useState<string[]>([]);

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

    useEffect(() => {
        async function fetchData() {
            for (const resource of resources) {
                await fetch(`/fsh/${resource}.fsh`)
                .then(async response => response.text())
                .then(async (txt) => {
                    const link = txt.split("\n")[1].split(" ")[1];
                    setLinks(links => [...links, link]);
                })
            }
        }
        fetchData();
      }, []);

    if (links.length < 16) return <div></div>;
    
    const baseUrl = "http://hl7.org/fhir/uv/cpg/STU1/ActivityDefinition-";

    return (
        <div style={{marginTop:"50px"}}>
            <h3 style={{color:"#b12c07"}}><b>Available Resources</b></h3>
            <div className="row box">
                {
                resources.map(
                        (resource, i) => {
                        return (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                        <BaseCard 
                        header={resource.length > "ActivityDefinition".length ? "ActivityDefinition" : resource}
                        title={resource} 
                        content={
                        <div style={{fontSize:"20px"}}>
                            <a href={links[i]}>
                                <FontAwesomeIcon icon={faBookMedical} />
                            </a>
                            &nbsp;&nbsp;
                            |
                            &nbsp;
                            <a href={baseUrl + links[i]?.slice(46) + ".xml.html"}>
                                <FontAwesomeIcon icon={faCode} />
                            </a>
                            &nbsp;&nbsp;
                            <a href={baseUrl + links[i]?.slice(46) + ".json.html"}>
                                <FontAwesomeIcon icon={faBracketsCurly} />
                            </a>
                            &nbsp;&nbsp;
                            <a href={baseUrl + links[i]?.slice(46) + ".ttl.html"}>
                                <FontAwesomeIcon icon={faTurtle} />
                            </a>
                        </div>
                        }
                        wait={i*100}
                        />
                        </div>
                )})
        }
            </div>
        </div>
    );
}