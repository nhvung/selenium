import { useEffect, useRef } from 'react';
import { componentProps } from '../../components/componentDefine';
import InputSection from '../../components/forms/InputSection';
import { guid8 } from '../../extensions/HashFuncs';
import thisCss from './CSATask.module.scss';
import { taskProps, updateParamsRef } from './TaskDefine';
function CSATask(props?: componentProps & taskProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["CSATask"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const thisRef = useRef<any>({
        filters: {
            numberofselectedlastcartridgecases: '5',
        },
        takeScreenshot: "true"
    });
    useEffect(() => {
        updateParamsRef(props.paramsRef, thisRef.current);
    }, []);

    try {
        let contents = (<div id={thisId} className={className}>
            <fieldset className={thisCss["CSATask-fieldset"]}>
                <legend>Filters</legend>
                <div className={thisCss["CSATask-filters"]}>
                    <InputSection className={thisCss["CSATask-section"]}
                        id={`${thisId}-filters-numberofselectedlastcartridgecases`} inputType="combobox" label="Number Of Selected Last Cartridge Cases"
                        items={[{ value: '5', selected: true }, "10", "15"]}
                        onChange={(value, text) => {
                            thisRef.current.filters.numberofselectedlastcartridgecases = value;
                            updateParamsRef(props.paramsRef, thisRef.current);
                        }}
                        contentEditable
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
export default CSATask;