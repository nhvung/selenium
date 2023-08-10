import React from 'react';
import { guid8 } from '../../extensions/HashFuncs';
import { componentProps } from '../componentDefine';
import { ConfirmButtons, openDialog } from './dialog/Dialog';
import thisCss from './Switch.module.scss';
function Switch(props?: componentProps & {
    checked?: boolean,
    value?: any,
    onClick?: (evt?: React.MouseEvent, chkValue?: boolean) => boolean,
    confirmOptions?: {
        title?: string,
        body?: any,
        onQuestionHandler?: (...args: any) => any,
        onAcceptHandler?: (...args: any) => any,
        onDenyHandler?: (...args: any) => any,
    }
}) {
    const thisId = props.id ?? guid8();

    function onClick(evt: React.MouseEvent) {
        try {
            const chk = document.getElementById(`${thisId}-chk`) as HTMLInputElement;
            const slider = document.getElementById(`${thisId}-slider`) as HTMLSpanElement;
            const pendingClassName = thisCss["Switch-slider-pending"];
            if (chk && slider) {
                const chkValue = chk.checked;
                const value = chk.value;
                if (props.confirmOptions) {
                    if (!slider.classList.contains(pendingClassName)) {
                        slider.classList.add(pendingClassName);
                    }

                    if (props.confirmOptions.onQuestionHandler) {
                        props.confirmOptions.onQuestionHandler(chkValue, value);
                    }
                    openDialog({
                        body: props.confirmOptions.body,
                        title: props.confirmOptions.title,
                        confirmButtons: ConfirmButtons.YesNo,
                        onAcceptHandler: () => {
                            props.confirmOptions.onAcceptHandler(chkValue, value);
                        },
                        onDenyHandler: () => {
                            props.confirmOptions.onDenyHandler(chkValue, value);
                            chk.checked = chkValue;
                            if (slider.classList.contains(pendingClassName)) {
                                slider.classList.remove(pendingClassName);
                            }
                        }
                    });
                }

                if (props.onClick) {
                    props.onClick(evt, chkValue);
                }
            }
        }
        catch (e) {
        }
    }

    try {

        let className = thisCss["Switch"];
        if (props?.className) {
            className += ` ${props.className}`;
        }
        let contents = (<label className={className} id={thisId} >
            <input id={`${thisId}-chk`} type={"checkbox"} defaultChecked={props.checked ?? false} className={thisCss["Switch-input"]} defaultValue={props.value} />
            <span id={`${thisId}-slider`} className={thisCss["Switch-slider"]} onClick={onClick}></span>
        </label>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Switch;