import React from "react";
import { createRoot } from "react-dom/client";
import { getElementById, getOrCreateDiv, getOrCreateTag } from "../../../extensions/ElementExtension";
import { guid8 } from "../../../extensions/HashFuncs";
import { sleep } from "../../../extensions/ThreadExtension";
import thisCss from './Dialog.module.scss';

export enum ConfirmButtons {
    None,
    YesNo,
    YesNoCancel,
    Ok,
    OkClose,
    Close,
    OkCancel,
    Cancel
}
export enum DialogResult {
    Close,
    Yes = 1,
    No = 2,
    Cancel = 3,
    Ok = 1
}

export type DialogOptions = {
    id?: string,
    title?: any,
    body?: any,
    confirmButtons?: ConfirmButtons,
    onPreAcceptHandler?: (...args: any) => boolean,
    onAcceptHandler?: (...args: any) => void,
    onPreDenyHandler?: (...args: any) => boolean,
    onDenyHandler?: (...args: any) => void,
    onPreCancelHandler?: (...args: any) => boolean,
    onCancelHandler?: (...args: any) => void,
    className?: string,
    bodyClassName?: string,
    zIndex?: number
};

function closeModal(modalId: string) {
    try {
        if (modalId) {
            const modalDiv = document.getElementById(modalId);
            if (modalDiv) {
                modalDiv.remove();
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}
function actionClickHandler(evt: React.MouseEvent, onPreClick?: (...args: any) => boolean, onClick?: (...args: any) => void, dialogId?: string, result?: DialogResult): DialogResult {
    try {
        let accepted = true;
        if (onPreClick != undefined) {
            accepted = onPreClick(evt);
        }
        if (accepted) {
            closeModal(dialogId);
            if (onClick != undefined) {
                onClick(evt);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    return result;
}
function yesClickHandler(evt: React.MouseEvent, onClick: (...args: any) => void, dialogId: string, onPreClick: (...args: any) => boolean): DialogResult {
    return actionClickHandler(evt, onPreClick, onClick, dialogId, DialogResult.Yes);
}
function noClickHandler(evt: React.MouseEvent, onClick: (...args: any) => void, dialogId: string, onPreClick: (...args: any) => boolean): DialogResult {
    return actionClickHandler(evt, onPreClick, onClick, dialogId, DialogResult.No);
}
function cancelClickHandler(evt: React.MouseEvent, onClick: (...args: any) => void, dialogId: string, onPreClick: (...args: any) => boolean): DialogResult {
    return actionClickHandler(evt, onPreClick, onClick, dialogId, DialogResult.Cancel);
}

export async function openDialog(options?: DialogOptions): Promise<DialogResult> {
    let result = DialogResult.Close;
    try {
        const dialogId = options?.id ?? guid8();
        const butId = `${dialogId}-but`;
        const dialogDiv = getOrCreateTag(dialogId, "div", undefined, true) as HTMLDivElement;

        const root = createRoot(dialogDiv);

        let confirmButtonGroup = undefined;
        if (options?.confirmButtons === ConfirmButtons.YesNo) {
            confirmButtonGroup = (<>
                <button className={thisCss.button} onClick={evt => yesClickHandler(evt, options?.onAcceptHandler, dialogId, options?.onPreAcceptHandler)}>Yes</button>
                <button id={butId} className={thisCss.button} onClick={evt => noClickHandler(evt, options?.onDenyHandler, dialogId, options?.onPreDenyHandler)}>No</button>
            </>);
        }
        else if (options?.confirmButtons === ConfirmButtons.YesNoCancel) {
            confirmButtonGroup = (<>
                <button className={thisCss.button} onClick={evt => yesClickHandler(evt, options?.onAcceptHandler, dialogId, options?.onPreAcceptHandler)}>Yes</button>
                <button className={thisCss.button} onClick={evt => noClickHandler(evt, options?.onDenyHandler, dialogId, options?.onPreDenyHandler)}>No</button>
                <button id={butId} className={thisCss.button} onClick={evt => cancelClickHandler(evt, options?.onCancelHandler, dialogId, options?.onPreCancelHandler)}>Cancel</button>
            </>);
        }
        else if (options?.confirmButtons === ConfirmButtons.Ok) {
            confirmButtonGroup = (<>
                <button id={butId} className={thisCss.button} onClick={evt => yesClickHandler(evt, options?.onAcceptHandler, dialogId, options?.onPreAcceptHandler)}>Ok</button>
            </>);
        }
        else if (options?.confirmButtons === ConfirmButtons.OkClose) {
            confirmButtonGroup = (<>
                <button className={thisCss.button} onClick={evt => yesClickHandler(evt, options?.onAcceptHandler, dialogId, options?.onPreAcceptHandler)}>Ok</button>
                <button id={butId} className={thisCss.button} onClick={evt => closeModal(dialogId)}>Close</button>
            </>);
        }
        else if (options?.confirmButtons === ConfirmButtons.OkCancel) {
            confirmButtonGroup = (<>
                <button className={thisCss.button} onClick={evt => yesClickHandler(evt, options?.onAcceptHandler, dialogId, options?.onPreAcceptHandler)}>Ok</button>
                <button id={butId} className={thisCss.button} onClick={evt => cancelClickHandler(evt, options?.onCancelHandler, dialogId, options?.onPreCancelHandler)}>Cancel</button>
            </>);
        }
        else if (options?.confirmButtons === ConfirmButtons.Cancel) {
            confirmButtonGroup = (<>
                <button id={butId} className={thisCss.button} onClick={evt => cancelClickHandler(evt, options?.onCancelHandler, dialogId, options?.onPreCancelHandler)}>Cancel</button>
            </>);
        }
        else if (options?.confirmButtons === ConfirmButtons.None) {
            confirmButtonGroup = (undefined);
        }
        else {
            confirmButtonGroup = (<>
                <button id={butId} className={thisCss.button} onClick={evt => closeModal(dialogId)}>Close</button>
            </>);
        }

        let contentsClassName = thisCss.contents;
        if (options.className) {
            contentsClassName += " " + options.className;
        }

        let bodyClassName = thisCss.body;
        if (options.bodyClassName) {
            bodyClassName += " " + options.bodyClassName;
        }

        const zIndex = options.zIndex ?? 1;

        root.render(<div className={thisCss.dialog}>
            <div id={`${dialogId}-background`} className={thisCss.background} style={{ zIndex: zIndex + 1 }} />
            <div id={`${dialogId}-main`} className={thisCss.main} style={{ zIndex: zIndex + 2 }}>
                <div className={contentsClassName}>
                    <div className={thisCss.title}>{options?.title}</div>
                    <div className={bodyClassName}>{options?.body}</div>
                    <div className={thisCss.buttonGroup}>
                        {confirmButtonGroup}
                    </div>
                </div>
            </div>
        </div>);

        await sleep(1);
        getElementById(butId)?.focus();
    }
    catch (e) {
        console.log(e);
    }
    return result;
}


export function openProcessing(options?: {
    title?: string,
    id?: string,
    onCancelHandler?: (...args: any) => any,

}) {
    try {
        const dialogId = options?.id ?? guid8();

        const dialogDiv = getOrCreateTag(dialogId, "div") as HTMLDivElement;

        const root = createRoot(dialogDiv);

        let cancelButton = undefined;
        if (true) {
            cancelButton = <div><button className={thisCss.button} onClick={evt => cancelClickHandler(evt, options?.onCancelHandler, dialogId, undefined)}>Cancel</button></div>;
        }

        root.render(<div className={thisCss.dialog}>
            <div className={thisCss.background} />
            <div className={thisCss.main}>
                <div className={thisCss.contents}>
                    <div className={thisCss.title}>{options?.title ?? ''}</div>
                    <div className={thisCss.body}>
                        Processing...
                    </div>
                    <div className={thisCss.buttonGroup}>
                        {cancelButton}
                    </div>
                </div>
            </div>
        </div>);


    }
    catch (e) {
        console.log(e);
    }
}
export function closeProcessing(id: string) {
    closeModal(id);
}
export function closeDialog(id: string) {
    closeModal(id);
}

interface openFileResult {
    files?: File[],
}
interface openOptions {
    multiple?: boolean,
    isFolderPicker?: boolean,
    extensions?: string[],
    onSelected: (openFileResult: openFileResult) => void
}

export function openFile(opts: openOptions) {
    const input = document.createElement("input");
    input.type = "file";
    input.hidden = true;
    input.multiple = opts?.multiple;
    if (opts.isFolderPicker) {
        input.setAttribute("webkitdirectory", "true");
        input.setAttribute("directory", "");
    }
    if (opts.extensions?.length > 0) {
        input.accept = opts.extensions.join(",");
    }
    input.onchange = _ => {
        if (input.files?.length > 0 && opts.onSelected) {
            opts.onSelected({ files: [...input.files] });
        }
    };
    input.click();
}