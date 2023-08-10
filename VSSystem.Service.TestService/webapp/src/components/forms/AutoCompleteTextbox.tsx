import React, { HTMLInputTypeAttribute, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { getOrCreateTag, showElementRelativeTarget } from '../../extensions/ElementExtension';
import { guid8 } from '../../extensions/HashFuncs';
import { sleep } from '../../extensions/ThreadExtension';
import { componentProps } from '../componentDefine';
import thisCss from './AutoCompleteTextbox.module.scss';

function AutoCompleteTextbox(props?: componentProps & {
    type?: HTMLInputTypeAttribute | undefined,
    placeholder?: string,
    options?: string[],
    optionsHandler?: () => Promise<string[]>,
    tabIndex?: number,
    required?: boolean,
    showItemNumber?: boolean,
    defaultValue?: string
}) {

    const inputId = props.id ?? guid8();
    const thisId = guid8();
    const thisRef = useRef<any>();
    useEffect(() => {
        document.addEventListener('click', (evt: MouseEvent) => onFocus(evt));
        return () => {
            document.removeEventListener('click', (evt: MouseEvent) => onFocus(evt));
        }
    }, []);

    function onFocus(evt: MouseEvent) {
        try {
            const componentDiv = document.getElementById(thisId);
            if (componentDiv) {
                const popupClassName = thisCss["AutoCompleteTextbox-box-container"];
                var popupItems = document.getElementsByClassName(popupClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (popupItems?.length > 0) {
                    Array.from<any>(popupItems).forEach(ite => {
                        ite.remove();
                    });
                }
            }
        }
        catch (e) {
        }
    }

    function onChange() {
        try {
            const clearHideClassName = thisCss["AutoCompleteTextbox-button-hide"];
            const btnId = `${thisId}-clear`;
            const inputObj = document.getElementById(inputId) as HTMLInputElement;
            const btnObj = document.getElementById(btnId) as HTMLButtonElement;
            if (!inputObj.value) {
                btnObj.innerHTML = "";
                if (!btnObj.classList.contains(clearHideClassName)) {
                    btnObj.classList.add(clearHideClassName);
                }
            }
            else {
                btnObj.innerHTML = "&#x2716;";
                if (btnObj.classList.contains(clearHideClassName)) {
                    btnObj.classList.remove(clearHideClassName);
                }
            }
        }
        catch (e) {
        }
    }
    function clearInput() {
        try {
            const clearHideClassName = thisCss["AutoCompleteTextbox-button-hide"];
            (document.getElementById(inputId) as HTMLInputElement).value = '';
            const btnObj = document.getElementById(`${thisId}-clear`) as HTMLButtonElement;
            if (btnObj) {
                btnObj.innerHTML = "";
                if (!btnObj.classList.contains(clearHideClassName)) {
                    btnObj.classList.add(clearHideClassName);
                }
            }
        }
        catch (e) {
        }

    }
    function setInput(text?: string) {
        try {
            if (text) {
                (document.getElementById(inputId) as HTMLInputElement).value = text;
                const clearHideClassName = thisCss["AutoCompleteTextbox-button-hide"];
                const btnObj = document.getElementById(`${thisId}-clear`) as HTMLButtonElement;
                if (btnObj) {
                    btnObj.innerHTML = '&#x2716;';
                    if (btnObj.classList.contains(clearHideClassName)) {
                        btnObj.classList.remove(clearHideClassName);
                    }
                }
            }
        }
        catch (e) {
        }

    }

    let popupRoot: Root | undefined;
    const popupId = `${thisId}-popup`;
    async function onClick(evt: React.MouseEvent) {
        try {
            await sleep(1);

            let options = props.options;
            if (props.optionsHandler) {
                options = await props.optionsHandler();
            }
            if (options?.length > 0) {
                const popupClassName = thisCss["AutoCompleteTextbox-box-container"];
                const hidePopupClassName = thisCss["AutoCompleteTextbox-box-container-hide"];
                let popupDiv = getOrCreateTag(popupId, "div");

                if (popupRoot) {
                    popupRoot.unmount();
                }

                popupRoot = createRoot(popupDiv);
                popupRoot.render(<>
                    {options.filter((ite) => ite != undefined && ite != '').map((ite, idx) => <div key={guid8()} className={thisCss["AutoCompleteTextbox-item"]} onClick={() => { setInput(ite) }}>{props.showItemNumber ? `${idx + 1}. ` : undefined}{ite}</div>)}
                </>);

                if (!popupDiv.classList.contains(popupClassName)) {
                    popupDiv.classList.add(popupClassName);
                }
                if (popupDiv.classList.contains(hidePopupClassName)) {
                    popupDiv.classList.remove(hidePopupClassName);
                }
                showElementRelativeTarget(popupDiv, thisId, "top");
            }
        }
        catch (e) {
        }
    }

    try {
        let className = thisCss["AutoCompleteTextbox"];
        if (props?.className) {
            className += ` ${props.className}`;
        }
        let contents = (<div ref={thisRef} id={thisId} className={className} onClick={evt => onClick(evt)}>
            <div>
                <input tabIndex={props.tabIndex} id={inputId} onChange={onChange} type={props.type} placeholder={props.placeholder} required={props.required} defaultValue={props.defaultValue} />
            </div>
            <button id={`${thisId}-clear`} className={`${thisCss["AutoCompleteTextbox-button"]} ${thisCss["AutoCompleteTextbox-button-hide"]}`} onClick={clearInput}></button>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default AutoCompleteTextbox;