import { useEffect, useRef } from 'react';
import { componentProps } from '../../components/componentDefine';
import InputSection from '../../components/forms/InputSection';
import { ConfirmButtons, DialogOptions, openDialog } from '../../components/forms/dialog/Dialog';
import { getElementById } from '../../extensions/ElementExtension';
import { guid8 } from '../../extensions/HashFuncs';
import CSATask from './CSATask';
import ComparisonTask from './ComparisonTask';
import Search1NTask from './Search1NTask';
import thisCss from './SearchGalleryTask.module.scss';
import { taskProps, updateParamsRef } from './TaskDefine';
import { sleep } from '../../extensions/ThreadExtension';
function SearchGalleryTask(props?: componentProps & taskProps & {

}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["SearchGalleryTask"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const zIndex = props.zIndex ?? 0;

    const thisRef = useRef<any>({
        Filters: {
            CaseIncidents: undefined,
            Category: undefined,
            DateOfIncidentFrom: undefined,
            DateOfIncidentTo: undefined,
            ScanDateFrom: undefined,
            ScanDateTo: undefined,
            Caliber: undefined,
            BreechFaceCharacteristics: 'All',
            FiringPinShape: 'All',
            FirearmType: 'All',
            Make: 'All',
            Model: 'All',

            LocationOfIncident: undefined,
            Radius: undefined,

            Agency: 'All',
            SharedAgencies: ['All'],
            AgencyUsers: 'All',
            States: ['All'],
            Counties: ['All']
        },
        AuditInquiry: {
            CaseNumber: undefined,
            AuthorizedPurpose: undefined
        },
        CSAAction: undefined,
        ComparisonAction: undefined,
        Search1NAction: undefined,
        takeScreenshot: "true"
    });

    useEffect(() => {
        updateParamsRef(props.paramsRef, thisRef.current);
    }, []);

    async function onAddCSATask() {
        try {
            await sleep(1);
            const dialogOpts: DialogOptions = {
                id: `${thisId}-popup-csa`,
                title: "Add CSA Task",
                bodyClassName: thisCss["SearchGalleryTask-popup"],
                body: (<CSATask id={`${thisId}-run-csa-task`} takeScreenshot zIndex={zIndex + 2} paramsRef={thisRef.current.CSAAction} />),
                zIndex: zIndex + 2,
                confirmButtons: ConfirmButtons.YesNo,
                onPreDenyHandler: preRemoveCSATask,
                onPreAcceptHandler: () => {
                    updateParamsRef(props.paramsRef, thisRef.current);
                    return true;
                }
            };
            openDialog(dialogOpts);
        }
        catch (e) {
            console.log(e);
        }
    }
    function preRemoveCSATask() {
        try {
            const chk = getElementById(`${thisId}-run-csa-task-chk`) as HTMLInputElement;
            if (chk) {
                chk.checked = false;
            }
            thisRef.current.CSAAction = undefined;
            updateParamsRef(props.paramsRef, thisRef.current);
        }
        catch (e) {
            console.log(e);
        }

        return true;
    }

    async function onAddComparisonTask() {
        try {
            await sleep(1);
            const dialogOpts: DialogOptions = {
                id: `${thisId}-popup-comparison`,
                title: "Add Comparison Task",
                bodyClassName: thisCss["SearchGalleryTask-popup"],
                body: (<ComparisonTask id={`${thisId}-run-comparison-task`} takeScreenshot zIndex={zIndex + 2} paramsRef={thisRef.current.ComparisonAction} />),
                zIndex: zIndex + 2,
                confirmButtons: ConfirmButtons.YesNo,
                onPreDenyHandler: preRemoveComparisonTask,
                onPreAcceptHandler: () => {
                    updateParamsRef(props.paramsRef, thisRef.current);
                    return true;
                }
            };
            openDialog(dialogOpts);
        }
        catch (e) {
            console.log(e);
        }
    }
    function preRemoveComparisonTask() {
        try {
            const chk = getElementById(`${thisId}-run-comparison-task-chk`) as HTMLInputElement;
            if (chk) {
                chk.checked = false;
            }
            thisRef.current.ComparisonAction = undefined;
            updateParamsRef(props.paramsRef, thisRef.current);
        }
        catch (e) {
            console.log(e);
        }

        return true;
    }

    async function onAddSearch1NTask() {
        try {
            await sleep(1);
            const dialogOpts: DialogOptions = {
                id: `${thisId}-popup-search1n`,
                title: "Add Search 1N Task",
                bodyClassName: thisCss["SearchGalleryTask-popup"],
                body: (
                    <Search1NTask
                        id={`${thisId}-run-search1n-task`}
                        takeScreenshot
                        zIndex={zIndex + 2}
                        paramsRef={thisRef.current.Search1NAction}
                    />
                ),
                zIndex: zIndex + 2,
                confirmButtons: ConfirmButtons.YesNo,
                onPreDenyHandler: preRemoveSearch1NTask,
                onPreAcceptHandler: () => {
                    updateParamsRef(props.paramsRef, thisRef.current);
                    return true;
                }
            };
            openDialog(dialogOpts);
        }
        catch (e) {
            console.log(e);
        }
    }
    function preRemoveSearch1NTask() {
        try {
            const chk = getElementById(`${thisId}-run-search1n-task-chk`) as HTMLInputElement;
            if (chk) {
                chk.checked = false;
            }
            thisRef.current.Search1NAction = undefined;
            updateParamsRef(props.paramsRef, thisRef.current);
        }
        catch (e) {
            console.log(e);
        }

        return true;
    }

    try {
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["SearchGalleryTask-filters"]}>
                <fieldset className={thisCss["SearchGalleryTask-filters-fieldset"]}>
                    <legend>Common Filters</legend>
                    <div className={thisCss["SearchGalleryTask-filters-fieldset-div"]}>
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-caseincidents`} inputType="text" label="Case/Incident"
                            onChange={(value, text) => {
                                thisRef.current.Filters.CaseIncidents = value;
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-category`} inputType="combobox" label="Category"
                            items={[{ value: "All", selected: true }, "Recovered Cartridge Case", "Test Fire (TF)"]}
                            onChange={(value, text) => {
                                thisRef.current.Filters.Category = value;
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-caliber`} inputType="combobox" label="Caliber"
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
                                    thisRef.current.Filters.Caliber = value;
                                }
                                else {
                                    thisRef.current.Filters.Caliber = undefined;
                                }
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-bf`} inputType="combobox" label="Breech Face Characteristics"
                            items={[{ value: "All", selected: true }, { value: "Parallel" }, { value: "Arched" }, { value: "Crosshatch" }, { value: "Granular" }, { value: "Smooth" }, { value: "Circular" }, { value: "Undetermined" }]}
                            onChange={(value, text) => { thisRef.current.Filters.BreechFaceCharacteristics = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-fp`} inputType="combobox" label="Firing Pin Shape"
                            items={[{ value: "All", selected: true }, { value: "Circular" }, { value: "Elliptical" }, { value: "Undetermined" }]}
                            onChange={(value, text) => { thisRef.current.Filters.FiringPinShape = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-firearm`} inputType="combobox" label="Firearm Type"
                            items={[{ value: "All", selected: true }, { value: "Pistol" }, { value: "Revolver" }, { value: "Rifle" }, { value: "Shotgun" }]}
                            onChange={(value, text) => { thisRef.current.Filters.FirearmType = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-make`} inputType="combobox" label="Make"
                            items={[{ value: "All", selected: true }, { value: "Other" }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.Filters.Make = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-model`} inputType="combobox" label="Model"
                            items={[{ value: "All", selected: true }, { value: "Other" }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.Filters.Model = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                    </div>
                </fieldset>
                <fieldset className={thisCss["SearchGalleryTask-filters-fieldset"]}>
                    <legend>Location Filters</legend>
                    <div>
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-locationofincident`} inputType="text" label="Location Of Incident"
                            onChange={(value, text) => { thisRef.current.Filters.LocationOfIncident = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-radius`} inputType="text" label="Radius"
                            onChange={(value, text) => { thisRef.current.Filters.Radius = value; updateParamsRef(props.paramsRef, thisRef.current); }}

                        />
                    </div>
                </fieldset>
                <fieldset className={thisCss["SearchGalleryTask-filters-fieldset"]}>
                    <legend>Data Filters</legend>
                    <div>
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-agency`} inputType="combobox" label="Agency"
                            items={[{ value: "All", selected: true }, "My Agency", "Shared"]}
                            onChange={(value, text) => { thisRef.current.Filters.Agency = text; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-sharedagency`} inputType="combobox" label="Shared Agencies"
                            items={[{ value: "All", selected: true }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.Filters.SharedAgencies = text?.split(','); updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-state`} inputType="combobox" label="State"
                            items={[{ value: "All", selected: true }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.Filters.States = text?.split(','); updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-filters-county`} inputType="combobox" label="County"
                            items={[{ value: "All", selected: true }]}
                            contentEditable
                            onChange={(value, text) => { thisRef.current.Filters.Counties = text?.split(','); updateParamsRef(props.paramsRef, thisRef.current); }}
                        />

                    </div>
                </fieldset>
                <fieldset className={thisCss["SearchGalleryTask-filters-fieldset"]}>
                    <legend>Audit Inquiry</legend>
                    <div>
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-auditinquiry-casenumber`} inputType="text" label="Case Number"
                            onChange={(value, text) => { thisRef.current.AuditInquiry.CaseNumber = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                        <InputSection className={thisCss["SearchGalleryTask-section"]} id={`${thisId}-auditinquiry-authorizedpurpose`} inputType="text" label="Authorized Purpose"
                            onChange={(value, text) => { thisRef.current.AuditInquiry.AuthorizedPurpose = value; updateParamsRef(props.paramsRef, thisRef.current); }}
                        />
                    </div>
                </fieldset>
            </div>
            <fieldset className={thisCss["SearchGalleryTask-filters-fieldset"]}>
                <legend>Additional Actions</legend>
                <div>
                    <InputSection id={`${thisId}-run-csa-task-chk`} inputType="checkbox" label='Run CSA' defaultChecked={false} onClick={onAddCSATask}
                        onChange={(value, text) => {
                            if (value) {
                                thisRef.current.CSAAction = {};
                            }
                            else {
                                thisRef.current.CSAAction = undefined;
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }
                        }}
                    />
                    <InputSection id={`${thisId}-run-comparison-task-chk`} inputType="checkbox" label='Run Comparison' defaultChecked={false} onClick={onAddComparisonTask}
                        onChange={(value, text) => {
                            if (value) {
                                thisRef.current.ComparisonAction = {};
                            }
                            else {
                                thisRef.current.ComparisonAction = undefined;
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }

                        }}
                    />
                    <InputSection id={`${thisId}-run-search1n-task-chk`} inputType="checkbox" label='Run Search 1N' defaultChecked={false} onClick={onAddSearch1NTask}
                        onChange={(value, text) => {
                            if (value) {
                                thisRef.current.Search1NAction = {};
                            }
                            else {
                                thisRef.current.Search1NAction = undefined;
                                updateParamsRef(props.paramsRef, thisRef.current);
                            }

                        }}
                    />
                </div>
            </fieldset>

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
export default SearchGalleryTask;