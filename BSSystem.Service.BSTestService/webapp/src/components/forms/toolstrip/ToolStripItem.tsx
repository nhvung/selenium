import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getChildren, getElementById, getOrCreateTag, isInElementV2, showElementRelativeTarget } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { sleep } from '../../../extensions/ThreadExtension';
import { componentProps } from '../../componentDefine';
import thisCss from './ToolStripItem.module.scss';
import ToolStripSplitItem from './ToolStripSplitItem';
function ToolStripItem(props?: componentProps & {
    text?: string,
    level?: number,
    treeId?: string,
    icon?: any
}) {
    const thisId = props.id ?? guid8();
    const treeId = props.treeId ?? guid8();
    const level = props.level ?? 1;

    let children = getChildren(props);

    if (children.length == 1) {
        if (typeof (children[0]) === "string") {
            children = [];
        }
    }
    let haveToolStripItem = children.findIndex(child => child.type?.name === "ToolStripItem") >= 0;


    const subItemsPopupId = `${thisId}-popup-${level}`;
    let className = thisCss["ToolStripItem"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const popupShowClassName = thisCss["ToolStripItem-sub-popup"];
    const popupHideClassName = thisCss["ToolStripItem-sub-popup-hide"];
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

    function closePopups() {
        try {
            let popupObjs: HTMLDivElement[] = Array.from<HTMLDivElement>(document.getElementsByClassName(popupShowClassName) as HTMLCollectionOf<HTMLDivElement>);
            if (popupObjs?.length > 0) {

                Array.from(popupObjs).forEach(ite => {
                    const iteTreeId = ite.getAttribute('treeId');
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
    function createSubPopup() {
        if (!subPopup) {
            if (children?.length > 0) {
                subPopup = getOrCreateTag(subItemsPopupId, "div") as HTMLDivElement;
                subPopup.classList.add(popupShowClassName);
                subPopup.classList.add(popupHideClassName);
                subPopup.setAttribute('treeId', thisId);
                subPopup.setAttribute('level', level.toString());
                const itemKey = `${thisId}-${guid8()}`;
                let contents = <>
                    {children.map((ite, idx) => {
                        if (ite.type.name == "ToolStripItem") {
                            return <ToolStripItem treeId={treeId} key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} level={level + 1} {...ite.props} />;
                        }
                        else if (ite.type.name == "ToolStripSplitItem") {
                            return <ToolStripSplitItem treeId={treeId} key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} level={level + 1} {...ite.props} />;
                        }
                        else {
                            return <ToolStripItem treeId={treeId} key={`${itemKey}-${idx}`} id={`${itemKey}-${idx}`} level={level + 1} {...ite.props}>{ite}</ToolStripItem>;
                        }
                    })}
                </>;
                const subPopupRoot = createRoot(subPopup);
                subPopupRoot.render(contents);
            }
        }
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

    try {
        const text = props.text ?? props.children;
        let contents = undefined;
        if (children?.length > 0) {
            if (level === 1) {
                if (props.onClick) {
                    contents = (<span id={thisId} className={className}>
                        {props.icon ? <span className={thisCss["ToolStripItem-icon"]}>{props.icon}</span> : undefined}
                        <span className={thisCss["ToolStripItem-label-link"]} onClick={props.onClick}>
                            {text ?? children}
                        </span>
                        <span className={thisCss["ToolStripItem-dropdown-link"]}
                            onClick={evt => showMenu("top")}>
                            <span style={{ display: "block", marginTop: 1 }}>&#8964;</span>
                        </span>
                    </span>);
                }
                else {
                    className += ` ${thisCss["ToolStripItem-nolink"]}`;
                    contents = (<span id={thisId} className={className} onClick={evt => showMenu("top")}>
                        {props.icon ? <span className={thisCss["ToolStripItem-icon"]}>{props.icon}</span> : undefined}
                        <span>{text ?? children}</span>
                        <span className={thisCss["ToolStripItem-dropdown"]}>
                            <span style={{ display: "block", marginTop: 1 }}>&#8964;</span>
                        </span>
                    </span>);
                }
            }

            else {
                if (props.onClick) {
                    contents = (<span id={thisId} className={className}>
                        {props.icon ? <span className={thisCss["ToolStripItem-icon"]}>{props.icon}</span> : undefined}
                        <span className={thisCss["ToolStripItem-label-link-n"]} onClick={props.onClick} onMouseEnter={evt => level > 1 ? closePopups() : undefined}>{text ?? children}</span>
                        <span style={{ display: "block", width: 1, height: 20, backgroundColor: "#aaa" }}>&nbsp;</span>
                        <span className={thisCss["ToolStripItem-dropright-link"]}
                            onMouseEnter={evt => showMenu("right")}
                        ><span style={{ display: "block", marginTop: 1 }}>&#65310;</span></span>
                    </span>);
                }
                else {
                    className += ` ${thisCss["ToolStripItem-nolink"]}`;
                    contents = (<span id={thisId} className={className} onMouseEnter={evt => showMenu("right")}>
                        {props.icon ? <span className={thisCss["NavItem-icon"]}>{props.icon}</span> : undefined}
                        <span className={thisCss["ToolStripItem-label-n"]}>{text ?? children}</span>
                        <span className={thisCss["ToolStripItem-dropright"]}><span style={{ display: "block", marginTop: 1 }}>&#65310;</span></span>
                    </span>);
                }
            }
        }
        else {
            if (!props.onClick) {
                className += ' ' + thisCss["ToolStripItem-disabled"];
            }
            if (props.onClick) {
                contents = (<span id={thisId} className={className}
                    onMouseEnter={evt => level > 1 ? closePopups() : undefined}
                >
                    {props.icon ? <span className={thisCss["ToolStripItem-icon"]}>{props.icon}</span> : undefined}
                    <span className={level === 1 ? thisCss["ToolStripItem-label"] : thisCss["ToolStripItem-label-n"]} onClick={props.onClick}>{text ?? children}</span>

                </span>);
            }
            else {
                className += ` ${thisCss["ToolStripItem-nolink"]}`;
                contents = (<span id={thisId} className={className}>
                    {props.icon ? <span className={thisCss["ToolStripItem-icon"]}>{props.icon}</span> : undefined}
                    <span className={thisCss["ToolStripItem-label-n"]}>{text ?? children}</span>
                </span>);
            }


        }
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ToolStripItem;