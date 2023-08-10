import { getElementById } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './RadioGroup.module.scss';

export interface radioItemProps {
    id?: string,
    text?: string,
    element?: any,
    checked?: boolean
}
function RadioGroup(props?: componentProps & {
    items?: radioItemProps[],
    onChanged?: (selectedItem?: radioItemProps) => void
}) {



    const thisId = props.id ?? guid8();

    let className = thisCss["RadioGroup"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    function onSelected(id?: string) {
        const rad = getElementById(`${id}-rad`) as HTMLInputElement;
        if (rad) {

            const radItems = document.getElementsByClassName(thisCss["RadioGroup-item-rad"]);
            if (radItems?.length > 0) {
                [...radItems].forEach((ite: any) => ite.checked = false);
            }

            rad.checked = true;
            if (props.onChanged) {
                props.onChanged({
                    id: rad.value
                });
            }
        }
    }

    try {
        let contents = (<div id={thisId} className={className}>
            {props.items?.map((ite, idx) => <div className={thisCss["RadioGroup-item"]} key={guid8()} id={`${thisId}-${idx}`} onClick={evt => onSelected(`${thisId}-${idx}`)} >
                <input id={`${thisId}-${idx}-rad`} defaultChecked={ite.checked} type="radio" value={ite.id} className={thisCss["RadioGroup-item-rad"]} />
                <span>{ite.element ?? ite.text}</span>
            </div>)}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default RadioGroup;