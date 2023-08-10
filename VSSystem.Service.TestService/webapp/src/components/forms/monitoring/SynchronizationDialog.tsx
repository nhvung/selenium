import { useEffect, useState } from 'react';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import OptionsFilter from '../filters/OptionsFilter';
import TextFilter from '../filters/TextFilter';
import thisCss from './SynchronizationDialog.module.scss';
import ComponentTypes, { componentTypeProps } from './ComponentTypes';
import { actionProps, DatabaseProps, FolderInfoProps, ScheduleProps } from './Define';
import ScheduleInfo from './ScheduleInfo';

function SynchronizationDialog(props?: componentProps & {
    onChange?: (info?: actionProps) => void
}) {
    const thisId = props.id ?? guid8();

    const [type, setType] = useState<string>("Realtime");
    const [component, setComponent] = useState<componentTypeProps>(undefined);
    const [destinationFolderPath, setDestinationFolderPath] = useState<string>(undefined);
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
                let specs: (DatabaseProps | FolderInfoProps) & { DestinationFolderPath?: string } = {};
                if (component.type == "database") {
                    specs = component.params as DatabaseProps;
                }
                else if (component.type == "files") {
                    specs = component.params as FolderInfoProps;
                }

                specs.DestinationFolderPath = destinationFolderPath;
                info.Specs = specs;
            }
        }
        if (schedule) {
            info.Schedule = schedule;
        }
        if (props.onChange) {
            props.onChange(info);
        }
    }, [name, type, component, destinationFolderPath, schedule]);

    let className = thisCss["SynchronizationDialog"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    try {
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["SynchronizationDialog-box-destinationpath"]}>
                <label>Name:</label>
                <TextFilter id={`${thisId}-name`} className={thisCss["SynchronizationDialog-txt-name"]} onChange={evt => setName(evt.currentTarget?.value)} onClear={() => setName(undefined)} />
            </div>
            <ComponentTypes id={`${thisId}-components`} onChange={info => setComponent(info)} includeFolder />
            <div className={thisCss["SynchronizationDialog-box-destinationpath"]}>
                <label>Destination Folder Path:</label>
                <TextFilter id={`${thisId}-destinationpath`} className={thisCss["SynchronizationDialog-txt-destinationpath"]} onChange={evt => setDestinationFolderPath(evt.currentTarget?.value)} onClear={() => setDestinationFolderPath(undefined)} />
            </div>
            <div className={thisCss["SynchronizationDialog-type"]}>
                <OptionsFilter
                    className={thisCss["SynchronizationDialog-type-label"]}
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
                {type == "Schedule" ? (<ScheduleInfo id={`${thisId}-scheduleinfo`} className={thisCss["SynchronizationDialog-type-info"]} onChange={s => setSchedule(s)} />) : undefined}
            </div>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default SynchronizationDialog;