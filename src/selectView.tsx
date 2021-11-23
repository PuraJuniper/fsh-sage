import {useState, useEffect} from "react";
import {BaseCard} from"./baseCard";


export const SelectView = () => {
    const [currentValue, setValue] = useState<string[]>([]);

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
                    currentValue.push(link);
                    setValue([...currentValue]);
                })
            }
        }
        fetchData();
      }, []);
    if (!currentValue) return <div>Loading...</div>;
    console.log(currentValue);
    return (
        <div style={{marginTop:"50px", width:"100%"}}>
            <h3 style={{color:"#b12c07"}}><b>Available Resources</b></h3>
            <div className="row" style={{border:"3px solid #b12c07", padding:"20px 0px 20px 0px", 
            borderRadius:"10px", width:"100%"}}>
                {
                resources.map(
                        (resource, i) => {
                        return <div className="col-lg-3 col-md-4" key={i}>
                            <BaseCard title={resource} link={currentValue[i]}/>
                        </div>
                })
            } 
            </div>
        </div>
    );
}