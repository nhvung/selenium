import { useEffect, useState } from 'react';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import OptionsFilter from '../filters/OptionsFilter';
import TextFilter from '../filters/TextFilter';
import thisCss from './BackupDialog.module.scss';
import ComponentTypes, { componentTypeProps } from './ComponentTypes';
import { actionProps, DatabaseProps, FolderInfoProps, ScheduleProps } from './Define';
import ScheduleInfo from './ScheduleInfo';

function BackupDialog(props?: componentProps & {
    onChange?: (info?: actionProps) => void
}) {
    const thisId = props.id ?? guid8();

    const [type, setType] = useState<string>("Realtime");
    const [component, setComponent] = useState<componentTypeProps>(undefined);
    const [backupFolderPath, setBackupFolderPath] = useState<string>(undefined);
    const [name, setName] = useState<string>(undefined);
    const [schedule, setSchedule] = useState<ScheduleProps>(undefined);

    useEffect(() => {

        let info: actionProps = {
            Name: name,
            Type: type
        };
        if (component?.type) {
            info.ComponentType = component.type;
            if (component?.params) {
                let specs: (DatabaseProps | FolderInfoProps) & { BackupFolderPath?: string } = {};
                if (component.type == "database") {
                    specs = component.params as DatabaseProps;
                }
                else if (component.type == "files") {
                    specs = component.params as FolderInfoProps;
                }

                specs.BackupFolderPath = backupFolderPath;
                info.Specs = specs;
            }
        }
        if (schedule) {
            info.Schedule = schedule;
        }
        if (props.onChange) {
            props.onChange(info);
        }
    }, [name, type, component, backupFolderPath, schedule]);

    let className = thisCss["BackupDialog"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    try {
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["BackupDialog-box-backuppath"]}>
                <label>Name:</label>
                <TextFilter id={`${thisId}-name`} className={thisCss["BackupDialog-txt-name"]} onChange={evt => setName(evt.currentTarget?.value)} onClear={() => setName(undefined)} />
            </div>
            <ComponentTypes id={`${thisId}-components`} onChange={info => setComponent(info)} />
            <div className={thisCss["BackupDialog-box-backuppath"]}>
                <label>Backup Folder Path:</label>
                <TextFilter id={`${thisId}-backuppath`} className={thisCss["BackupDialog-txt-backuppath"]} onChange={evt => setBackupFolderPath(evt.currentTarget?.value)} onClear={() => setBackupFolderPath(undefined)} />
            </div>
            <div className={thisCss["BackupDialog-type"]}>
                <OptionsFilter
                    className={thisCss["BackupDialog-type-label"]}
                    text='Execute Type'
                    id={`${thisId}-type`}
                    key={`${thisId}-type`}
                    options={() => [
                        { id: 'Realtime', name: 'Right Now', checked: type == "Realtime" },
                        { id: 'Schedule', name: 'Schedule', checked: type == "Schedule" },
                    ]}
                    applyClick={(evt, items) => {
                        if (items?.length > 0) {
                            setType(items[0].id);
                        }
                        else {
                            setType(undefined);
                        }
                    }}
                    displayFormat={(t, val, vals) => `${t}${vals?.length > 0 ? `: ${vals.join(", ")}` : ''}`}
                />
                {type == "Schedule" ? (<ScheduleInfo id={`${thisId}-scheduleinfo`} className={thisCss["BackupDialog-type-info"]} onChange={s => setSchedule(s)} />) : undefined}
            </div>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default BackupDialog;