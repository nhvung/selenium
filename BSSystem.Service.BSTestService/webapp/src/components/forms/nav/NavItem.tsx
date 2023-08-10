import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getChildren, getElementById, getOrCreateTag, isInElementV2, showElementRelativeTarget } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { sleep } from '../../../extensions/ThreadExtension';
import { componentProps } from '../../componentDefine';
import Link from '../../router/Link';
import { navigate } from '../../router/methods';
import thisCss from './NavItem.module.scss';
import SplitNavItem from './NavSplitItem';
function NavItem(props?: componentProps & {
    nav?: boolean,
    path?: string,
    text?: string,
    level?: number,
    treeid?: string,
    icon?: any,
}): JSX.Element {
    const thisId = props.id ?? guid8();
    const treeId = props.treeid ?? guid8();

    let children = getChildren(props);
    if (children.length == 1) {
        if (typeof (children[0]) === "string") {
            children = [];
        }
    }
    const level = props.level ?? 1;
    const subItemsPopupId = `${thisId}-popup-${level}`;
    let className = thisCss["NavItem"];

    const popupShowClassName = thisCss["NavItem-sub-popup"];
    const popupHideClassName = thisCss["NavItem-sub-popup-hide"];
    let subPopup: HTMLDivElement = undefined;

    useEffect(() => {
        if (level === 1) {
            const thisElement = getElementById(thisId);
            addEventListener("click", evt => {
                if (!isInElementV2(evt, thisElement)) {
                    closePopups();
                }
            });
            return () => {
                removeEventListener("click", undefined);
            };
        }

    }, []);


    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        const text = props.text ?? props.children ?? props.path;
        let contents = undefined;
        if (children?.length > 0) {
            if (level === 1) {
                className += " " + thisCss["NavItem-level-1"];
                if (props.path) {
                    contents = (<span {...props} id={thisId} className={className}>

                        <span className={thisCss["NavItem-label-link"]} onClick={evt => navigate(props.path)}>
                            {props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}
                            {text ?? children}
                        </span>
                        <span className={thisCss["NavItem-dropdown-link"]}
                            onClick={evt => showMenu("top")}
                        ><span style={{ display: "block", marginTop: 1 }}>&#8964;</span></span>
                    </span>);
                }
                else {
                    className += ` ${thisCss["NavItem-nolink"]}`;
                    contents = (<span {...props} id={thisId} className={className} onClick={evt => showMenu("top")}>
                        <span className={thisCss["NavItem-label"]}>
                            {props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}{text ?? children}</span>
                        <span className={thisCss["NavItem-dropdown"]}><span style={{ display: "block", marginTop: 1 }}>&#8964;</span></span>
                    </span>);
                }
            }
            else {
                if (props.path) {
                    contents = (<span {...props} id={thisId} className={className}>
                        <span className={thisCss["NavItem-label-link-n"]} onClick={evt => navigate(props.path)}>
                            {props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}
                            {/* <Link path={props.path}></Link> */}
                        </span>
                        <span style={{ display: "block", width: 1, height: 20, backgroundColor: "#aaa" }}>&nbsp;</span>
                        <span className={thisCss["NavItem-dropright-link"]}
                            onMouseEnter={evt => showMenu("right")}
                        ><span style={{ display: "block", marginTop: 1 }}>&#65310;</span></span>
                    </span>);
                }
                else {
                    className += ` ${thisCss["NavItem-nolink"]}`;
                    contents = (<span {...props} id={thisId} className={className} onMouseEnter={evt => showMenu("right")}>
                        <span className={thisCss["NavItem-label-n"]}>{props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}{text ?? children}</span>
                        <span className={thisCss["NavItem-dropright"]}><span style={{ display: "block", marginTop: 1 }}>&#65310;</span></span>
                    </span>);
                }
            }
        }
        else {
            if (!props.path) {
                if (!props.nav) {
                }
                else {
                    className += ' ' + thisCss["NavItem-disabled"];
                }

            }
            if (props.path) {
                contents = (<span {...props} id={thisId} className={className}
                    onMouseEnter={evt => level > 1 ? closePopups() : undefined}
                    onClick={evt => navigate(props.path)}
                >

                    <span className={level === 1 ? thisCss["NavItem-label"] : thisCss["NavItem-label-n"]}>
                        {props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}
                        {text ?? children}
                        {/* <Link path={props.path}>{text ?? children}</Link> */}
                    </span>

                </span>);
            }
            else {
                className += ` ${thisCss["NavItem-nolink"]}`;
                contents = (<span {...props} id={thisId} className={className}>
                    <span className={thisCss["NavItem-label-n"]}>{props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}{text ?? children}</span>
                </span>);
            }

        }


        return contents;
    }
    catch (e) {
        console.log(e);
    }

    async function showMenu(position: "top" | "right") {
        try {
            await sleep(1);
            createSubPopup();
            closePopups();
            if (subPopup) {
                if (subPopup.classList.contains(popupHideClassName)) {
                    subPopup.classList.remove(popupHideClassName);
                }
                showElementRelativeTarget(subPopup, thisId, position);
            }
        }
        catch (e) {
        }
    }
    function createSubPopup() {
        if (!subPopup) {
            if (children?.length > 0) {
                subPopup = getOrCreateTag(subItemsPopupId, "div") as HTMLDivElement;
                subPopup.classList.add(popupShowClassName);
                subPopup.classList.add(popupHideClassName);
                subPopup.setAttribute('treeid', thisId);
                subPopup.setAttribute('level', level.toString());
                const itemKey = `${thisId}-${guid8()}`;
                let contents = <>
                    {children.map((ite, idx) => {
                        if (ite.type.name == "NavItem") {
                            return <NavItem treeid={treeId} key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} level={level + 1} {...ite.props} />;
                        }
                        else if (ite.type.name == "SplitNavItem") {
                            return <SplitNavItem key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} />;
                        }
                        else {
                            return <NavItem treeid={treeId} key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} level={level + 1} {...ite.props}>{ite}</NavItem>;
                        }
                    })}
                </>;
                const subPopupRoot = createRoot(subPopup);
                subPopupRoot.render(contents);
            }
        }
    }
    function closePopups() {
        try {
            let popupObjs: HTMLDivElement[] = Array.from<HTMLDivElement>(document.getElementsByClassName(popupShowClassName) as HTMLCollectionOf<HTMLDivElement>);
            if (popupObjs?.length > 0) {

                Array.from(popupObjs).forEach(ite => {
                    const iteTreeId = ite.getAttribute('treeid');
                    if (iteTreeId.length >= thisId.length) {
                        if (!ite.classList.contains(popupHideClassName)) {
                            ite.classList.add(popupHideClassName);
                        }
                    }

                });
            }
        }
        catch (e) {
        }
    }
}
export default NavItem;