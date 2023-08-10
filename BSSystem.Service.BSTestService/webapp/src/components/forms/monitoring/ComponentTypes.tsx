import { useEffect, useState } from 'react';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './ComponentTypes.module.scss';
import DatabaseInfo from './DatabaseInfo';
import { DatabaseProps, FolderInfoProps } from './Define';
import FolderInfo from './FolderInfo';
export interface componentTypeProps {
    type?: string,
    params?: DatabaseProps | FolderInfoProps
}
function ComponentTypes(props?: componentProps & {
    onChange?: (info?: componentTypeProps) => void,
    includeFolder?: boolean,
    includeDatabase?: boolean
}) {
    const thisId = props.id ?? guid8();
    const [componentType, setComponentType] = useState<string>(undefined);
    const [databaseInfo, setDatabaseInfo] = useState<DatabaseProps>(undefined);
    const [folderInfo, setFolderInfo] = useState<FolderInfoProps>(undefined);


    useEffect(() => {
        setComponentType("files");
    }, []);

    useEffect(() => {
        const info: componentTypeProps = {
            type: componentType,
            params: componentType == "files" ? folderInfo : databaseInfo
        };
        if (props.onChange) {
            props.onChange(info);
        }
    }, [componentType, databaseInfo, folderInfo]);

    function onSelectOptions(componentType?: string) {
        setComponentType(componentType);
    }



    let className = thisCss["ComponentTypes"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        const disabledBoxClassName = thisCss["ComponentTypes-box-options-item-disabled"];
        const activeBoxClassName = thisCss["ComponentTypes-box-options-item-active"];
        let folderElement = undefined;
        if (props.includeFolder) {
            folderElement = (<div className={`${thisCss["ComponentTypes-box-options-item"]} ${componentType == "files" ? activeBoxClassName : ""}`}>
                <div className={thisCss["ComponentTypes-box-options-item-selection"]} onClick={evt => onSelectOptions("files")}>
                    <span><input id={`${thisId}-chk-files`} type="radio" value="Files" checked={componentType == "files"} /></span>
                    <span>Folder Path</span>
                </div>
                <div id={`${thisId}-box-files`} className={componentType == "files" ? undefined : disabledBoxClassName}>
                    <div className={thisCss["ComponentTypes-box-options-item-selection"]} onClick={evt => onSelectOptions("files")}>
                        <FolderInfo id={`${thisId}-folder-info`} onChange={f => setFolderInfo(f)} />
                    </div>
                </div>
            </div>);
        }
        let databaseElement = undefined;
        if (props.includeDatabase) {
            databaseElement = (<div className={`${thisCss["ComponentTypes-box-options-item"]} ${componentType == "database" ? activeBoxClassName : ""}`}>
                <div className={thisCss["ComponentTypes-box-options-item-selection"]} onClick={evt => onSelectOptions("database")}>
                    <span><input id={`${thisId}-chk-database`} type="radio" value="Database" checked={componentType == "database"} /></span>
                    <span>Database</span>
                </div>
                <div id={`${thisId}-box-database`} className={componentType == "database" ? undefined : disabledBoxClassName}>
                    <DatabaseInfo id={`${thisId}-database-info`} onChange={d => setDatabaseInfo(d)} />
                </div>
            </div>);
        }
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["ComponentTypes-box-options"]}>
                {folderElement}
                {databaseElement}
            </div>
        </div>);

        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ComponentTypes;