import { useEffect, useRef, useState } from 'react';
import { guid8, hash } from '../../extensions/HashFuncs';
import { componentProps } from '../componentDefine';
import thisCss from './Authenticate.module.scss';
import AutoCompleteTextbox from './AutoCompleteTextbox';
import { closeProcessing, ConfirmButtons, openDialog, openProcessing } from './dialog/Dialog';

export enum AuthenticationType {
    UsernameAndPassword = "u&p",
    Code = "code"
}
export interface SubmitProps {
    apiUrl?: string,
    username: string,
    sha512password?: string,
    clearpassword?: string
}

function Authenticate(props?: componentProps & {
    logoPath?: string,
    title?: string,
    type?: AuthenticationType,
    apiUrlOptionsHandler?: () => string[],
    apiUrlOptions?: string[],
    submitHandler: (submit: SubmitProps) => Promise<any> | undefined
    successHandler: (...args: any) => Promise<any> | undefined
}) {
    const thisId = props.id ?? guid8();
    const thisRef = useRef();
    const [hasDialog, setHasDialog] = useState(false);

    const authType = props.type ?? AuthenticationType.UsernameAndPassword;
    const keyDownHandler = (evt: React.KeyboardEvent) => {
        try {
            if (evt.code === "Enter" || evt.code === "NumpadEnter") {
                evt.preventDefault();
                console.log(evt.currentTarget);
                onSubmit();
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    async function onSubmit() {
        try {


            const apiUrl = (document.getElementById(`${thisId}-api-url`) as HTMLInputElement)?.value;
            const username = (document.getElementById(`${thisId}-username`) as HTMLInputElement)?.value;
            const password = (document.getElementById(`${thisId}-password`) as HTMLInputElement)?.value;

            if (!apiUrl && (props.apiUrlOptions || props.apiUrlOptionsHandler)) {
                if (!hasDialog) {
                    setHasDialog(true);
                    openDialog({

                        title: props.title ?? 'Authentication',
                        body: <div>Please input api url</div>,
                        confirmButtons: ConfirmButtons.Ok,
                        onAcceptHandler: () => { setHasDialog(false); }
                    });

                }
                return;
            }
            else {
                setHasDialog(false);
            }
            if (!username) {
                if (!hasDialog) {
                    setHasDialog(true);
                    openDialog({

                        title: props.title ?? 'Authentication',
                        body: <div>Please input username</div>,
                        confirmButtons: ConfirmButtons.Ok,
                        onAcceptHandler: () => { setHasDialog(false); }
                    });
                }

                return;
            }
            else {
                setHasDialog(false);
            }
            if (!password) {
                if (!hasDialog) {
                    setHasDialog(true);
                    openDialog({

                        title: props.title ?? 'Authentication',
                        body: <div>Please input password</div>,
                        confirmButtons: ConfirmButtons.Ok,
                        onAcceptHandler: () => { setHasDialog(false); }
                    });
                }

                return;
            }
            else {
                setHasDialog(false);
            }

            let sha512password = undefined;
            if (password.length === 128) {
                try {
                    sha512password = await hash(password, 'sha-512');
                }
                catch (e) {
                    console.log(e);
                }
            }

            if (props.submitHandler) {
                const submitObj: SubmitProps = { username, apiUrl, sha512password };
                if (!sha512password) {
                    submitObj.clearpassword = password;
                }
                const dialogId = guid8();
                openProcessing({
                    id: dialogId,
                    title: props.title ?? 'Authentication'
                });

                await props.submitHandler(submitObj)
                    .then(async (data) => {

                        if (data == 'success' || data === 200) {

                            if (props.successHandler) {
                                await props.successHandler(apiUrl, username)
                                    .then(() => closeProcessing(dialogId));
                            }
                            else {
                                closeProcessing(dialogId);
                            }

                        }
                        else {
                            closeProcessing(dialogId);
                            openDialog({
                                id: dialogId,
                                title: props.title ?? 'Authentication',
                                body: <div>{data ?? "Authentication invalid."}</div>,
                                confirmButtons: ConfirmButtons.Ok,
                            });
                        }

                    })
                    .catch(err => {
                        closeProcessing(dialogId);
                        console.log(err);
                        openDialog({
                            id: dialogId,
                            title: props.title ?? 'Authentication',
                            body: <div>{err}</div>,
                            confirmButtons: ConfirmButtons.Ok,
                        });
                    });
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    try {
        let className = thisCss["Authenticate"];
        if (props?.className) {
            className += ` ${props.className}`;
        }

        let logoDiv = undefined;
        if (props.logoPath) {
            logoDiv = (<div className={thisCss["Authenticate-logo"]}>
                <img src={props.logoPath} />
            </div>);
        }
        let titleDiv = undefined;
        if (props.title) {
            titleDiv = (<div className={thisCss["Authenticate-title"]}>{props.title}</div>);
        }

        let authenticateDiv = undefined;
        let tabIndex = 0;
        let apiUrlDiv = undefined;
        if (props.apiUrlOptions || props.apiUrlOptionsHandler) {
            apiUrlDiv = (<AutoCompleteTextbox
                id={`${thisId}-api-url`}
                type={"text"}
                placeholder="Api url"
                optionsHandler={() => Promise.resolve(props.apiUrlOptionsHandler())}
                options={props.apiUrlOptions}
                tabIndex={++tabIndex}
            />);
        }

        if (authType == AuthenticationType.UsernameAndPassword) {

            let usernameDiv = (<AutoCompleteTextbox
                id={`${thisId}-username`}
                type={"text"}
                placeholder="Username"
                tabIndex={++tabIndex}
            />);
            let passwordDiv = (<AutoCompleteTextbox
                id={`${thisId}-password`}
                type={"password"}
                placeholder="Password"
                tabIndex={++tabIndex}
            />);

            authenticateDiv = (<>
                {apiUrlDiv}
                {usernameDiv}
                {passwordDiv}
            </>);


        }
        else if (authType == AuthenticationType.Code) {
            let usernameDiv = (<AutoCompleteTextbox
                id={`${thisId}-username`}
                type={"text"}
                placeholder="Email"
                tabIndex={++tabIndex}
            />);
            authenticateDiv = (<>
                {apiUrlDiv}
                {usernameDiv}
            </>);
        }

        let submitDiv = (<div>
            <button tabIndex={++tabIndex} className={thisCss["Authenticate-submit"]} onClick={onSubmit} type="submit" value="Submit">Submit</button>
        </div>);

        let contents = (
            <div
                ref={thisRef}
                className={className}
                onKeyDown={keyDownHandler}
            >
                {logoDiv}
                {titleDiv}
                {authenticateDiv}
                {submitDiv}
            </div>
        );
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Authenticate;