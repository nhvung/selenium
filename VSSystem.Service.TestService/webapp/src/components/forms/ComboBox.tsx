import React, { useEffect, useState } from 'react';
import { guid8 } from '../../extensions/HashFuncs';
import { componentProps } from '../componentDefine';
import thisCss from './ComboBox.module.scss';
import { getElementById, getOrCreateTag, showElementRelative, showElementRelativeTarget } from '../../extensions/ElementExtension';
import { createRoot } from 'react-dom/client';
import { isInElementV2 } from '../../extensions/ElementExtension';


export interface comboBoxItemProps {
    value: string,
    text?: string,
    selected?: boolean
}

function ComboBox(props?: componentProps & {
    zIndex?: number,
    items: (comboBoxItemProps | string)[],
    label?: string,
    onSelectedItemChanged?: (item: comboBoxItemProps) => void,
    contentEditable?: boolean
}) {



    const thisId = props.id ?? guid8();
    let className = thisCss["ComboBox"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    useEffect(() => {
        document.addEventListener("click", onFocus);
        return () => { document.removeEventListener("click", onFocus); }
    }, []);

    const readOnly = !props.contentEditable;

    function onFocus(evt?: MouseEvent) {
        try {
            const boundElementId = readOnly ? `${thisId}-combobox-container` : `${thisId}-expand-icon`;
            const divContainer = getElementById(boundElementId);
            if (divContainer) {
                const isInDiv = isInElementV2(evt, divContainer);
                if (!isInDiv) {
                    var popupDiv = getElementById(`${thisId}-selection-popup`) as HTMLDivElement;
                    if (popupDiv) {
                        popupDiv.remove();
                    }
                }
            }
            else {
                var popupDiv = getElementById(`${thisId}-selection-popup`) as HTMLDivElement;
                if (popupDiv) {
                    popupDiv.remove();
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const zIndex = props.zIndex ?? 100;
    const [selectedItem, setSelectedItem] = useState<comboBoxItemProps>(undefined);

    let items: comboBoxItemProps[] = [];
    let initSeletedItem: comboBoxItemProps = undefined;
    if (props.items.length > 0) {
        Array.from<any>(props.items).forEach((ite, idx) => {
            const itemType = typeof (ite);
            if (itemType === "string") {
                if (ite != '') {
                    items.push({ value: ite, text: ite });
                }

            }
            else {
                const iteObj: comboBoxItemProps = { value: ite.value, text: ite.text ?? ite.value, selected: ite.selected };
                items.push(iteObj);
                if (iteObj.selected) {
                    initSeletedItem = iteObj;
                }
            }
        });
    }



    function onSelect(evt?: React.MouseEvent) {
        try {
            if (items.length > 0) {

                const thisDiv = getElementById(thisId) as HTMLDivElement;
                if (thisDiv) {
                    var popupDiv = getOrCreateTag(`${thisId}-selection-popup`, "div", undefined, true) as HTMLDivElement;
                    popupDiv.classList.add(thisCss["ComboBox-selection-popup"]);

                    const popupRoot = createRoot(popupDiv);
                    popupRoot.render(<>
                        {items.map((ite, idx) => ite.value == selectedItem?.value
                            ? (<div className={`${thisCss["ComboBox-selection-popup-item"]} ${thisCss["ComboBox-selection-popup-item-seleted"]}`} key={`${thisId}-opt-${idx}`} data-value={ite.value} onClick={onItemClick}>{ite.text ?? ite.value}</div>)
                            : (<div className={thisCss["ComboBox-selection-popup-item"]} key={`${thisId}-opt-${idx}`} data-value={ite.value} onClick={onItemClick}>{ite.text ?? ite.value}</div>))}
                    </>);

                    Object.assign(popupDiv.style, {
                        zIndex: zIndex,
                        'min-width': `${thisDiv.clientWidth}px`
                    });

                    showElementRelativeTarget(popupDiv, thisId, "top");
                }


            }


        }
        catch (e) {
            console.log(e);
        }
    }
    function onItemClick(evt: React.MouseEvent) {
        let selectedItemValue: comboBoxItemProps = undefined;
        const value = evt.currentTarget.getAttribute('data-value');
        const text = evt.currentTarget.textContent;
        selectedItemValue = { text, value };
        setSelectedItem(selectedItemValue);

        var popupDiv = getElementById(`${thisId}-selection-popup`) as HTMLDivElement;
        if (popupDiv) {
            popupDiv.remove();
        }
        if (props.onSelectedItemChanged) {
            props.onSelectedItemChanged(selectedItemValue);
        }
        const txt = getElementById(`${thisId}`) as HTMLInputElement;
        if (txt) {
            txt.value = selectedItemValue?.text ?? "";
        }
    }

    try {

        let displayText = selectedItem?.text ?? selectedItem?.value ?? initSeletedItem?.text ?? initSeletedItem?.value;
        let initValue = selectedItem?.value ?? initSeletedItem?.value;
        let hiddenInputElement: JSX.Element = undefined;
        if (initValue) {
            hiddenInputElement = (<input id={`${thisId}-hidden`} readOnly className={thisCss["ComboBox-content"]} type="hidden" defaultValue={initValue} />);
        }
        let contents = readOnly
            ? (<div id={`${thisId}-combobox-container`}
                onClick={onSelect}
                className={className}
                title={displayText}
            >
                <input id={`${thisId}`} readOnly className={thisCss["ComboBox-content"]} type="text" defaultValue={displayText ?? "-- select item --"} />
                {hiddenInputElement}
                <span className={`${thisCss["ComboBox-expand-icon"]} ${thisCss["ComboBox-expand-icon-readonly"]}`} >&#8964;</span>
            </div>)
            : (<div id={`${thisId}-combobox-container`} className={className} title={displayText}>
                <input id={`${thisId}`} className={thisCss["ComboBox-content"]} type="text" defaultValue={displayText ?? "-- select item --"} />
                {hiddenInputElement}
                <span id={`${thisId}-expand-icon`} className={thisCss["ComboBox-expand-icon"]}
                    onClick={onSelect}
                >&#8964;</span>
            </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ComboBox;