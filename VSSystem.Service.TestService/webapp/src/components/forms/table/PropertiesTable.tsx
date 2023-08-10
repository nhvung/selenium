import React, { useState } from 'react';
import { guid8 } from '../../../extensions/HashFuncs';
import thisCss from './PropertiesTable.module.scss';


export type PropertyProps = {
    name: string,
    label?: string,
    defaultValue?: any
};
function PropertiesTable(props?: {
    id?: string,
    className?: string,
    properties?: PropertyProps[],
    onChange?: (hashValues: Map<string, any>) => void
}) {

    const [valueProps, setValueProps] = useState<PropertyProps[]>(props.properties);

    try {
        const thisId = props.id ?? guid8();
        let className = thisCss["PropertiesTable"];
        if (props?.className) {
            className += ` ${props.className}`;
        }

        function valuesChange() {
            try {
                const itemClassName = thisCss["PropertiesTable-item"];
                var itemObjs = document.getElementsByClassName(itemClassName) as HTMLCollectionOf<HTMLElement>;
                if (itemObjs?.length > 0) {

                    let currentProps: PropertyProps[] = props.properties;
                    var hashValues = new Map<string, any>();
                    Array.from<HTMLElement>(itemObjs).forEach(ite => {
                        const name = ite.getAttribute('name');
                        let value: any = undefined;

                        if (ite instanceof HTMLInputElement) {
                            if (ite.type === "text") {
                                value = ite.value;
                            }
                            else if (ite.type === "checkbox") {
                                value = ite.checked;
                            }
                        }
                        else if (ite instanceof HTMLSelectElement) {
                            value = ite.value;
                        }
                        hashValues.set(name, value);
                        currentProps.forEach(pIte => {
                            if (pIte.name === name) {
                                pIte.defaultValue = value;
                            }
                        });

                    });
                    if (props.onChange) {
                        props.onChange(hashValues);
                    }
                    setValueProps(currentProps);
                }

            }
            catch (e) {
            }
        }

        let tbody = undefined;
        if (valueProps?.length > 0) {
            const bodyKey = guid8();
            let rowObjs = valueProps.map((ite, idx) => {

                const valueType = typeof (ite.defaultValue ?? "");
                let valueCol = undefined;
                if (valueType === 'string') {
                    valueCol = (<td align='right'><input name={ite.name} onChange={valuesChange} className={`${thisCss["PropertiesTable-item"]} ${thisCss["PropertiesTable-txt"]}`} type="text" defaultValue={ite.defaultValue} /></td>);
                }
                else if (valueType === 'boolean') {
                    valueCol = (<td><input name={ite.name} onChange={valuesChange} className={`${thisCss["PropertiesTable-item"]} ${thisCss["PropertiesTable-chk"]}`} type="checkbox" defaultChecked={ite.defaultValue} /></td>);
                }
                else if (Array.isArray(ite.defaultValue)) {
                    valueCol = (<td align='right'>
                        <select name={ite.name} onChange={valuesChange} className={`${thisCss["PropertiesTable-item"]} ${thisCss["PropertiesTable-combo"]}`}>
                            {Array.from<any>(ite.defaultValue).map((ite1, idx1) => <option value={ite1}>{ite1}</option>)}
                        </select>
                    </td>);
                }
                return (<tr
                    key={`${bodyKey}-${idx}`}
                >
                    <td align='left'>{ite.label ?? ite.name}</td>
                    {valueCol}
                </tr >);
            });
            tbody = (<tbody id={`${thisId}-table-tbody`}>
                {rowObjs}
            </tbody>);
        }

        let contents = (<div id={thisId} className={className}>
            <table id={`${thisId}-table`} width={`100%`}>
                {tbody}
            </table>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default PropertiesTable;