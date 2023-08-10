import { useEffect, useState } from 'react';
import { getElementById } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { sleep } from '../../../extensions/ThreadExtension';
import { componentProps } from '../../componentDefine';
import thisCss from './HorizontalSplitPanel.module.scss';
function HorizontalSplitPanel(props?: componentProps & {
    panel1?: any,
    panel2?: any,
    minsize?: number,
    maxsize?: number
}) {
    const [thisId, setId] = useState(props.id ?? guid8());

    const splitId = `${thisId}-splitter`;
    const panel1Id = `${thisId}-panel1`;
    const panel2Id = `${thisId}-panel2`;

    let className = thisCss["HorizontalSplitPanel"];
    const [splitterY, setSplitterY] = useState<number>(props.minsize ?? 0);

    useEffect(() => {
        const thisDiv = getElementById(thisId);
        const panel1 = getElementById(panel1Id);
        if (panel1 && thisDiv) {
            const thisRect = thisDiv.getBoundingClientRect();
            let x = splitterY;
            if (!splitterY || splitterY <= 0) {
                x = thisRect.height * 0.3;
            }

            setSplitterY(x);
        }

    }, []);

    function onDrag(evt?: React.DragEvent<HTMLDivElement>) {
        evt.preventDefault();
        const thisDiv = getElementById(thisId);
        if (thisDiv) {
            const thisRect = thisDiv.getBoundingClientRect();
            if (thisRect?.height > 0) {
                const minTop = thisRect.top + (props.minsize ?? 0);
                const maxTop = props.maxsize > 0 ? thisRect.top + props.maxsize : thisRect.bottom;
                let x = evt.clientY - thisRect.top;
                if (x > 0) {
                    if (x > maxTop) {
                        x = maxTop;
                    }
                    if (x < minTop) {
                        x = minTop;
                    }
                }

                if (x > 0 && x != splitterY) {
                    setSplitterY(x);
                }
            }
        }
    }

    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}>
            <div id={panel1Id} className={thisCss["HorizontalSplitPanel-panel1"]} style={{ height: splitterY }}>{props.panel1}</div>
            <div draggable
                id={splitId}
                className={thisCss["HorizontalSplitPanel-splitter"]}
                onDrag={onDrag}
                style={{ top: splitterY }}
            ></div>
            <div id={panel2Id} className={thisCss["HorizontalSplitPanel-panel2"]} style={{ height: `calc(100% - ${splitterY}px)` }}>{props.panel2}</div>

        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default HorizontalSplitPanel;