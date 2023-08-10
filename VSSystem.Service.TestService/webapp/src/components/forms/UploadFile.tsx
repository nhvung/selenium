import { ChangeEvent, useEffect, useState } from 'react';
import { getElementById } from '../../extensions/ElementExtension';
import { guid8 } from '../../extensions/HashFuncs';
import { uploadFilesAsync } from '../../extensions/HttpExtension';
import { sleep } from '../../extensions/ThreadExtension';
import { componentProps } from '../componentDefine';
import thisCss from './UploadFile.module.scss';
function UploadFile(props?: componentProps & {
    text?: string,
    multiple?: boolean,
    webkitdirectory?: boolean,
    uploadUrl?: string,
    headers?: any,
    browseButtonText?: string,
    accept?: string,
    uploadOnChange?: boolean
}) {
    const thisId = props.id ?? guid8();
    const fileId = `${thisId}-file`;

    const [files, SetFiles] = useState<FileList>(undefined);

    let className = thisCss["UploadFile"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    useEffect(() => {
        const file = getElementById(fileId) as HTMLInputElement;
        if (file) {
            if (props.webkitdirectory) {
                file.setAttribute('webkitdirectory', "true");
            }
        }
    }, []);

    function browseFile() {
        const file = getElementById(fileId) as HTMLInputElement;
        if (file) {
            file.click();
        }
    }

    async function onFileChanged(evt?: ChangeEvent<HTMLInputElement>) {
        try {
            SetFiles(evt.currentTarget.files);
            if (props.uploadOnChange) {
                await sleep(100);
                await upload();
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async function upload() {
        try {
            if (files?.length > 0 && props.uploadUrl) {
                const headers = props.headers;
                await uploadFilesAsync(props.uploadUrl, files, headers, async response => console.log(await response.json()));
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    try {
        let fileInfoElement = undefined;
        if (files?.length > 0) {
            if (files.length == 1) {
                fileInfoElement = (<input key={guid8()} type="text" readOnly defaultValue={files[0].name} />);
            }
            else {

                fileInfoElement = (<input key={guid8()} type="text" readOnly defaultValue={`${files.length} files`} />);
            }
        }
        let contents = (<div id={thisId} className={className}>
            <input id={fileId}
                type="file"
                className={thisCss["UploadFile-file"]}
                onChange={onFileChanged}
                multiple={props.multiple}
                accept={props.accept}
                key={guid8()}
            />
            <button onClick={browseFile}>{props.browseButtonText ?? "Browse"}</button>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default UploadFile;