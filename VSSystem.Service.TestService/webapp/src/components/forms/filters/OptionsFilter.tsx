import React, { useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { getElementById, getOrCreateDiv, showElementRelativeTarget } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import baseCss from './FilterItem.module.scss';
import thisCss from './OptionsFilter.module.scss';

type optionItemProps = {
    id?: string,
    key?: string,
    checked?: boolean,
    name?: string
};

function OptionsFilter(props: componentProps & FilterItemProps & {
    options?: optionItemProps[] | Function,
    multiselect?: boolean,
    applyClick?: (evt?: React.MouseEvent, selectedItems?: optionItemProps[]) => void,
    position?: "top" | "right",
    displayFormat?: (text?: string, selectedValue?: string, selectedValues?: string[]) => string

}) {

    const thisId = props.id ?? guid8();
    let className = `${baseCss.FilterItem ?? ''} ${thisCss.OptionsFilter ?? ''}`;

    let selectItemValue: string = undefined, selectItemTitle: string = undefined;
    let selectItemValues: string[] = undefined;
    const displayTextLength = 20;
    let displayFormat = props.displayFormat;
    if (!displayFormat) {
        displayFormat = (t, v) => `${v ?? t}`;
    }

    const options = getOptions();
    if (options?.length > 0) {
        const checkItems: optionItemProps[] = options.filter(ite => ite.checked);
        selectItemTitle = undefined;
        selectItemValues = undefined;
        if (checkItems?.length > 0) {
            if (checkItems.length == 1) {
                selectItemValue = checkItems[0].name;
                if (selectItemValue.length > displayTextLength) {
                    selectItemValue = selectItemValue.substring(0, displayTextLength) + '...';
                    selectItemTitle = checkItems[0].name;
                }
            }
            else {

                selectItemValue = `${checkItems.length} seleted`;
            }
            selectItemValues = checkItems.map(ite => ite.name);
        }
    }
    else {
        className = `${baseCss.FilterItem ?? ''} ${thisCss["OptionsFilter-disabled"] ?? ''}`;
    }

    if (props.className) {
        className += ` ${props.className}`;
    }
    let popupRoot: Root | undefined;


    function onClick(evt: React.MouseEvent) {
        try {

            const thisDiv = document.getElementById(thisId);
            hideAllPopup();
            const popupClassName = baseCss["FilterItem-box-container"];
            const hidePopupClassName = baseCss["FilterItem-box-container-hide"];
            const popupId = `${thisId}-box-container`;
            let popupDiv = getOrCreateDiv(popupId, thisDiv?.parentElement);

            const options = getOptions();
            if (options?.length > 0) {
                if (!popupRoot) {
                    popupRoot = createRoot(popupDiv);
                    const subItemClassName = thisCss["OptionsFilter-box-items-sub-item"];
                    const checkedItemClassName = thisCss["OptionsFilter-box-items-sub-item-active"];
                    const key = guid8();

                    let searchDiv = options.length > 10 ? (<div className={thisCss[`OptionsFilter-box-search`]}>
                        <input type="text" placeholder='Search...' onChange={searchText} />
                    </div>) : undefined;

                    let selectionDiv = (props.multiselect ? (<div
                        className={thisCss['OptionsFilter-box-select']}
                    >
                        <button title='For visibled items only' onClick={evt => checkItems(evt, true)}>Select items...</button>
                        <button title='For visibled items only' onClick={evt => checkItems(evt, false)}>Deselect items...</button>
                    </div>) : undefined);

                    popupRoot.render(<>
                        {searchDiv}
                        {selectionDiv}

                        <div
                            id={`${thisId}-box-items`}
                            className={thisCss['OptionsFilter-box-items']}
                        >
                            {options.map((opt: optionItemProps, idx) => <div
                                key={`${key}-${idx + 1}`}
                                id={`${opt?.id ?? `${key}-${idx + 1}`}`}
                                className={opt.checked ? `${subItemClassName} ${checkedItemClassName}` : `${subItemClassName}`}
                                onClick={onItemClick}
                                data-value={opt.key ?? opt.id ?? opt}
                            >{typeof (opt) === "string" ? opt : opt.name}</div>)}
                        </div>

                        <div className={thisCss['OptionsFilter-box-buttons']}>
                            <button onClick={apply}>Apply</button>
                            <button onClick={hideAllPopup}>Cancel</button>
                        </div>
                    </>);
                }



                if (!popupDiv.classList.contains(popupClassName)) {
                    popupDiv.classList.add(popupClassName);
                }
                if (popupDiv.classList.contains(hidePopupClassName)) {
                    popupDiv.classList.remove(hidePopupClassName);
                }
                showElementRelativeTarget(popupDiv, thisId, props.position);
            }


            if (props.onClick) {
                props.onClick(evt);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    function checkItems(evt: React.MouseEvent, isChecked: boolean) {
        try {
            const boxItemsId = `${thisId}-box-items`;
            let boxDiv = getOrCreateDiv(boxItemsId);
            if (boxDiv) {
                const itemClassName = thisCss["OptionsFilter-box-items-sub-item"];
                const hideItemClassName = thisCss["OptionsFilter-box-items-sub-item-hide"];
                const checkedItemClassName = thisCss["OptionsFilter-box-items-sub-item-active"];
                var itemObjs = boxDiv.getElementsByClassName(itemClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (itemObjs?.length > 0) {
                    Array.from(itemObjs).forEach(ite => {
                        if (!ite.classList.contains(hideItemClassName)) {
                            if (isChecked) {
                                if (!ite.classList.contains(checkedItemClassName)) {
                                    ite.classList.add(checkedItemClassName);
                                }
                            }
                            else {
                                ite.classList.remove(checkedItemClassName);
                            }
                        }

                    });
                }
            }
        }
        catch (e) {
        }
    }
    function unCheckItems(evt: React.MouseEvent) {
        try {
            const boxItemsId = `${thisId}-box-items`;
            let boxDiv = getOrCreateDiv(boxItemsId);
            if (boxDiv) {
                const checkedItemClassName = thisCss["OptionsFilter-box-items-sub-item-active"];
                const checkItems = boxDiv.getElementsByClassName(checkedItemClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (checkItems?.length > 0) {
                    Array.from(checkItems).forEach(ite => {
                        if (ite.id !== evt.currentTarget.id) {
                            if (ite.classList.contains(checkedItemClassName)) {
                                ite.classList.remove(checkedItemClassName);
                            }
                        }
                    });
                }

            }
        }
        catch (e) {
            console.log(e);
        }
    }
    function onItemClick(evt: React.MouseEvent) {
        try {
            const checkedItemClassName = thisCss["OptionsFilter-box-items-sub-item-active"];
            if (!props.multiselect) {
                unCheckItems(evt);
            }

            evt.currentTarget.classList.toggle(checkedItemClassName);
        }
        catch (e) {
            console.log(e);
        }
    }
    function hideAllPopup() {
        try {
            const popupClassName = baseCss["FilterItem-box-container"];
            const hidePopupClassName = baseCss["FilterItem-box-container-hide"];
            const popupItems = document.getElementsByClassName(popupClassName) as HTMLCollectionOf<HTMLDivElement>;
            if (popupItems?.length > 0) {
                Array.from(popupItems).forEach(ite => {
                    if (!ite.classList.contains(hidePopupClassName)) {
                        ite.classList.add(hidePopupClassName);
                    }
                });
            }
        }
        catch (e) {
        }
    }
    function getOptions(): optionItemProps[] | undefined {
        let result = Array<optionItemProps>();
        if (props.options) {
            if (typeof (props.options) === 'function') {
                result = props.options();
            }
            else {
                props.options.forEach((opt: optionItemProps) => {
                    result.push(opt);
                });
            }
        }
        return result;
    }

    function searchText(evt: React.ChangeEvent<HTMLInputElement>) {
        try {
            const textVal = evt.target.value?.toLocaleLowerCase();
            var boxDiv = document.getElementById(`${thisId}-box-items`);
            if (boxDiv) {

                var rect = boxDiv.getBoundingClientRect();
                Object.assign(boxDiv.style, { width: `${rect.width}px` });

                const itemClassName = thisCss["OptionsFilter-box-items-sub-item"];
                const hideItemClassName = thisCss["OptionsFilter-box-items-sub-item-hide"];
                var itemObjs = boxDiv.getElementsByClassName(itemClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (itemObjs?.length > 0) {
                    Array.from(itemObjs).forEach(itemObj => {
                        itemObj.classList.remove(hideItemClassName);
                    });
                    if (textVal) {
                        Array.from(itemObjs).forEach(itemObj => {
                            var itemText = itemObj.innerHTML.toLocaleLowerCase();
                            if (itemText.indexOf(textVal, 0) < 0) {
                                itemObj.classList.add(hideItemClassName);
                            }
                        });
                    }
                }


            }
        }
        catch (e) {
            console.log(e);
        }
    }


    function apply(evt: React.MouseEvent) {
        try {
            selectItemValue = undefined;
            const boxItemsId = `${thisId}-box-items`;
            let boxDiv = getOrCreateDiv(boxItemsId);
            if (boxDiv) {
                const checkedItemClassName = thisCss["OptionsFilter-box-items-sub-item-active"];
                const checkedElements = Array.from(boxDiv.getElementsByClassName(checkedItemClassName) as HTMLCollectionOf<HTMLDivElement>);
                const checkItems: optionItemProps[] = checkedElements?.map((ite: HTMLDivElement, idx) => {
                    return {
                        id: ite.id,
                        key: ite.getAttribute('data-value'),
                        name: ite.innerText,
                        checked: true
                    }
                });
                selectItemTitle = undefined;
                selectItemValues = undefined;
                if (checkItems?.length > 0) {
                    if (checkItems.length == 1) {
                        selectItemValue = checkItems[0].name;

                        if (selectItemValue.length > displayTextLength) {
                            selectItemValue = selectItemValue.substring(0, displayTextLength) + '...';
                            selectItemTitle = checkItems[0].name;
                        }
                    }
                    else {
                        selectItemValue = `${checkItems.length} seleted`;

                    }
                    selectItemValues = checkItems.map(ite => ite.name);
                }

                const selectValueElement = getElementById(`${thisId}-select-value`);
                if (selectValueElement) {
                    selectValueElement.innerHTML = selectItemValue ?? props.text ?? 'Selection Filter';
                    selectValueElement.title = selectItemTitle;
                }


                if (props.applyClick) {
                    props.applyClick(evt, checkItems);
                }
            }

            hideAllPopup();
        }
        catch (e) {
            console.log(e);
        }
    }

    try {
        let contents = (<div id={thisId} key={thisId} className={className} onClick={onClick}>
            <span id={`${thisId}-select-value`} className={thisCss['content']} title={selectItemTitle}>{displayFormat(props.text, selectItemValue, selectItemValues)}</span>
            <span className={thisCss["expand-icon"]}>&#8964;</span>
        </div >);
        return contents;
    }
    catch (e) {
    }
}
export default OptionsFilter;