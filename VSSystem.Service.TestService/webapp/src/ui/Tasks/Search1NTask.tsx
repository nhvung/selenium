import { useEffect, useRef } from 'react';
import { componentProps } from '../../components/componentDefine';
import InputSection from '../../components/forms/InputSection';
import { guid8 } from '../../extensions/HashFuncs';
import thisCss from './Search1NTask.module.scss';
import { taskProps, updateParamsRef } from './TaskDefine';
function Search1NTask(props?: componentProps & taskProps & {

}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["Search1NTask"];
    if (props?.className) {
        className += ` ${props.className}`;
    }


    const thisRef = useRef<any>({
        filters: {
            Caliber: undefined,
            CaseIncidents: undefined,
            Score: '0',
            BreechFaceCharacteristics: 'All',
            FiringPinShape: 'All',
            FirearmType: 'All',
            Make: 'All',
            Model: 'All',
            LocationOfIncident: undefined,
            Radius: undefined,
            NumberOfCandidates: 'Top 10',
            Agency: 'All',
            SharedAgencies: ['All'],
            AgencyUsers: 'All',
            States: ['All'],
            Counties: ['All'],
            ResultSameCaseIncident: undefined,
            ResultIncludeTestFired: undefined,

        },
        auditInquiry: {
            CaseNumber: undefined,
            AuthorizedPurpose: undefined
        },
        takeScreenshot: "true"
    });

    useEffect(() => {
        updateParamsRef(props.paramsRef, thisRef.current);
    }, []);

    try {
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["Search1NTask-filters"]}>
                <fieldset className={thisCss["Search1NTask-filters-fieldset"]}>
                    <legend>Common Filters</legend>
                    <div className={thisCss["Search1NTask-filters-fieldset-div"]}>
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-caliber`} inputType="combobox" label="Caliber"
                            items={[{ value: "All", selected: true },
                                ".223 Remington / 5.56x45mm",
                                ".25 Automatic Colt Pistol / .25 ACP / .25 Auto / 6.35mm Browning Auto",
                                "7.62x39mm Soviet M43 / 7.62x39mm",
                                "9mm Luger / 9mm Parabellum / 9mm Luger +P / 9x19mm Parabellum",
                                ".380 Automatic / .380 ACP / 9mm KURZ / 9x17mm / 9mm Browning (Court) / 9mm Browning Short",
                                ".40 S&W Auto / .40 S&W",
                                ".45 Automatic Colt Pistol / .45 ACP / .45 Auto / .45 Automatic +P"
                            ]}
                            contentEditable
                            onChange={(value, text) => {
                                if (value != "All") {
                                    thisRef.current.filters.Caliber = value;
                                }
                                else {
                                    thisRef.current.filters.Caliber = undefined;
                                }
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-caseincidents`} inputType="text" label="Case/Incident" onChange={(value, text) => { thisRef.current.filters.CaseIncidents = value; updateParamsRef(props.paramsRef, thisRef.current); }} />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-score`} inputType="text" label="Score" defaultValue='0' onChange={(value, text) => { thisRef.current.filters.Score = value; updateParamsRef(props.paramsRef, thisRef.current); }} />

                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-bf`} inputType="combobox" label="Breech Face Characteristics"
                            items={[{ value: "All", selected: true }, { value: "Parallel" }, { value: "Arched" }, { value: "Crosshatch" }, { value: "Granular" }, { value: "Smooth" }, { value: "Circular" }, { value: "Undetermined" }]}
                            onChange={(value, text) => { thisRef.current.filters.BreechFaceCharacteristics = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-fp`} inputType="combobox" label="Firing Pin Shape"
                            items={[{ value: "All", selected: true }, { value: "Circular" }, { value: "Elliptical" }, { value: "Undetermined" }]}
                            onChange={(value, text) => { thisRef.current.filters.FiringPinShape = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-firearm`} inputType="combobox" label="Firearm Type"
                            items={[{ value: "All", selected: true }, { value: "Pistol" }, { value: "Revolver" }, { value: "Rifle" }, { value: "Shotgun" }]}
                            onChange={(value, text) => { thisRef.current.filters.FirearmType = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-make`} inputType="combobox" label="Make"
                            items={[{ value: "All", selected: true }, { value: "Other" }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.filters.Make = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-model`} inputType="combobox" label="Model"
                            items={[{ value: "All", selected: true }, { value: "Other" }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.filters.Model = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                    </div>
                </fieldset>
                <fieldset className={thisCss["Search1NTask-filters-fieldset"]}>
                    <legend>Location Filters</legend>
                    <div>
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-locationofincident`} inputType="text" label="Location Of Incident"
                            onChange={(value, text) => { thisRef.current.filters.LocationOfIncident = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-radius`} inputType="text" label="Radius"
                            onChange={(value, text) => { thisRef.current.filters.Radius = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                    </div>
                </fieldset>
                <fieldset className={thisCss["Search1NTask-filters-fieldset"]}>
                    <legend>Data Filters</legend>
                    <div>
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-numberofcandidates`} inputType="combobox" label="Number Of Candidates"
                            items={[{ value: "Top 10", selected: true }, "Top 50", "Top 100", "Top 250", "Top 500", "Top 750", "Top 1000"]}
                            onChange={(value, text) => { thisRef.current.filters.NumberOfCandidates = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-agency`} inputType="combobox" label="Agency"
                            items={[{ value: "All", selected: true }, "My Agency", "Shared"]}
                            onChange={(value, text) => { thisRef.current.filters.Agency = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-sharedagency`} inputType="combobox" label="Shared Agencies"
                            items={[{ value: "All", selected: true }]}
                            onChange={(value, text) => { thisRef.current.filters.SharedAgencies = text?.split(','); updateParamsRef(props.paramsRef, thisRef.current); }}
                            contentEditable
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-state`} inputType="combobox" label="State"
                            items={[{ value: "All", selected: true }]}
                            onChange={(value, text) => { thisRef.current.filters.States = text?.split(','); updateParamsRef(props.paramsRef, thisRef.current); }}
                            contentEditable
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-county`} inputType="combobox" label="County"
                            items={[{ value: "All", selected: true }]}
                            onChange={(value, text) => { thisRef.current.filters.Counties = text?.split(','); updateParamsRef(props.paramsRef, thisRef.current); }}
                            contentEditable
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-resultsamecaseincident`} inputType="combobox" label="Result same Case/Incident"
                            items={[{ value: "No", selected: true }, "With filters", "Without filters"]}
                            onChange={(value, text) => {
                                if (text == "With filters") {
                                    thisRef.current.filters.ResultSameCaseIncident = text;
                                }
                                else if (text == "Without filters") {
                                    thisRef.current.filters.ResultSameCaseIncident = text;
                                }
                                else {
                                    thisRef.current.filters.ResultSameCaseIncident = undefined;
                                }
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-filters-resultincludetestfired`} inputType="checkbox" label="Results include Test Fired Images"
                            onChange={(value, text) => { thisRef.current.filters.ResultIncludeTestFired = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />

                    </div>
                </fieldset>
                <fieldset className={thisCss["Search1NTask-filters-fieldset"]}>
                    <legend>Audit Inquiry</legend>
                    <div>
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-auditinquiry-casenumber`} inputType="text" label="Case Number"
                            onChange={(value, text) => { thisRef.current.auditInquiry.CaseNumber = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["Search1NTask-section"]} id={`${thisId}-auditinquiry-authorizedpurpose`} inputType="text" label="Authorized Purpose"
                            onChange={(value, text) => { thisRef.current.auditInquiry.AuthorizedPurpose = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                    </div>
                </fieldset>
            </div>
            {props.takeScreenshot ? (<InputSection id={`${thisId}-takeascreenshot`} defaultChecked inputType="checkbox" label="Take a screenshot"
                onChange={(value, text) => {
                    thisRef.current.takeScreenshot = value;
                    updateParamsRef(props.paramsRef, thisRef.current);
                }}
            />) : undefined}

        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Search1NTask;