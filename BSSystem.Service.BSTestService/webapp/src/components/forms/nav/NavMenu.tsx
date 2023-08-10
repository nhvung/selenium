import { getChildren, getElementById } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import NavItem from './NavItem';
import thisCss from './NavMenu.module.scss';
import SplitNavItem from './NavSplitItem';
function NavMenu(props?: componentProps & {
    dock?: "top" | "bottom" | undefined,
    logoPath?: string
}) {
    const thisId = props.id ?? guid8();

    let children = getChildren(props);

    let className = thisCss["NavMenu"];
    if (props.dock) {
        className += ` ${thisCss[`NavMenu-${props.dock}`]}`;
    }
    if (props?.className) {
        className += ` ${props.className}`;
    }

    function onShowMenu() {
        const divGroup = getElementById(`${thisId}-menu-group`);
        if (divGroup) {
            const showClassName = thisCss["NavMenu-menu-group-show"];
            divGroup.classList.toggle(showClassName);
        }
    }

    try {

        let itemsObj: JSX.Element[] = [];

        if (children?.length > 0) {


            const itemKey = `${thisId}-1`;
            children.forEach((ite, idx) => {
                let itemObj: JSX.Element = undefined;
                if (ite.type.name == "NavItem") {
                    itemObj = (<NavItem key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} {...ite.props} level={1} />);
                }
                else if (ite.type.name == "SplitNavItem") {
                    itemObj = (<SplitNavItem key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} />);
                }
                else {
                    itemObj = (<NavItem key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} level={1} {...ite.props}>{ite}</NavItem>);
                }
                if (itemObj) {
                    itemsObj.push(itemObj);
                }
            });
        }

        let logoElement = undefined;
        if (props.logoPath) {
            logoElement = (<img src={props.logoPath} height={10} className={thisCss["NavMenu-menu-logo"]} />);
        }

        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["NavMenu-menu-icon"]}><span onClick={() => onShowMenu()}>...</span></div>
            {logoElement}
            <div id={`${thisId}-menu-group`} className={thisCss["NavMenu-menu-group"]}>
                {itemsObj}
            </div>

        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default NavMenu;