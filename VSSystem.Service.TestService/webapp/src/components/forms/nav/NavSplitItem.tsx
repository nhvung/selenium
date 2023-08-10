import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './NavSplitItem.module.scss';
function SplitNavItem(props?: componentProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["SplitNavItem"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}></div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default SplitNavItem;