import { useEffect, useRef } from 'react';
import thisCss from './Filters.module.scss';
import childCss from './FilterItem.module.scss';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';

function Filters(props: componentProps & {
    dock?: string
}) {

    const filterRef = useRef<HTMLDivElement>();
    const thisId = props.id ?? guid8();

    useEffect(() => {
        document.addEventListener('click', (evt: MouseEvent) => onFocus(evt));
        return () => {
            document.removeEventListener('click', (evt: MouseEvent) => onFocus(evt));
        }
    }, []);

    function onFocus(evt: MouseEvent) {

        let popupClasses = [
            {
                show: childCss["FilterItem-box-container"],
                hide: childCss["FilterItem-box-container-hide"]
            },
        ];

        popupClasses.forEach(popupCls => {
            const popupClassName = popupCls.show;
            const hidePopupClassName = popupCls.hide;
            let filterId: string = undefined;
            const itemClassName = childCss.FilterItem;
            var subItemObjs = document.getElementsByClassName(itemClassName) as HTMLCollectionOf<HTMLDivElement>;
            if (subItemObjs?.length > 0) {

                Array.from(subItemObjs).forEach(ite => {
                    // const popupId = `${ite.id}-box-container`;
                    var iteRect = ite.getBoundingClientRect();
                    if (evt.clientX >= iteRect.left && evt.clientX <= iteRect.right
                        && evt.clientY >= iteRect.top && evt.clientY <= iteRect.bottom) {
                        filterId = ite.id;
                    }
                });

            }
            if (!filterId) {
                let popupDiv: HTMLDivElement = undefined;
                var popupItems = document.getElementsByClassName(popupClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (popupItems?.length > 0) {
                    Array.from(popupItems).forEach(ite => {
                        var iteRect = ite.getBoundingClientRect();
                        if (evt.clientX >= iteRect.left && evt.clientX <= iteRect.right
                            && evt.clientY >= iteRect.top && evt.clientY <= iteRect.bottom) {
                            popupDiv = ite;
                        }
                        if (!ite.classList.contains(hidePopupClassName)) {
                            ite.classList.add(hidePopupClassName);
                        }
                    });
                }
                if (popupDiv) {
                    const treeId = popupDiv.getAttribute('tree-id');
                    if (treeId) {
                        if (popupItems?.length > 0) {
                            Array.from(popupItems).forEach(ite => {
                                const iteTreeId = ite.getAttribute('tree-id');
                                if (iteTreeId === treeId) {
                                    ite.classList.remove(hidePopupClassName);
                                }
                            });
                        }
                    }
                    popupDiv.classList.remove(hidePopupClassName);
                }
            }
            else {
                let popupDiv: HTMLDivElement = undefined;
                var popupItems = document.getElementsByClassName(popupClassName) as HTMLCollectionOf<HTMLDivElement>;
                if (popupItems?.length > 0) {
                    Array.from(popupItems).forEach(ite => {
                        if (!ite.classList.contains(hidePopupClassName)) {
                            if (ite.id === `${filterId}-box-container`) {
                                popupDiv = ite;
                            }
                            ite.classList.add(hidePopupClassName);

                        }
                    });
                }
                if (popupDiv) {
                    popupDiv.classList.remove(hidePopupClassName);
                }
            }
        });


    }

    let className = thisCss["Filters"] ?? '';
    if (props.dock) {
        className += ` ${thisCss[props.dock] ?? ''}`;
    }
    if (props.className) {
        className += ` ${props.className}`;
    }
    let contents = <div id={thisId} className={className} ref={filterRef} style={props.style}>
        {props.children}
    </div>;
    return contents;
}
export default Filters;