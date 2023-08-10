import React from 'react';
import { getElementById } from '../../extensions/ElementExtension';
import { guid8 } from '../../extensions/HashFuncs';
import { componentProps } from '../componentDefine';
import ComboBox, { comboBoxItemProps } from './ComboBox';
import thisCss from './InputSection.module.scss';
import { sleep } from '../../extensions/ThreadExtension';


function InputSection(props?: componentProps & {
    label?: string,
    inputType?: "text" | "password" | "checkbox" | "radio" | "combobox",
    items?: (comboBoxItemProps | string)[],
    contentEditable?: boolean,
    defaultChecked?: boolean,
    defaultValue?: string,
    onClick?: (input?: any) => void,
    onChange?: (value: string | boolean, text?: string) => void
}) {
    const thisId = props.id ?? guid8();

    let containerClassName = thisCss["InputSection-container"];
    if (props?.className) {
        containerClassName += ` ${props.className}`;
    }

    async function updateCheck() {
        const inputObj = getElementById(thisId) as HTMLInputElement;
        if (inputObj) {
            inputObj.checked = !inputObj.checked;
            if (inputObj.checked) {
                if (props.onClick) {
                    await sleep(1);
                    props.onClick(inputObj);
                }
            }
            if (props.onChange) {
                props.onChange(inputObj.checked, inputObj.checked.toString());
            }
        }

    }

    try {
        let labelFirst = true;
        let labelPointer = false;
        let inputElement: JSX.Element = undefined;
        if (props.inputType === "text") {
            inputElement = (<div className={thisCss["InputSection-text-container"]}>
                <input className={thisCss["InputSection-text"]} id={thisId} type="text" defaultValue={props.defaultValue}
                    onChange={evt => {
                        if (props.onChange) {
                            props.onChange(evt.currentTarget.value, evt.currentTarget.value);
                        }
                    }}
                />
            </div>);
        }
        else if (props.inputType === "password") {
            inputElement = (<div className={thisCss["InputSection-text-container"]}>
                <input className={thisCss["InputSection-password"]} id={thisId} type="password" defaultValue={props.defaultValue}
                    onChange={evt => {
                        if (props.onChange) {
                            props.onChange(evt.currentTarget.value, evt.currentTarget.value);
                        }
                    }}
                />
            </div>);
        }
        else if (props.inputType === "checkbox") {
            inputElement = (<div className={thisCss["InputSection-checkbox"]}>
                <input id={thisId} type="checkbox" defaultChecked={props.defaultChecked}
                    onChange={evt => {
                        if (props.onChange) {
                            props.onChange(evt.currentTarget.checked, evt.currentTarget.value);
                        }
                    }}
                />
            </div>);
            labelFirst = false;
            labelPointer = true;
        }
        else if (props.inputType === "radio") {
            inputElement = (<div className={thisCss["InputSection-radio"]}>
                <input id={thisId} type="radio" defaultChecked={props.defaultChecked}
                    onChange={evt => {
                        if (props.onChange) {
                            props.onChange(evt.currentTarget.checked, evt.currentTarget.value);
                        }
                    }}
                />
            </div>);
            labelFirst = false;
            labelPointer = true;
        }
        else if (props.inputType === "combobox") {
            if (props.items?.length > 0) {
                inputElement = (<ComboBox className={thisCss["InputSection-combobox"]} id={thisId} items={props.items} contentEditable={props.contentEditable}
                    onSelectedItemChanged={item => {
                        if (props.onChange) {
                            props.onChange(item.value, item.text);
                        }
                    }}
                />);
            }
        }
        let labelElement: JSX.Element = undefined;
        if (props.label) {
            let labelClassName = thisCss["InputSection-label"];
            if (labelPointer) {
                labelClassName += " " + thisCss["InputSection-label-pointer"];
            }
            labelElement = (<div className={labelClassName} onClick={updateCheck}>{props.label}</div>);
            if (labelFirst) {
                labelElement = (<div className={labelClassName}>{props.label}:</div>);
            }

        }
        let contents = labelFirst
            ? <div id={`${thisId}-container`} className={containerClassName}>
                {labelElement}
                {inputElement}
            </div>
            : <div id={`${thisId}-container`} className={containerClassName}>
                {inputElement}
                {labelElement}
            </div>;
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default InputSection;