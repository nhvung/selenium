import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './ToolStripSplitItem.module.scss';
function ToolStripSplitItem(props?: componentProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["ToolStripSplitItem"];
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
export default ToolStripSplitItem;