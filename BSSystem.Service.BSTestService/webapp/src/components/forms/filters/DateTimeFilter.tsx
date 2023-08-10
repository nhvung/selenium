import baseCss from './FilterItem.module.scss';
import thisCss from './DateTimeFilter.module.scss';
import { guid8 } from '../../../extensions/HashFuncs';
import { getOrCreateDiv, showElementRelative } from '../../../extensions/ElementExtension';
import { createRoot, Root } from 'react-dom/client';
import DateTimePicker from '../DateTimePicker';
import React, { useState } from 'react';
import { sleep } from '../../../extensions/ThreadExtension';
import { componentProps } from '../../componentDefine';
function DateTimeFilter(props?: componentProps & FilterItemProps & {
    showTime?: boolean,
    startTimeId?: string,
    endTimeId?: string,
    applyClick?: (evt: React.MouseEvent, value: any) => void
}) {
    let thisId = props.id ?? guid8();
    let startTimeId = props?.startTimeId ?? guid8();
    let endTimeId = props?.endTimeId ?? guid8();
    let treeId = guid8();
    let startTimeValue = '', endTimeValue = '';
    let setTimeValues: any;
    [{ startTimeValue, endTimeValue }, setTimeValues] = useState({ startTimeValue: '', endTimeValue: '' });

    function hideAllPopup() {
        try {
            const popupClassName = baseCss["FilterItem-box-container"];
            const hidePopupClassName = baseCss["FilterItem-box-container-hide"];
            const popupItems = document.getElementsByClassName(popupClassName) as HTMLCollectionOf<HTMLDivElement>;
            if (popupItems?.length > 0) {
                Array.from(popupItems).forEach(ite => {
                    if (!ite.classList.contains(hidePopupClassName)) {
                        ite.classList.add(hidePopupClassName);
                    }
                });
            }
        }
        catch (e) {
        }
    }

    function onApplyClick(evt: React.MouseEvent) {
        try {

            hideAllPopup();
            let fromTimeValue = '', toTimeValue = '';
            const fromTimeDiv = document.getElementById(startTimeId) as HTMLInputElement;
            if (fromTimeDiv) {
                fromTimeValue = fromTimeDiv.value;
            }
            const toTimeDiv = document.getElementById(endTimeId) as HTMLInputElement;
            if (toTimeDiv) {
                toTimeValue = toTimeDiv.value;
            }
            setTimeValues({ startTimeValue: fromTimeValue, endTimeValue: toTimeValue });
            if (props.applyClick) {
                props.applyClick(evt, { fromTimeValue, toTimeValue });
            }

        }
        catch (e) {
        }
    }

    let popupRoot: Root | undefined;
    function onClick(evt: React.MouseEvent) {
        try {
            const thisDiv = document.getElementById(thisId);
            hideAllPopup();
            const popupClassName = baseCss["FilterItem-box-container"];
            const thisPopupClassName = thisCss["DateTimeFilter-box-container"];
            const hidePopupClassName = baseCss["FilterItem-box-container-hide"];
            const popupId = `${thisId}-box-container`;
            let popupDiv = getOrCreateDiv(popupId, thisDiv);
            popupDiv.setAttribute('tree-id', treeId);
            if (!popupRoot) {
                popupRoot = createRoot(popupDiv);
            }

            let selectTimeTitle = "Select a date";
            if (props.showTime) {
                selectTimeTitle = "Select a date & time";
            }
            let startTime = (<fieldset>
                <legend>From</legend>
                <div>
                    <input id={startTimeId} type={"text"} readOnly defaultValue={startTimeValue} />
                    <div>
                        <button title='Clear' onClick={() => clearTime(startTimeId)}>&#x2715;</button>
                        <button title={selectTimeTitle} onClick={evt => pickDateTime(evt, startTimeId)}>&#9871;</button>
                    </div>
                </div>
            </fieldset >);

            let endTime = (<fieldset>
                <legend>To</legend>
                <div>
                    <input id={endTimeId} type={"text"} readOnly defaultValue={endTimeValue} />
                    <div>
                        <button title='Clear' onClick={() => clearTime(endTimeId)}>&#x2715;</button>
                        <button title={selectTimeTitle} onClick={evt => pickDateTime(evt, endTimeId)}>&#9871;</button>
                    </div>
                </div>
            </fieldset>);

            let confirmButtons = (<div className={thisCss["DateTimeFilter-button-group"]}>
                <button onClick={onApplyClick}>Apply</button>
                <button onClick={async () => {
                    await sleep(1);
                    hideAllPopup();
                }}>Cancel</button>
            </div>);
            popupRoot.render(<>
                {startTime}
                {endTime}
                {confirmButtons}
            </>);

            if (!popupDiv.classList.contains(popupClassName)) {
                popupDiv.classList.add(popupClassName);
                if (!popupDiv.classList.contains(thisPopupClassName)) {
                    popupDiv.classList.add(thisPopupClassName);
                }
            }
            if (popupDiv.classList.contains(hidePopupClassName)) {
                popupDiv.classList.remove(hidePopupClassName);
            }
            showElementRelative(popupDiv, evt);
        }
        catch (e) {
            console.log(e);
        }
    }

    function clearTime(id?: string) {
        try {
            closeDtpPopup();
            (document.getElementById(id) as HTMLInputElement).value = '';
        }
        catch (e) {
        }

    }
    function setTime(id?: string, value?: string) {
        try {
            (document.getElementById(id) as HTMLInputElement).value = value;
        }
        catch (e) {
        }

    }

    async function closeDtpPopup() {
        const popupId = `${thisId}-box-container`;
        const dtpPopupId = `${popupId}-dtp-popup`;
        const popupDiv = document.getElementById(popupId) as HTMLDivElement;
        const dtpPopupDiv = document.getElementById(dtpPopupId) as HTMLDivElement;
        const hidePopupClassName = baseCss["FilterItem-box-container-hide"];
        if (popupDiv) {
            if (popupDiv.classList.contains(hidePopupClassName)) {
                popupDiv.classList.remove(hidePopupClassName);
            }
        }
        if (dtpPopupDiv) {
            await sleep(1);
            if (dtpRoot) {
                dtpRoot.unmount();
            }
            dtpPopupDiv.remove();
        }
    }
    let dtpRoot: Root | undefined;
    function pickDateTime(evt: React.MouseEvent, id?: string) {
        try {
            const dtpInput = document.getElementById(id) as HTMLInputElement;
            if (dtpInput) {
                const popupClassName = baseCss["FilterItem-box-container"];
                const thisPopupClassName = thisCss["DateTimeFilter-box-container"];
                const hidePopupClassName = baseCss["FilterItem-box-container-hide"];
                const popupId = `${thisId}-box-container`;
                const dtpPopupId = `${popupId}-dtp-popup`;
                const initDateTimeValue = dtpInput.value;

                let popupDiv = getOrCreateDiv(dtpPopupId);
                popupDiv.setAttribute('tree-id', treeId);

                dtpRoot = createRoot(popupDiv);
                dtpRoot.render(<DateTimePicker
                    id={guid8()}
                    showTime={props?.showTime}
                    showConfirm
                    initDateTime={initDateTimeValue}
                    okClick={(timeValue: string) => {
                        closeDtpPopup();
                        setTime(id, timeValue);
                    }}
                    cancelClick={closeDtpPopup}

                // updateTimeValue={(value: any) => setDtpValue(startTimeId, value)}
                />);
                if (!popupDiv.classList.contains(popupClassName)) {
                    popupDiv.classList.add(popupClassName);
                }
                if (popupDiv.classList.contains(hidePopupClassName)) {
                    popupDiv.classList.remove(hidePopupClassName);
                }
                showElementRelative(popupDiv, evt, 'right', 20);
            }
        }
        catch (e) {
        }
    }
    try {
        let className = `${baseCss.FilterItem ?? ''} ${thisCss.DateTimeFilter ?? ''}`;
        if (props?.className) {
            className += ` ${props.className}`;
        }
        let contents = (<div id={thisId} key={thisId} className={className} onClick={onClick}>
            <span className={thisCss['content']}>{props.text ?? `Date${props.showTime ? ' & Time' : undefined} Filter`}</span>
            <span className={thisCss["expand-icon"]}>&#9662;</span>
        </div >);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default DateTimeFilter;