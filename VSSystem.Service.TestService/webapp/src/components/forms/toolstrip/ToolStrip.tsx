import { ItemProperty } from '../define';
import thisCss from './ToolStrip.module.scss';

type ToolStripProperty = ItemProperty<any> & {};

export function ToolStrip(props: ToolStripProperty) {

    let classNames = 'toolstrip';
    if (props.dock) {
        classNames += `_${props.dock}`;
    }
    classNames = thisCss[classNames];
    if (props.className) {
        classNames += ` ${props.className}`;
    }
    let contents = (<div
        id={props.id}
        className={`${classNames}`}
        style={{
            width: props.width,
            height: props.height,
            left: props.left,
            top: props.top,
            right: props.right,
            bottom: props.bottom,
        }}
    >
        {props.children}
    </div>);
    return contents;

}
