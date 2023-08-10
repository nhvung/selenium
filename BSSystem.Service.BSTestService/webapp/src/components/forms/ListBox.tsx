import { useState } from 'react';
import { getElementById } from '../../extensions/ElementExtension';
import { guid8 } from '../../extensions/HashFuncs';
import { componentProps } from '../componentDefine';
import { itemFilterProps } from './filters/filtersDefine';
import TextFilter from './filters/TextFilter';
import thisCss from './ListBox.module.scss';
function ListBox(props?: componentProps & {
    items?: itemFilterProps[],
    includeCheckbox?: boolean,
    includeSearchBox?: boolean,
    maxHeight?: number,
    itemCheckedChanged?: (checkedItems?: itemFilterProps[], uncheckItems?: itemFilterProps[]) => void
}) {
    const [thisId] = useState(props.id ?? guid8());
    let className = thisCss["ListBox"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    function chkAllClick(evt: React.MouseEvent) {
        const chkall = getElementById(`${thisId}-chkall`) as HTMLInputElement;
        if (!chkall) {
            return;
        }
        const checkedItems: itemFilterProps[] = [], uncheckItems: itemFilterProps[] = [];
        chkall.checked = !chkall.checked;
        const thisDiv = getElementById(thisId);
        if (thisDiv) {
            const chkItems = thisDiv.getElementsByClassName(thisCss["ListBox-chk-item"]) as HTMLCollectionOf<HTMLInputElement>;
            if (chkItems?.length > 0) {
                [...chkItems].forEach(ite => {
                    ite.checked = chkall.checked;
                    if (chkall.checked) {
                        checkedItems.push({ id: ite.value, key: ite.value });
                    }
                    else {
                        uncheckItems.push({ id: ite.value, key: ite.value });
                    }
                });
            }
            if (props.itemCheckedChanged) {
                props.itemCheckedChanged(checkedItems, uncheckItems);
            }
        }

    }


    function itemClick(id: string) {

        const chk = getElementById(`${id}-chk`) as HTMLInputElement;
        if (chk) {
            chk.checked = !chk.checked;
        }
        const thisDiv = getElementById(thisId);
        if (thisDiv) {
            const chkItems = thisDiv.getElementsByClassName(thisCss["ListBox-chk-item"]) as HTMLCollectionOf<HTMLInputElement>;
            let bChecked = true;
            const checkedItems: itemFilterProps[] = [], uncheckItems: itemFilterProps[] = [];
            if (chkItems?.length > 0) {
                [...chkItems].forEach(ite => {
                    if (!ite.checked) {
                        bChecked = false;
                        uncheckItems.push({ id: ite.value, key: ite.value });
                    }
                    else {
                        checkedItems.push({ id: ite.value, key: ite.value });
                    }
                });
            }
            const chkall = getElementById(`${thisId}-chkall`) as HTMLInputElement;
            if (chkall) {
                chkall.checked = bChecked;
            }

            if (props.itemCheckedChanged) {
                props.itemCheckedChanged(checkedItems, uncheckItems);
            }
        }

    }

    function filterText(evt?: React.ChangeEvent<HTMLInputElement>) {
        try {
            const thisDiv = getElementById(thisId);
            if (thisDiv) {
                const itemClassName = thisCss["ListBox-item"];
                const itemHiddenClassName = thisCss["ListBox-item-hide"];
                const spanItemClassName = thisCss["ListBox-item-content"];
                var itemObjs = thisDiv.getElementsByClassName(itemClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (itemObjs?.length > 0) {

                    const textVal = evt?.currentTarget.value?.toLocaleLowerCase();
                    [...itemObjs].forEach(itemObj => {
                        itemObj.classList.remove(itemHiddenClassName);
                    });
                    if (textVal) {
                        Array.from(itemObjs).forEach(itemObj => {
                            var spanObjs = itemObj.getElementsByClassName(spanItemClassName) as HTMLCollectionOf<HTMLSpanElement>;
                            if (spanObjs?.length > 0) {
                                [...spanObjs].forEach(spanObj => {
                                    var itemText = spanObj.innerHTML.toLocaleLowerCase();
                                    if (itemText.indexOf(textVal, 0) < 0) {
                                        itemObj.classList.add(itemHiddenClassName);
                                    }
                                });
                            }

                        });
                    }
                }

            }

        }
        catch (e) {
        }
    }

    try {
        let searchBox = undefined;
        let chkAllElement = undefined;
        let itemsElement = undefined;
        if (props.items?.length > 0) {
            let chkallTop = 0;
            if (props.includeSearchBox) {
                if (props.items.length > 10) {
                    searchBox = (<div className={`${thisCss["ListBox-item"]} ${thisCss["ListBox-item-search-box"]}`}>
                        <input
                            type="text"
                            className={thisCss["ListBox-search-box"]}
                            onChange={evt => filterText(evt)}
                        />
                    </div>);
                    chkallTop = 35;
                }
            }

            if (props.includeCheckbox) {
                chkAllElement = (<div className={thisCss["ListBox-item"] + " " + thisCss["ListBox-item-all"]} onClick={evt => chkAllClick(evt)} style={{ top: chkallTop }}>
                    <span><input id={`${thisId}-chkall`} type="checkbox" onClick={evt => chkAllClick(evt)} /></span>
                    <span>All</span>
                </div>);
                itemsElement = props.items.map((ite, idx) => (<div
                    key={`${thisId}-item-${idx}`}
                    id={`${thisId}-item-${idx}`}
                    className={thisCss["ListBox-item"]}
                    onClick={evt => itemClick(`${thisId}-item-${idx}`)}
                >
                    <span><input id={`${thisId}-item-${idx}-chk`} type="checkbox" defaultValue={ite.id ?? ite.key ?? ite.name} className={thisCss["ListBox-chk-item"]} onClick={evt => itemClick(`${thisId}-item-${idx}`)} /></span>
                    <span className={thisCss["ListBox-item-content"]}>{ite.name}</span>
                </div>));
            }
            else {
                itemsElement = props.items.map((ite, idx) => (<div key={ite.id ?? `${thisId}-item-${idx}`} id={ite.id ?? `${thisId}-item-${idx}`} className={thisCss["ListBox-item"]}>
                    <span className={thisCss["ListBox-item-content"]}>{ite.name}</span>
                </div>));
            }
        }

        let contents = (<div id={thisId} className={className}>
            {searchBox}
            {chkAllElement}
            {itemsElement}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ListBox;