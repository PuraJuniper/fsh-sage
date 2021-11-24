import {useState, useEffect} from "react";
import {BaseCard} from"./baseCard";


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
      
    if (!links) return <div>Loading...</div>;
    
    const baseUrl = "http://hl7.org/fhir/uv/cpg/STU1/ActivityDefinition-";
    return (
        <div style={{marginTop:"50px"}}>
            <h3 style={{color:"#b12c07"}}><b>Available Resources</b></h3>
            <div className="row box">
                {
                resources.map(
                        (resource, i) => {
                        return <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                            <BaseCard 
                            header={resource.length > "ActivityDefinition".length ? "ActivityDefinition" : resource}
                            title={resource} 
                            content={
                            <div style={{fontSize:"20px"}}>
                                <a href={links[i]}>
                                    <i className="fas fa-book-medical" />
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a href={baseUrl + links[i]?.slice(46) + ".xml.html"}>
                                    <i className="fas fa-code" />
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a href={baseUrl + links[i]?.slice(46) + ".json.html"}>
                                    <i className="fab fa-js-square" />
                                </a>
                            </div>
                            }
                            />
                        </div>
                })
            } 
            </div>
        </div>
    );
}