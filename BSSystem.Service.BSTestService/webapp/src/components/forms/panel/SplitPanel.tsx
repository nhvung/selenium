import React, { useEffect, useState } from 'react';
import { getElementById } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { sleep } from '../../../extensions/ThreadExtension';
import { componentProps } from '../../componentDefine';
import HorizontalSplitPanel from './HorizontalSplitPanel';
import thisCss from './SplitPanel.module.scss';
function SplitPanel(props?: componentProps & {
    panel1?: any,
    panel2?: any,
    minsize?: number,
    maxsize?: number,
    orientation?: "Vertical" | "Horizontal"

}) {
    const [thisId, setId] = useState(props.id ?? guid8());

    const splitId = `${thisId}-splitter`;
    const panel1Id = `${thisId}-panel1`;
    const panel2Id = `${thisId}-panel2`;


    let className = thisCss["SplitPanel"];

    if (props?.className) {
        className += ` ${props.className}`;
    }

    const [splitterX, setSplitterX] = useState<number>(undefined);
    const [thisRect, setThisRect] = useState<DOMRect>();

    useEffect(() => {
        const thisDiv = getElementById(thisId);
        if (thisDiv) {
            const thisRect = thisDiv.getBoundingClientRect();
            setThisRect(thisRect);
            const panel1 = getElementById(panel1Id);
            if (panel1) {

                let x = splitterX;
                if (!splitterX || splitterX <= 0) {
                    x = thisRect.width * 0.3;
                }

                setSplitterX(x);
            }
        }

    }, []);

    function onDrag(evt?: React.DragEvent<HTMLDivElement>) {

        try {
            evt.preventDefault();
            if (thisRect.width > 0) {
                const minLeft = thisRect.left + (props.minsize ?? 0);
                const maxLeft = props.maxsize > 0 ? thisRect.left + props.maxsize : thisRect.right;
                let x = evt.clientX - thisRect.left;
                if (x > 0) {
                    if (x < minLeft) {
                        x = minLeft;
                    }
                    if (x > maxLeft) {
                        x = maxLeft;
                    }
                }

                if (x > 0) {
                    setSplitterX(x);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    function onTouchMove(evt?: React.TouchEvent<HTMLDivElement>) {

        try {
            evt.preventDefault();
            if (thisRect.width > 0) {
                const minLeft = thisRect.left + (props.minsize ?? 0);
                const maxLeft = props.maxsize > 0 ? thisRect.left + props.maxsize : thisRect.right;
                let x = evt.currentTarget.clientLeft - thisRect.left;
                if (x > 0) {
                    if (x < minLeft) {
                        x = minLeft;
                    }
                    if (x > maxLeft) {
                        x = maxLeft;
                    }
                }

                if (x > 0) {
                    setSplitterX(x);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    try {
        let contents = props.orientation === "Horizontal"
            ? (<HorizontalSplitPanel id={thisId} panel1={props.panel1} panel2={props.panel2} maxsize={props.maxsize} minsize={props.minsize} />)
            : (<div id={thisId} className={className} >
                <div id={panel1Id}
                    className={thisCss["SplitPanel-panel1"]}
                    style={{ width: splitterX }}>{props.panel1}</div>
                <div
                    draggable
                    id={splitId}
                    className={thisCss["SplitPanel-splitter"]}
                    onDrag={onDrag}
                    onMouseEnter={undefined}
                    style={{ left: splitterX }}
                ></div>
                <div id={panel2Id} className={thisCss["SplitPanel-panel2"]} style={{ width: `calc(100% - ${splitterX}px)` }}>{props.panel2}</div>

            </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default SplitPanel;