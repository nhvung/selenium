import { useState } from "react";
import { guid8 } from "../../extensions/HashFuncs";
import { sleep } from "../../extensions/ThreadExtension";
import thisCss from './DateTimePicker.module.scss';

type cellType = {
    year?: number | 0,
    month?: number | 0,
    date?: number | 0,
    day?: number | -1,
    hour?: number | 0,
    minute?: number | 0,
    second?: number | 0
}

function DateTimePicker(props?: any & cellType & {
    onDateClick?: any,
    initDateTime?: any
}) {

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



    let currentDate: Date = new Date();
    let hour = 0, minute = 0, second = 0;
    if (props?.initDateTime) {
        try {
            currentDate = new Date(props.initDateTime);

            if (isNaN(currentDate.getTime())) {
                currentDate = new Date();
            }
            else {
                hour = currentDate.getHours();
                minute = currentDate.getMinutes();
                second = currentDate.getSeconds();
            }

        }
        catch (e) {

        }
    }

    let state: cellType & { type?: string };
    let setState: any;
    [state, setState] = useState({
        type: 'calendar',
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate(),
        hour,
        minute,
        second
    });
    const thisId = props?.id ?? guid8();

    const hourId = `${thisId}-time-hour`;
    const minuteId = `${thisId}-time-minute`;
    const secondId = `${thisId}-time-second`;



    function checkNumber(evt: React.ChangeEvent<HTMLInputElement>, n: number) {
        try {
            var i = parseInt(evt.currentTarget.value);
            if (isNaN(i)) {
                evt.currentTarget.value = '00';
                return false;
            }
            else if (i <= 0) {
                evt.currentTarget.value = '00';
                return false;
            }
            else if (i >= n) {
                while (i >= n) {
                    i = i % 10;
                }
                if (i < 10) {
                    evt.currentTarget.value = `0${i}`;
                }
                else {
                    evt.currentTarget.value = `${i}`;
                }
            }
            else {
                if (i < 10) {
                    evt.currentTarget.value = `0${i}`;
                }
                else {
                    evt.currentTarget.value = `${i}`;
                }
            }
            updateTimeValue();
        }
        catch (e) {
        }
    }
    let selectedDate: cellType;
    function onDateClick(evt: React.MouseEvent | any) {
        try {
            var key = ((evt.currentTarget as HTMLDivElement).getAttribute('data-value') as string).split('-');
            var year = parseInt(key[1]);
            var month = parseInt(key[2]);
            var date = parseInt(key[3]);
            const type = 'calendar';

            let hour = 0;
            let minute = 0;
            let second = 0;

            selectedDate = { year, month, date, hour, minute, second };

            if (props.showTime) {
                hour = parseInt((document.getElementById(hourId) as HTMLInputElement).value);
                minute = parseInt((document.getElementById(minuteId) as HTMLInputElement).value);
                second = parseInt((document.getElementById(secondId) as HTMLInputElement).value);
                selectedDate = { year, month, date, hour, minute, second };
            }
            setState({ type, year, month, date, hour, minute, second });
        }
        catch (e) {
        }
    }
    function onMonthClick(evt: React.MouseEvent | any) {
        try {
            var key = ((evt.currentTarget as HTMLDivElement).getAttribute('data-value') as string).split('-');
            var year = parseInt(key[1]);
            var month = parseInt(key[2]);
            const type = 'month';
            setState({ type, year, month });
        }
        catch (e) {
        }
    }
    function onYearClick(evt: React.MouseEvent | any) {
        try {
            var key = ((evt.currentTarget as HTMLDivElement).getAttribute('data-value') as string).split('-');
            var year = parseInt(key[1]);
            const type = 'year';
            setState({ type, year });
        }
        catch (e) {
        }
    }
    function changeCellStyle(evt: React.MouseEvent | any) {
        try {
            const dtpDiv = document.getElementById(thisId);
            if (dtpDiv) {
                const selectClassName = thisCss["dtp-cell-seleted"];
                let selectedCells = dtpDiv.getElementsByClassName(selectClassName);
                if (selectedCells?.length > 0) {
                    Array.from(selectedCells).forEach(cell => cell.classList.remove(selectClassName));
                }
                evt?.currentTarget.classList.add(selectClassName);
                updateTimeValue();
            }

        }
        catch (e) {
        }
    }
    function updateTimeValue() {
        try {
            const dtpDiv = document.getElementById(thisId);
            if (dtpDiv) {
                const selectClassName = thisCss["dtp-cell-seleted"];
                let selectedCells = dtpDiv.getElementsByClassName(selectClassName);
                if (selectedCells?.length > 0) {
                    let sMonth = "00", sDate = "00";
                    const selectedCell = selectedCells[0];
                    var key = (selectedCell.getAttribute('data-value') as string).split('-');
                    var year = parseInt(key[1]);
                    var month = parseInt(key[2]);
                    var date = parseInt(key[3]);

                    if (!isNaN(month)) {
                        sMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
                    }
                    if (!isNaN(date)) {
                        sDate = date < 10 ? `0${date}` : `${date}`;
                    }

                    let timeValue = `${sMonth}/${sDate}/${year}`;

                    if (props.showTime) {
                        let sHour = "00", sMinute = "00", sSecond = "00";
                        let hour = 0;
                        let minute = 0;
                        let second = 0;
                        try {
                            hour = parseInt((document.getElementById(hourId) as HTMLInputElement).value);
                            minute = parseInt((document.getElementById(minuteId) as HTMLInputElement).value);
                            second = parseInt((document.getElementById(secondId) as HTMLInputElement).value);

                            if (!isNaN(hour)) {
                                sHour = hour < 10 ? `0${hour}` : `${hour}`;
                            }
                            if (!isNaN(minute)) {
                                sMinute = minute < 10 ? `0${minute}` : `${minute}`;
                            }
                            if (!isNaN(second)) {
                                sSecond = second < 10 ? `0${second}` : `${second}`;
                            }
                            timeValue = `${sMonth}/${sDate}/${year} ${sHour}:${sMinute}:${sSecond}`;
                        }
                        catch (e) {
                        }

                    }

                    if (props?.updateTimeValue) {
                        props.updateTimeValue(timeValue);
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    function renderCalendar(year: number, month: number, date: number) {
        const nRows = 6, nCols = 7;
        const now = new Date();
        currentDate = new Date(year, month, date);

        let prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        prevMonth.setMonth(prevMonth.getMonth() - 1);

        let nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const iYear = currentDate.getFullYear();
        const iMonth = currentDate.getMonth();
        const iDate = currentDate.getDate();

        let dayGrid = Array<cellType[]>(6);
        for (var i = 0; i < dayGrid.length; i++) {
            dayGrid[i] = Array<cellType>();
        }
        let beginDate = new Date(iYear, iMonth, 1);
        while (beginDate.getDay() > 0 || beginDate.getMonth() == iMonth) {
            beginDate.setDate(beginDate.getDate() - 1);
        }
        let endDate = new Date(iYear, iMonth + 1, 1);
        endDate.setDate(endDate.getDate() - 1);
        while (endDate.getDay() < 6) {
            endDate.setDate(endDate.getDate() + 1);
        }

        for (var i = 0; i < nRows; i++) {
            for (var j = 0; j < nCols; j++) {
                dayGrid[i][j] = {
                    day: beginDate.getDay(),
                    date: beginDate.getDate(),
                    month: beginDate.getMonth(),
                    year: beginDate.getFullYear(),
                    hour: 0,
                    minute: 0,
                    second: 0,
                };
                beginDate.setDate(beginDate.getDate() + 1);
            }
        }

        let contents = (<>
            <fieldset className={thisCss["dtp-fieldset"]}>
                <legend>Date</legend>
                <div id={`${thisId}-date`}>
                    <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                            <tr>
                                <td colSpan={shortDayNames.length}><div
                                    onClick={evt => {
                                        onDateClick(evt);
                                        sleep(1, updateTimeValue);
                                    }}
                                    data-value={`dtp-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-now"]}`}
                                >Now: {dayNames[now.getDay()]}, {shortMonthNames[now.getMonth()]} {now.getDate()}, {now.getFullYear()}
                                </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={shortDayNames.length - 2}><div
                                    onClick={evt => {
                                        onMonthClick(evt);
                                    }}
                                    data-value={`dtp-${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-now"]}`}
                                >{shortMonthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </div>

                                </td>
                                <td><div
                                    data-value={`dtp-${prevMonth.getFullYear()}-${prevMonth.getMonth()}-${prevMonth.getDate()}`}
                                    onClick={evt => {
                                        onDateClick(evt);
                                        sleep(1, updateTimeValue);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                ><i className="fa fa-arrow-left"></i></div></td>
                                <td><div
                                    data-value={`dtp-${nextMonth.getFullYear()}-${nextMonth.getMonth()}-${nextMonth.getDate()}`}
                                    onClick={evt => {
                                        onDateClick(evt);
                                        sleep(1, updateTimeValue);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                ><i className="fa fa-arrow-right"></i></div></td>
                            </tr>
                            <tr>
                                {shortDayNames.map(ite => (<td key={guid8()}><div
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-header"]}`}
                                >{ite}</div></td>))}
                            </tr>
                            {dayGrid.map((row) => {
                                let divDay = (<tr key={guid8()}>
                                    {
                                        Array.from(row).map((td) => {
                                            const key = `dtp-${td.year}-${td.month}-${td.date}`;
                                            return (<td key={guid8()}>
                                                {td.month == iMonth
                                                    ? td.date == iDate
                                                        ? (<div
                                                            onClick={evt => {
                                                                changeCellStyle(evt);
                                                                onDateClick(evt);
                                                            }}
                                                            data-value={key}
                                                            key={guid8()}
                                                            className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-seleted"]}`}
                                                        >{td.date}
                                                        </div>)
                                                        : (<div
                                                            onClick={evt => {
                                                                changeCellStyle(evt);
                                                                onDateClick(evt);
                                                            }}
                                                            data-value={key}
                                                            key={guid8()}
                                                            className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                                        >{td.date}
                                                        </div>)
                                                    : (<div
                                                        onClick={evt => {
                                                            changeCellStyle(evt);
                                                            onDateClick(evt);
                                                        }}
                                                        data-value={key}
                                                        key={guid8()}
                                                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-disabled"]}`}
                                                    >{td.date}
                                                    </div>)}
                                            </td>)
                                        })
                                    }
                                </tr>);
                                return divDay;
                            })}
                        </tbody>
                    </table>
                </div>
            </fieldset>


        </>);
        return contents;
    }
    function renderMonths(year: number) {
        const now = new Date();
        const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const nRows = 3, nCols = 4;

        let grid = Array<cellType[]>(nRows);
        for (var i = 0; i < nRows; i++) {
            grid[i] = Array<cellType>(nCols);
            for (var j = 0; j < nCols; j++) {
                var idx = i * nCols + j;
                grid[i][j] = {
                    year: year,
                    month: idx,
                    date: 0,
                    day: -1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                };
            }
        }

        const prevMonth = new Date(year, 1, 1);
        prevMonth.setFullYear(prevMonth.getFullYear() - 1);

        const nextMonth = new Date(year, 1, 1);
        nextMonth.setFullYear(nextMonth.getFullYear() + 1);

        let contents = (<>
            <fieldset className={thisCss["dtp-fieldset"]}>
                <legend>Month</legend>
                <div>
                    <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                            <tr>
                                <td colSpan={nCols * 2}><div
                                    onClick={evt => {
                                        onDateClick(evt);
                                    }}
                                    data-value={`dtp-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-date-now"]}`}
                                >Now: {dayNames[now.getDay()]}, {shortMonthNames[now.getMonth()]} {now.getDate()}, {now.getFullYear()}
                                </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={nCols * 2 - 2}><div
                                    data-value={`dtp-${year}-1-1`}
                                    onClick={evt => {
                                        onYearClick(evt);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-date-now"]}`}
                                >{year}
                                </div>
                                </td>
                                <td><div
                                    data-value={`dtp-${prevMonth.getFullYear()}-${prevMonth.getMonth()}`}
                                    onClick={evt => {
                                        onMonthClick(evt);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                ><i className="fa fa-arrow-left"></i></div></td>
                                <td><div
                                    data-value={`dtp-${nextMonth.getFullYear()}-${nextMonth.getMonth()}`}
                                    onClick={evt => {
                                        onMonthClick(evt);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                ><i className="fa fa-arrow-right"></i></div></td>
                            </tr>
                            {grid.map((row) => {
                                let divDay = (<tr key={guid8()}>
                                    {
                                        Array.from(row).map((td) => {
                                            const key = `dtp-${td.year}-${td.month}-1`;
                                            return (<td key={guid8()} colSpan={2}>
                                                {td.year == now.getFullYear() && td.month == now.getMonth()
                                                    ? (<div
                                                        onClick={evt => {
                                                            changeCellStyle(evt);
                                                            onDateClick(evt);

                                                        }}
                                                        data-value={key}
                                                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-month"]} ${thisCss["dtp-cell-seleted"]}`}
                                                    >{shortMonthNames[td.month]}

                                                    </div>)
                                                    : (<div
                                                        onClick={evt => {
                                                            changeCellStyle(evt);
                                                            onDateClick(evt);

                                                        }}
                                                        data-value={key}
                                                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-month"]} ${thisCss["dtp-cell-date"]}`}
                                                    >{shortMonthNames[td.month]}
                                                    </div>)}
                                            </td>)
                                        })
                                    }
                                </tr>);
                                return divDay;
                            })}
                        </tbody>
                    </table>
                </div>
            </fieldset>


        </>);
        return contents;
    }
    function renderYears(year: number) {
        const now = new Date();
        let endYear = year - 1;
        while (endYear % 4 != 0) {
            endYear--;
        }
        const startYear = endYear;

        const nRows = 3, nCols = 4;

        let grid = Array<cellType[]>(nRows);
        for (var i = 0; i < nRows; i++) {
            grid[i] = Array<cellType>(nCols);
            for (var j = 0; j < nCols; j++) {
                // var idx = i * nCols + j;
                grid[i][j] = {
                    year: endYear,
                    month: 1,
                    date: 1,
                    day: -1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                };
                endYear++;
            }
        }

        const prevMonth = new Date(year, 1, 1);
        prevMonth.setFullYear(prevMonth.getFullYear() - 1);

        const nextMonth = new Date(year, 1, 1);
        nextMonth.setFullYear(nextMonth.getFullYear() + 1);

        let contents = (<>
            <fieldset className={thisCss["dtp-fieldset"]}>
                <legend>Year</legend>
                <div>
                    <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                            <tr>
                                <td colSpan={nCols * 2}><div
                                    onClick={evt => {
                                        onDateClick(evt);
                                    }}
                                    data-value={`dtp-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-date-now"]}`}
                                >Now: {dayNames[now.getDay()]}, {shortMonthNames[now.getMonth()]} {now.getDate()}, {now.getFullYear()}
                                </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={nCols * 2 - 2}><div
                                    data-value={`dtp-${startYear - (nRows * nCols) + 1}`}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]} ${thisCss["dtp-cell-date-now"]}`}
                                >{startYear} - {endYear - 1}
                                </div>
                                </td>
                                <td><div
                                    data-value={`dtp-${startYear - (nRows * nCols) + 1}`}
                                    onClick={evt => {
                                        onYearClick(evt);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                ><i className="fa fa-arrow-left"></i></div></td>
                                <td><div
                                    data-value={`dtp-${endYear + 2}`}
                                    onClick={evt => {
                                        onYearClick(evt);
                                    }}
                                    className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-date"]}`}
                                ><i className="fa fa-arrow-right"></i></div></td>
                            </tr>
                            {grid.map((row) => {
                                let divDay = (<tr key={guid8()}>
                                    {
                                        Array.from(row).map((td) => {
                                            const key = `dtp-${td.year}-${td.month}-1`;
                                            return (<td key={guid8()} colSpan={2}>
                                                {td.year == now.getFullYear()
                                                    ? (<div
                                                        onClick={evt => {
                                                            onMonthClick(evt);
                                                        }}
                                                        data-value={key}
                                                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-year"]} ${thisCss["dtp-cell-seleted"]}`}
                                                    >{td.year}
                                                    </div>)
                                                    : (<div
                                                        onClick={evt => {
                                                            onMonthClick(evt);
                                                        }}
                                                        data-value={key}
                                                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-cell-year"]}`}
                                                    >{td.year}
                                                    </div>)}
                                            </td>)
                                        })
                                    }
                                </tr>);
                                return divDay;
                            })}
                        </tbody>
                    </table>
                </div>
            </fieldset>


        </>);
        return contents;

    }

    function renderTime() {
        let sMinutes = '00';
        let sSeconds = '00'
        let sHours = '00';
        if (props.showTime) {
            try {
                let minutes = state.minute;
                let seconds = state.second;
                let hours = state.hour;
                if (!isNaN(hours)) {
                    sHours = hours < 10 ? `0${hours}` : `${hours}`;
                }
                if (!isNaN(minutes)) {
                    sMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
                }
                if (!isNaN(seconds)) {
                    sSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
                }
            }
            catch (e) {
            }

        }
        let contents = <>
            <fieldset className={thisCss["dtp-fieldset"]} style={{ marginTop: 20 }}>
                <legend className={thisCss["dtp-legend"]}>Time</legend>
                <div className={thisCss["dtp-btn-group"]}>
                    <input
                        id={hourId}
                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-btn-time"]}`}
                        defaultValue={sHours}
                        type="text"
                        onChange={evt => checkNumber(evt, 24)}
                    />
                    <span><b>:</b></span>
                    <input
                        id={minuteId}
                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-btn-time"]}`}
                        defaultValue={sMinutes}
                        type="text"
                        onChange={evt => checkNumber(evt, 60)} />
                    <span><b>:</b></span>
                    <input
                        id={secondId}
                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-btn-time"]}`}
                        defaultValue={sSeconds}
                        type="text"
                        onChange={evt => checkNumber(evt, 60)} />
                    <input
                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-btn-time"]} ${thisCss["dtp-btn-time-option"]}`}
                        type="button"
                        value="min"
                        onClick={() => {
                            (document.getElementById(hourId) as HTMLInputElement).value = '00';
                            (document.getElementById(minuteId) as HTMLInputElement).value = '00';
                            (document.getElementById(secondId) as HTMLInputElement).value = '00';
                            updateTimeValue();
                        }}

                    />
                    <input
                        type="button"
                        value="max"
                        className={`${thisCss["dtp-cell"]} ${thisCss["dtp-btn-time"]} ${thisCss["dtp-btn-time-option"]}`}
                        onClick={() => {
                            (document.getElementById(hourId) as HTMLInputElement).value = '23';
                            (document.getElementById(minuteId) as HTMLInputElement).value = '59';
                            (document.getElementById(secondId) as HTMLInputElement).value = '59';
                            updateTimeValue();
                        }}
                    />
                </div>
            </fieldset>

        </>;
        return contents;
    }
    function okClick(evt: React.MouseEvent | any) {
        try {
            const dtpDiv = document.getElementById(thisId);
            if (dtpDiv) {
                const selectClassName = thisCss["dtp-cell-seleted"];
                let selectedCells = dtpDiv.getElementsByClassName(selectClassName);
                if (selectedCells?.length > 0) {
                    let sMonth = "00", sDate = "00";
                    const selectedCell = selectedCells[0];
                    var key = (selectedCell.getAttribute('data-value') as string).split('-');
                    var year = parseInt(key[1]);
                    var month = parseInt(key[2]);
                    var date = parseInt(key[3]);

                    if (!isNaN(month)) {
                        sMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
                    }
                    if (!isNaN(date)) {
                        sDate = date < 10 ? `0${date}` : `${date}`;
                    }

                    let timeValue = `${sMonth}/${sDate}/${year}`;

                    if (props.showTime) {
                        let sHour = "00", sMinute = "00", sSecond = "00";
                        let hour = 0;
                        let minute = 0;
                        let second = 0;
                        try {
                            hour = parseInt((document.getElementById(hourId) as HTMLInputElement).value);
                            minute = parseInt((document.getElementById(minuteId) as HTMLInputElement).value);
                            second = parseInt((document.getElementById(secondId) as HTMLInputElement).value);

                            if (!isNaN(hour)) {
                                sHour = hour < 10 ? `0${hour}` : `${hour}`;
                            }
                            if (!isNaN(minute)) {
                                sMinute = minute < 10 ? `0${minute}` : `${minute}`;
                            }
                            if (!isNaN(second)) {
                                sSecond = second < 10 ? `0${second}` : `${second}`;
                            }
                            timeValue = `${sMonth}/${sDate}/${year} ${sHour}:${sMinute}:${sSecond}`;
                        }
                        catch (e) {
                        }

                    }

                    if (props.okClick) {
                        props.okClick(timeValue);
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    function cancelClick(evt: React.MouseEvent | any) {
        try {
            if (props.cancelClick) {
                props.cancelClick(selectedDate);
            }
        }
        catch (e) {
        }
    }


    try {
        let divConfirm = (props.showConfirm ? <div className={thisCss["dtp-btn-group"]}>
            <div
                className={`${thisCss["dtp-btn"]} ${thisCss["dtp-btn-confirm"]}`}
                onClick={okClick}>Ok</div>
            <div
                className={`${thisCss["dtp-btn"]} ${thisCss["dtp-btn-confirm"]}`}
                onClick={cancelClick}>Cancel</div>
        </div>
            : undefined);



        let datePicker = (state.type == 'month' ? renderMonths(state.year)
            : state.type == 'year' ? renderYears(state.year)
                : renderCalendar(state.year, state.month, state.date)
        );

        let timePicker = (props.showTime ? renderTime() : undefined);
        let mainContents = <div id={thisId}>
            {datePicker}
            {timePicker}
            {divConfirm}
        </div>;
        return mainContents;
    }
    catch (e) {
        console.log(e);
    }
}

export default DateTimePicker;