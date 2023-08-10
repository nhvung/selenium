import { useEffect, useState } from 'react';
import { componentWithApiProps } from '../../componentDefine';
import { DialogOptions, ConfirmButtons, openDialog } from '../dialog/Dialog';
import BackupDialog from './BackupDialog';
import { actionProps, ScheduleProps } from './Define';
import { dataResponse, rowProps } from '../table/PagingTable';
import PagingTableV2 from '../table/PagingTableV2';
import ToolStripItem from '../toolstrip/ToolStripItem';
import ToolStripMenu from '../toolstrip/ToolStripMenu';
import { navigate } from '../../router/methods';
import { getDateTimeValue, getDateValue, getTimeValue, getTimeZoneValue } from '../../../extensions/DateTimeExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { postAsync } from '../../../extensions/HttpExtension';
import thisCss from './BackupManagement.module.scss';
function BackupManagement(props?: componentWithApiProps & {
    headers?: any
}) {

    const thisId = props.id ?? guid8();
    const apiUrl = props.apiUrl ?? window.location.href;
    const headers = props.headers;
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();

    const [tServerKey, setTServerKey] = useState<string>(undefined);

    useEffect(() => {
        refresh();
        if (props.onloaded) {
            props.onloaded();
        }
    }, []);

    let className = thisCss["BackupManagement"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    function refresh() {
        setTServerKey(guid8());
    }
    async function fetchBackup(): Promise<dataResponse> {
        const url = `${apiUrl}/api/monitor/backup/list`;
        return postAsync(url, {}, headers, async response => {
            let result: dataResponse = {
                records: [],
                totalRecords: 0
            };
            if (response.status === 200) {
                try {
                    const data = await response.json();
                    if (data?.length > 0) {
                        result = {
                            totalRecords: data.length,
                            records: [...data].map((ite: actionProps, idx) => {
                                const type = ite.Type.toUpperCase();
                                let scheduleInfoElement = undefined;
                                if (type === "REALTIME") {
                                    scheduleInfoElement = <div><b>RIGHT NOW</b></div>;
                                }
                                else {

                                    scheduleInfoElement = <div><b>{type}</b></div>;
                                    if (ite.Schedule) {
                                        const period = ite.Schedule.Period.toUpperCase();
                                        scheduleInfoElement = <div><b>{type}</b>: {period}</div>;
                                        const tzValue = getTimeZoneValue(ite.Schedule.TimeZoneOffset);
                                        let timeElement = (<span>At&nbsp;
                                            {getTimeValue(ite.Schedule.Hour, ite.Schedule.Minute)}
                                            &nbsp;{tzValue}
                                        </span>);

                                        if (period === "YEARLY") {
                                            const dateValue = getDateValue(ite.Schedule.Month, ite.Schedule.Day);
                                            let dateElement = undefined;
                                            if (dateValue) {
                                                dateElement = <span>{dateValue},&nbsp;</span>;
                                            }
                                            scheduleInfoElement = <div>
                                                <div><b>{type}</b>: {period}</div>
                                                <div className={thisCss["BackupManagement-schedule-info"]}>Yearly on&nbsp;
                                                    {dateElement}
                                                    {timeElement}
                                                </div>
                                            </div>;
                                        }
                                        else if (period === "MONTHLY") {
                                            const datesValue = ite.Schedule.Dates?.map(date => getDateValue(-1, parseInt(date))).join(", ");
                                            let datesElement = undefined;
                                            if (datesValue) {
                                                datesElement = <span>On {ite.Schedule.Dates.length == 1 ? `Date` : 'Dates'}: {datesValue}</span>;
                                            }
                                            scheduleInfoElement = <div>
                                                <div><b>{type}</b>: {period}</div>
                                                <div className={thisCss["BackupManagement-schedule-info"]}>
                                                    {datesElement}
                                                    {timeElement}
                                                </div>
                                            </div>;
                                        }
                                        else if (period === "WEEKLY") {
                                            const daysOfWeekValue = ite.Schedule.DaysOfWeek.join(", ");
                                            let daysOfWeekElement = undefined;
                                            if (daysOfWeekValue) {
                                                daysOfWeekElement = <span>On {daysOfWeekValue}</span>;
                                            }
                                            scheduleInfoElement = <div>
                                                <div><b>{type}</b>: {period}</div>
                                                <div className={thisCss["BackupManagement-schedule-info"]}>
                                                    {daysOfWeekElement}
                                                    {timeElement}
                                                </div>
                                            </div>;
                                        }
                                        else if (period === "DAILY") {
                                            scheduleInfoElement = <div>
                                                <div><b>{type}</b>: {period}</div>
                                                <div className={thisCss["BackupManagement-schedule-info"]}>
                                                    {timeElement}
                                                </div>
                                            </div>;
                                        }
                                        else if (period === "SPECIFIED") {
                                            var dt = new Date(ite.Schedule.Year, ite.Schedule.Month - 1, ite.Schedule.Day, ite.Schedule.Hour, ite.Schedule.Minute);
                                            timeElement = (<span>At&nbsp;
                                                {getDateTimeValue(dt)}
                                                &nbsp;{tzValue}
                                            </span>);
                                            scheduleInfoElement = <div>
                                                <div><b>{type}</b>: SPECIFIED TIME</div>
                                                <div className={thisCss["BackupManagement-schedule-info"]}>
                                                    {timeElement}
                                                </div>
                                            </div>;
                                        }
                                    }
                                }

                                const componentType = ite.ComponentType?.toUpperCase();
                                let specsElement = undefined;
                                if (componentType === "DATABASE") {
                                    specsElement = <div className={thisCss["BackupManagement-component-info"]}>
                                        <span><b>Server</b>: {ite.Specs.Username}@{ite.Specs.Server}</span>
                                        <span><b>Database</b>: {ite.Specs.Database}</span>
                                        <span><b>Backup folder</b>: {ite.Specs.BackupFolderPath}</span>
                                    </div>;
                                }
                                else if (componentType === "FILES") {
                                    specsElement = <div className={thisCss["BackupManagement-component-info"]}>
                                        <span><b>Folder</b>: {ite.Specs.FolderPath}</span>
                                        <span><b>Backup folder</b>: {ite.Specs.BackupFolderPath}</span>
                                    </div>;
                                }

                                let row: rowProps = {
                                    id: `tr-${ite.Path}`,
                                    className: thisCss["BackupManagement-backup-table-row"],
                                    cells: [
                                        {
                                            align: "center",
                                            element: <div>{idx + 1}</div>
                                        },
                                        {
                                            element: <div>{ite.Name}</div>
                                        },
                                        {
                                            align: "center",
                                            element: scheduleInfoElement
                                        },
                                        {
                                            align: "center",
                                            element: <div><b>{componentType}</b>{specsElement}</div>
                                        },
                                        {
                                            align: "center",
                                            element: <div>{ite.Status}</div>
                                        },
                                    ]
                                };
                                return row;
                            })
                        };
                    }
                }
                catch (e) {
                }

            }
            else if (response.status === 401) {
                if (props.onUnauthorize) {

                }
                navigate("/biqcorev2/login");
            }
            return result;
        });
    }

    let selectedBackups: string[] = [];
    function onRemoveBackup() {
        try {
            if (selectedBackups?.length > 0) {
                const dDeleteServers: DialogOptions = {
                    zIndex: 1,
                    id: guid8(),
                    body: (<div className={thisCss["BackupManagement-dialog-deletebackups"]}>
                        Do you want to remove selected backups?
                    </div>),
                    title: 'Remove Backups',
                    confirmButtons: ConfirmButtons.YesNo,
                    onAcceptHandler: removeBackups
                };
                openDialog(dDeleteServers);
            }
        }
        catch (e) {
        }
    }
    function removeBackups() {
        if (selectedBackups?.length > 0) {
            const url = `${apiUrl}/api/monitor/backup/delete`;
            postAsync(url, selectedBackups, headers, async response => {
                if (response.status === 200) {
                    setTServerKey(guid8());
                }

            });
        }
    }

    function onActionBackup(action?: string) {
        try {
            if (selectedBackups?.length > 0) {
                const dActionBackups: DialogOptions = {
                    zIndex: 1,
                    id: guid8(),
                    body: (<div className={thisCss["BackupManagement-dialog-actionbackups"]}>
                        Do you want to do this for selected backups?
                    </div>),
                    title: 'Action Backups',
                    confirmButtons: ConfirmButtons.YesNo,
                    onAcceptHandler: () => actionBackups(action)
                };
                openDialog(dActionBackups);
            }
        }
        catch (e) {
        }
    }
    function actionBackups(action?: string) {
        if (selectedBackups?.length > 0) {
            const url = `${apiUrl}/api/monitor/backup/${action}`;
            postAsync(url, selectedBackups, headers, async response => {
                if (response.status === 200) {
                    setTServerKey(guid8());
                }
            });
        }
    }

    let addBackupZIndex = 1;
    let addBackupValue: actionProps = undefined;
    function onAddBackup() {
        const dAddBackup: DialogOptions = {
            zIndex: addBackupZIndex,
            id: guid8(),
            body: (<div className={thisCss["BackupManagement-dialog-addservers"]}>
                <BackupDialog onChange={info => addBackupValue = info} />
            </div>),
            title: 'Add Backup',
            confirmButtons: ConfirmButtons.YesNo,
            onAcceptHandler: addBackup,
            onPreAcceptHandler: validateInfo
        };
        openDialog(dAddBackup);
    }
    function validateSchedule(schedule?: ScheduleProps) {
        if (!schedule.Period) {
            return "Please select period";
        }
        else {
            if (schedule.Period == "daily") {
                if (!schedule.Hour || schedule.Hour < 0 || !schedule.Minute || schedule.Minute < 0) {
                    return "Please select time";
                }
            }
            else if (schedule.Period == "weekly") {
                if (!schedule.DaysOfWeek || schedule.DaysOfWeek.length == 0) {
                    return "Please select days of week";
                }
                else if (!schedule.Hour || schedule.Hour < 0 || !schedule.Minute || schedule.Minute < 0) {
                    return "Please select time";
                }
            }
            else if (schedule.Period == "monthly") {
                if (!schedule.Dates || schedule.Dates.length == 0) {
                    return "Please select dates in month";
                }
                else if (!schedule.Hour || schedule.Hour < 0 || !schedule.Minute || schedule.Minute < 0) {
                    return "Please select time";
                }
            }
            else if (schedule.Period == "specified") {
                if (!schedule.Year || schedule.Year < 0 || !schedule.Month || schedule.Month < 0 || !schedule.Day || schedule.Day < 0 || !schedule.Hour || schedule.Hour < 0 || !schedule.Minute || schedule.Minute < 0) {
                    return "Please select time";
                }
            }
        }
        return undefined;
    }
    function validateInfo() {
        let errorMessage: string = undefined;
        if (addBackupValue) {
            if (!addBackupValue.Name) {
                errorMessage = "Please enter name of backup";
            }
            else {
                if (addBackupValue.Type == "Schedule") {
                    errorMessage = validateSchedule(addBackupValue.Schedule);
                }
                if (!errorMessage) {
                    if (addBackupValue.ComponentType == "files") {
                        if (!addBackupValue.Specs?.FolderPath) {
                            errorMessage = "Please enter folder path";
                        }
                        else if (!addBackupValue.Specs?.BackupFolderPath) {
                            errorMessage = "Please enter backup folder path";
                        }
                    }
                    else if (addBackupValue.ComponentType == "database") {
                        if (!addBackupValue.Specs.Server) {
                            errorMessage = "Please enter server";
                        }
                        else if (!addBackupValue.Specs.Username) {
                            errorMessage = "Please enter username";
                        }
                        else if (!addBackupValue.Specs.Password) {
                            errorMessage = "Please enter password";
                        }
                        else if (!addBackupValue.Specs.Database) {
                            errorMessage = "Please enter database";
                        }
                        else if (!addBackupValue.Specs.BackupFolderPath) {
                            errorMessage = "Please enter backup folder path";
                        }
                    }

                }


            }

        }
        else {
            errorMessage = "Parameters is not valid, please check again.";
        }


        if (errorMessage) {
            const dAddBackup: DialogOptions = {
                zIndex: addBackupZIndex + 1,
                id: guid8(),
                body: (<div className={thisCss["BackupManagement-dialog-addservers"]}>
                    {errorMessage}
                </div>),
                title: 'Add Backup Warning',
                confirmButtons: ConfirmButtons.Ok,
            };
            openDialog(dAddBackup);
        }
        else {
            return true;
        }

        return false;
    }
    function addBackup() {
        try {
            if (addBackupValue) {

                const url = `${apiUrl}/api/monitor/backup/add`;
                postAsync(url, addBackupValue, headers, async response => {
                    if (response.status === 200) {
                        setTServerKey(guid8());
                    }

                });
            }

        }
        catch (e) {
        }
    }

    try {
        let menuElement = (<ToolStripMenu id={`${thisId}-menu`} dock='top' className={thisCss["ServerManagement-server-menu"]}>
            <ToolStripItem text='Menu' />
            <ToolStripItem text='Refresh' onClick={() => { refresh() }} />
            <ToolStripItem text='|' />
            <ToolStripItem text='Add' onClick={onAddBackup} />
            <ToolStripItem text='Remove' onClick={onRemoveBackup} />
            <ToolStripItem text='|' />
            <ToolStripItem text='Activate' onClick={() => onActionBackup('activate')} />
            <ToolStripItem text='Deactivate' onClick={() => onActionBackup('deactivate')} />
            <ToolStripItem text='|' />
            <ToolStripItem text='Execute' onClick={() => onActionBackup('execute')} />
        </ToolStripMenu>);

        let contents = (<div id={thisId} className={className}>
            {menuElement}
            <PagingTableV2
                includeCheckbox
                id={`${thisId}-backup-${guid8()}`}
                className={thisCss["BackupManagement-backup-table"]}
                headers={["No.", "Name", "Type", "Component", "Status"]}
                noPaging
                fetchData={fetchBackup}
                key={tServerKey}
                // autoRefreshInterval={() => refreshInterval}
                height='94%'
                rowCheckChange={vals => selectedBackups = vals?.map((ite: string) => ite.substring(3))}
            />
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default BackupManagement;