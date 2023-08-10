import { ItemProperty } from "./define";
import thisCss from './Panel.module.scss';

type PanelProperty = ItemProperty<any>;

export function Panel(props: PanelProperty) {
    try {
        let className = thisCss["panel-fill"];
        if (props.dock) {
            switch (props.dock) {
                case "top": className = thisCss["panel-top"]; break;
                case "bottom": className = thisCss["panel-bottom"]; break;
                case "left": className = thisCss["panel-left"]; break;
                case "right": className = thisCss["panel-right"]; break;
            }
        }
        if (props.className) {
            className += ` ${props.className}`;
        }
        let contents = (<div
            id={props.id}
            className={`${className}`}
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
    catch (e) {
    }
}