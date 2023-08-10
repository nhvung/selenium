import React, { HTMLInputTypeAttribute } from 'react';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import baseCss from './FilterItem.module.scss';
import thisCss from './TextFilter.module.scss';

function TextFilter(props: componentProps & FilterItemProps & {
    tabIndex?: number,
    onChange?: (evt?: React.ChangeEvent<HTMLInputElement>) => void,
    onClear?: () => void,
    onPressEnter?: (value?: string) => void,
    defaultValue?: string,
    type?: HTMLInputTypeAttribute | undefined,
    step?: number,
    min?: string | number,
    max?: string | number
}) {

    const clearSymbol = "&#x2716;";
    let thisId = props.id ?? guid8();

    let className = `${baseCss.FilterItem ?? ''} ${thisCss.TextFilter ?? ''}`;
    if (props.className) {
        className += ' ' + props.className;
    }

    function onChange(evt?: React.ChangeEvent<HTMLInputElement>) {
        try {
            const clearHideClassName = thisCss["TextFilter-button-hide"];
            const btnId = `${thisId}-clear`;
            const inputId = `${thisId}`;
            const inputObj = document.getElementById(inputId) as HTMLInputElement;
            const btnObj = document.getElementById(btnId) as HTMLButtonElement;
            if (!inputObj.value) {
                btnObj.innerHTML = "";
                if (!btnObj.classList.contains(clearHideClassName)) {
                    btnObj.classList.add(clearHideClassName);
                }
            }
            else {
                btnObj.innerHTML = clearSymbol;
                if (btnObj.classList.contains(clearHideClassName)) {
                    btnObj.classList.remove(clearHideClassName);
                }
            }
            if (props.onChange) {
                props.onChange(evt);
            }
        }
        catch (e) {
        }
    }
    function clearInput() {
        try {
            const inputId = `${thisId}`;
            const clearHideClassName = thisCss["TextFilter-button-hide"];
            (document.getElementById(inputId) as HTMLInputElement).value = '';
            const btnObj = document.getElementById(`${thisId}-clear`) as HTMLButtonElement;
            if (btnObj) {
                btnObj.innerHTML = "";
                if (!btnObj.classList.contains(clearHideClassName)) {
                    btnObj.classList.add(clearHideClassName);
                }
            }
            if (props.onClear) {
                props.onClear();
            }
        }
        catch (e) {
        }

    }

    function onKeyDown(evt?: React.KeyboardEvent<HTMLInputElement>) {
        if (evt.key === 'Enter' || evt.keyCode === 13) {

            if (props.onPressEnter) {
                props.onPressEnter(evt.currentTarget.value);
            }
        }
    }

    try {
        let clearButtonClassName = thisCss["TextFilter-button"];
        if (!props.defaultValue) {
            clearButtonClassName += " " + thisCss["TextFilter-button-hide"];
        }
        const txtType = props.type ?? 'text';
        let contents = (<div className={className} id={`${thisId}-div`}>
            <div className={thisCss["TextFilter-container"]}>
                <input id={`${thisId}`}
                    tabIndex={props.tabIndex}
                    onChange={onChange}
                    type={txtType}
                    placeholder={props.text}
                    onKeyDown={onKeyDown}
                    defaultValue={props.defaultValue}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                />
            </div>
            <button id={`${thisId}-clear`} className={clearButtonClassName} onClick={clearInput}>{props.defaultValue ? (<>&#x2716;</>) : undefined}</button>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}

export default TextFilter;