import { getChildren } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import ToolStripItem from './ToolStripItem';
import thisCss from './ToolStripMenu.module.scss';
import ToolStripSplitItem from './ToolStripSplitItem';
function ToolStripMenu(props?: componentProps & {
    dock?: "top" | "bottom" | "left" | "right"
}) {
    const thisId = props.id ?? guid8();
    let children = getChildren(props);
    let className = thisCss["ToolStripMenu"];
    if (props.dock) {
        className += ` ${thisCss[`ToolStripMenu-${props.dock}`]}`;
    }
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let itemsObj = undefined;
        if (children?.length > 0) {
            const itemKey = `${thisId}-1`;
            itemsObj = children.map((ite, idx) => {
                if (ite) {
                    if (ite.type.name == "ToolStripItem") {
                        return <ToolStripItem key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} {...ite.props} level={1} />;
                    }
                    else if (ite.type.name == "ToolStripSplitItem") {
                        return <ToolStripSplitItem key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} {...ite.props} level={1} />;
                    }
                    else {
                        return ite;
                    }
                }
                else { return ite; }
            });
        }

        let contents = (<div id={thisId} className={className}>
            {itemsObj}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ToolStripMenu;