import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './Panel.module.scss';
function Panel(props?: componentProps & {
    backgroundColor?: any,
    minWidth?: any,
    minHeight?: any
}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["Panel"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className} style={{
            backgroundColor: props.backgroundColor,
            minHeight: props.minHeight,
            minWidth: props.minWidth
        }}>
            {props.children}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Panel;