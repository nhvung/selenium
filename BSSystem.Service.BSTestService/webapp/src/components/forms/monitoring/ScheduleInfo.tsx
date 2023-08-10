import { useEffect, useState } from 'react';
import { getDateTimeValue, getDateValue, getTimeZoneValue } from '../../../extensions/DateTimeExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import OptionsFilter from '../filters/OptionsFilter';
import TextFilter from '../filters/TextFilter';
import { ScheduleProps } from './Define';
import thisCss from './ScheduleInfo.module.scss';
function ScheduleInfo(props?: componentProps & {
    onChange?: (info?: ScheduleProps) => void
}) {
    const thisId = props.id ?? guid8();
    const now = new Date();
    const sNow = getDateTimeValue(now);
    const timezoneOffset = now.getTimezoneOffset();

    const [period, setPeriod] = useState<string>(undefined);
    const [dates, setDates] = useState<string[]>(undefined);
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>(undefined);
    const [time, setTime] = useState<string>(undefined);

    useEffect(() => {

        const info: ScheduleProps = {
            Period: period,
            Dates: dates,
            DaysOfWeek: daysOfWeek,
            TimeZoneOffset: timezoneOffset
        };
        if (period == "specified") {
            try {
                const date = new Date(time);
                info.Year = date.getFullYear();
                info.Month = date.getMonth() + 1;
                info.Day = date.getDate();
                info.Hour = date.getHours();
                info.Minute = date.getMinutes();
            }
            catch (e) {
            }
        }
        else {
            const temp = time?.split(':');
            try {
                if (temp?.length == 2) {
                    info.Hour = parseInt(temp[0]);
                    info.Minute = parseInt(temp[1]);
                }

            }
            catch (e) {
            }
        }
        if (props.onChange) {
            props.onChange(info);
        }
    }, [period, dates, daysOfWeek, time]);

    let className = thisCss["ScheduleInfo"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    let dateSelectElement = undefined;
    if (period === "monthly") {
        dateSelectElement = (<OptionsFilter
            text='Dates in Month'
            id={`${thisId}-date`}
            multiselect
            options={() => {
                const result = [];
                for (var i = 1; i < 29; i++) {
                    const sDate = i.toString();
                    let dateValue: string = undefined;
                    if (i === 1 || i === 21) {
                        dateValue = `${i}st`;
                    }
                    else if (i === 2 || i === 22) {
                        dateValue = `${i}nd`;
                    }
                    else if (i === 3 || i === 23) {
                        dateValue = `${i}rd`;
                    }
                    else {
                        dateValue = `${i}th`;
                    }
                    result.push({ id: sDate, name: dateValue, checked: dates?.find(ite => ite == sDate) != undefined });
                }
                return result;
            }}
            applyClick={(evt, items) => {
                if (items?.length > 0) {
                    setDates(items.map(ite => ite.id));
                }
                else {
                    setDates(undefined);
                }
            }}
        />);
    }

    let daysOfWeekSelectElement = undefined;
    if (period === "weekly") {
        const dayOfWeekValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        daysOfWeekSelectElement = (<OptionsFilter
            text='Days of Week'
            id={`${thisId}-daysofweek`}
            options={() => dayOfWeekValues.map(dow => {
                {
                    return {
                        id: dow,
                        name: dow,
                        checked: daysOfWeek?.find(ite => ite == dow) != undefined
                    };
                }
            })}

            multiselect
            applyClick={(evt, items) => {
                if (items?.length > 0) {
                    setDaysOfWeek(items.map(ite => ite.name));
                }
                else {
                    setDaysOfWeek(undefined);
                }
            }}
        // displayFormat={(t, val, vals) => `${t}${vals?.length > 1 ? `: ${vals.length}` : ''}`}
        />);
    }

    let timeSelectElement = undefined;
    if (period) {
        if (period === "daily") {
            timeSelectElement = (<TextFilter id={`${thisId}-time`}
                type="time"
                text='Time'
                className={thisCss["ScheduleInfo-txt"]}
                onChange={evt => {
                    setDates(undefined);
                    setDaysOfWeek(undefined);
                    setTime(evt.currentTarget.value);
                }}
            />);
        }
        else if (period === "yearly" || period == "specified") {
            timeSelectElement = (<TextFilter id={`${thisId}-time`}
                type="datetime-local"
                text='Time'
                className={thisCss["ScheduleInfo-txt"]}
                // defaultValue={time}
                onChange={evt => setTime(evt.currentTarget.value)}
                min={sNow}
            />)
        }
        else {
            timeSelectElement = (<TextFilter id={`${thisId}-time`}
                type="time"
                text='Time'
                className={thisCss["ScheduleInfo-txt"]}
                // defaultValue={time}
                onChange={evt => setTime(evt.currentTarget.value)}
            />)
        }
    }
    const tzValue = getTimeZoneValue(timezoneOffset, true);
    const timezoneElement = (<div className={thisCss["ScheduleInfo-timezone"]}>{tzValue}</div>);


    try {

        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["ScheduleInfo-container"]}>
                <OptionsFilter
                    text='Period'
                    id={`${thisId}-period`}
                    key={`${thisId}-period`}
                    options={() => [
                        { id: 'daily', name: 'Daily', checked: period == 'daily' },
                        { id: 'weekly', name: 'Weekly', checked: period == 'weekly' },
                        { id: 'monthly', name: 'Monthly', checked: period == 'monthly' },
                        { id: 'specified', name: 'Specified Time', checked: period == 'specified' },
                    ]}
                    applyClick={(evt, items) => {
                        if (items?.length > 0) {
                            setPeriod(items[0].id);
                        }
                        else {
                            setPeriod(undefined);
                        }
                    }}
                // displayFormat={(t, val, vals) => `${t}${vals?.length > 0 ? `: ${vals.join(", ")}` : ''}`}
                />
                {dateSelectElement}
                {daysOfWeekSelectElement}
                {timeSelectElement}
                {timezoneElement}
            </div>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ScheduleInfo;