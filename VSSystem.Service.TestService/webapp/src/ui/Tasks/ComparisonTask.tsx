import { useEffect, useRef } from 'react';
import { componentProps } from '../../components/componentDefine';
import InputSection from '../../components/forms/InputSection';
import { guid8 } from '../../extensions/HashFuncs';
import thisCss from './ComparisonTask.module.scss';
import { taskProps, updateParamsRef } from './TaskDefine';
function ComparisonTask(props?: componentProps & taskProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["ComparisonTask"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    const thisRef = useRef<any>({
        autoAlignAction: {
            takeScreenshot: "true"
        },
        patternMatchingAction: {
            takeScreenshot: "true"
        },
        threeDToolAction: {
            takeScreenshot: "true"
        },
        takeScreenshot: "true"
    });
    useEffect(() => {
        updateParamsRef(props.paramsRef, thisRef.current);
    }, []);

    try {
        let contents = (<div id={thisId} className={className}>
            <fieldset className={thisCss["ComparisonTask-fieldset"]}>
                <legend>Actions</legend>
                <div className={thisCss["ComparisonTask-actions"]}>
                    <InputSection className={thisCss["ComparisonTask-section"]} id={`${thisId}-actions-autoalign`} inputType="checkbox" label="Auto Align" defaultChecked
                        onChange={(value, text) => {
                            if (value) {
                                thisRef.current.autoAlignAction = {
                                    takeScreenshot: value,
                                };
                            }
                            else {
                                thisRef.current.autoAlignAction = undefined;
                            }

                            updateParamsRef(props.paramsRef, thisRef.current);
                        }}
                    />
                    <InputSection className={thisCss["ComparisonTask-section"]} id={`${thisId}-actions-patternmatching`} inputType="checkbox" label="Pattern Matching" defaultChecked
                        onChange={(value, text) => {
                            if (value) {
                                thisRef.current.patternMatchingAction = {
                                    takeScreenshot: value,
                                };
                            }
                            else {
                                thisRef.current.patternMatchingAction = undefined;
                            }
                            updateParamsRef(props.paramsRef, thisRef.current);
                        }}
                    />
                    <InputSection className={thisCss["ComparisonTask-section"]} id={`${thisId}-actions-threedtool`} inputType="checkbox" label="3D Tool" defaultChecked
                        onChange={(value, text) => {
                            if (value) {
                                thisRef.current.threeDToolAction = {
                                    takeScreenshot: value,
                                };
                            }
                            else {
                                thisRef.current.threeDToolAction = undefined;
                            }
                            updateParamsRef(props.paramsRef, thisRef.current);
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
export default ComparisonTask;