import React from 'react';
import { getElementById } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import TextFilter from '../filters/TextFilter';
import { BackupExcludeCondition, excludeConditionProps, FolderInfoProps } from './Define';
import thisCss from './FolderInfo.module.scss';


function FolderInfo(props?: componentProps & {
    onChange?: (info?: FolderInfoProps) => void,
    excludeCondition?: excludeConditionProps
}) {
    const thisId = props.id ?? guid8();
    const excludeCondition = props.excludeCondition ?? BackupExcludeCondition;



    function onChange() {
        try {
            const txtPath = getElementById(`${thisId}-path`) as HTMLInputElement;


            const info: FolderInfoProps = {
                FolderPath: undefined,
            };
            if (txtPath?.value != '') {
                info.FolderPath = txtPath.value;
            }
            const chk = getElementById(`${thisId}-chk-exclude-conditions`) as HTMLInputElement;
            if (chk?.checked) {
                const txtExcludeFileNames = getElementById(`${thisId}-execlude-filenames`) as HTMLInputElement;
                const txtExcludeFolderNames = getElementById(`${thisId}-execlude-foldernames`) as HTMLInputElement;
                const txtExcludeExtensions = getElementById(`${thisId}-execlude-extensions`) as HTMLInputElement;
                const txtExcludeFilePrefixNames = getElementById(`${thisId}-execlude-fileprefixnames`) as HTMLInputElement;
                const txtExcludeFolderPrefixNames = getElementById(`${thisId}-execlude-folderprefixnames`) as HTMLInputElement;
                info.ExcludeCondition = {
                    FileNames: txtExcludeFileNames?.value?.split(','),
                    FolderNames: txtExcludeFolderNames?.value?.split(', '),
                    FileExtensions: txtExcludeExtensions?.value?.split(','),
                    FilePrefixNames: txtExcludeFilePrefixNames?.value?.split(','),
                    FolderPrefixNames: txtExcludeFolderPrefixNames?.value?.split(','),
                };
            }
            if (props.onChange) {
                props.onChange(info);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    function checkExcludeConditionsClick(evt: React.MouseEvent) {
        try {
            const chk = getElementById(`${thisId}-chk-exclude-conditions`) as HTMLInputElement;
            const div = getElementById(`${thisId}-exclude-conditions`) as HTMLDivElement;
            const excludeConditionsDisabledClassName = thisCss["FolderInfo-input-exclude-disabled"];

            if (chk && div) {
                chk.checked = !chk.checked;
                if (chk.checked) {
                    div.classList.remove(excludeConditionsDisabledClassName);
                }
                else {
                    div.classList.add(excludeConditionsDisabledClassName);
                }
            }
            onChange();
        }
        catch (e) {
            console.log(e);
        }
    }

    let className = thisCss["FolderInfo"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["FolderInfo-input"]} >
                <label>Path:</label>
                <TextFilter id={`${thisId}-path`} text='' onChange={onChange} onClear={onChange} />
            </div>
            <div className={thisCss["FolderInfo-input-exclude"]} onClick={evt => checkExcludeConditionsClick(evt)}>
                <span><input id={`${thisId}-chk-exclude-conditions`} type="checkbox" onClick={evt => checkExcludeConditionsClick(evt)} /></span>
                <span>Exclude Conditions</span>
            </div>
            <div id={`${thisId}-exclude-conditions`} className={thisCss["FolderInfo-input-exclude-disabled"]}>
                <div className={thisCss["FolderInfo-input"]} >
                    <label>File Names:</label>
                    <TextFilter id={`${thisId}-execlude-filenames`} defaultValue={excludeCondition.FileNames?.join(", ")} onChange={onChange} onClear={onChange} />
                </div>
                <div className={thisCss["FolderInfo-input"]} >
                    <label>Folder Names:</label>
                    <TextFilter id={`${thisId}-execlude-foldernames`} defaultValue={excludeCondition.FolderNames?.join(", ")} onChange={onChange} onClear={onChange} />
                </div>
                <div className={thisCss["FolderInfo-input"]} >
                    <label>Extensions:</label>
                    <TextFilter id={`${thisId}-execlude-extensions`} defaultValue={excludeCondition.FileExtensions?.join(", ")} onChange={onChange} onClear={onChange} />
                </div>
                <div className={thisCss["FolderInfo-input"]} >
                    <label>File Prefix Names:</label>
                    <TextFilter id={`${thisId}-execlude-fileprefixnames`} defaultValue={excludeCondition.FilePrefixNames?.join(", ")} onChange={onChange} onClear={onChange} />
                </div>
                <div className={thisCss["FolderInfo-input"]} >
                    <label>Folder Prefix Names:</label>
                    <TextFilter id={`${thisId}-execlude-folderprefixnames`} defaultValue={excludeCondition.FolderPrefixNames?.join(", ")} onChange={onChange} onClear={onChange} />
                </div>
            </div>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default FolderInfo;