export function getTimeZoneValue(timezoneOffset: number, excludeParenthesis?: boolean): string {
    try {
        const tzInHour = Math.floor(Math.abs(timezoneOffset) / 60);
        const tzInMinute = Math.floor(Math.abs(timezoneOffset) % 60);
        let result = `(GMT${timezoneOffset > 0 ? '-' : '+'}${tzInHour > 10 ? tzInHour : `0${tzInHour}`}:${tzInMinute > 10 ? tzInMinute : `0${tzInMinute}`})`;
        if (excludeParenthesis) {
            result = `GMT${timezoneOffset > 0 ? '-' : '+'}${tzInHour > 10 ? tzInHour : `0${tzInHour}`}:${tzInMinute > 10 ? tzInMinute : `0${tzInMinute}`}`;
        }

        return result;
    }
    catch (e) {
    }
    return undefined;
}
export function getDateValue(month?: number, day?: number): string {
    let result = undefined;
    try {
        const dayValue = `${day == 1 ? '1st' : day == 2 ? '2nd' : day == 3 ? '3rd' : day == 21 ? '21st' : day == 22 ? '22nd' : day == 23 ? '23rd' : `${day}th`}`;

        const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (month > 0 && month <= 12) {
            result = `${shortMonthNames[month - 1]} ${dayValue}`;
        }
        else {
            result = dayValue;
        }
    }
    catch (e) {
    }
    return result;
}
export function getDateTimeValue(dt?: Date): string {
    let result = undefined;
    try {
        const day = dt.getDate(), month = dt.getMonth(), year = dt.getFullYear();
        const hours = dt.getHours(), minutes = dt.getMinutes(), seconds = dt.getSeconds();
        const monthValue = `${month < 9 ? `0${month + 1}` : `${month + 1}`}`;
        const dayValue = !day || day < 0 ? '' : day < 10 ? `0${day}` : `${day}`;
        const hoursValue = !hours || hours < 0 ? '' : hours < 10 ? `0${hours}` : `${hours}`;
        const minutesValue = !minutes || minutes < 0 ? '' : minutes < 10 ? `:0${minutes}` : `:${minutes}`;
        const secondsValue = !seconds || seconds < 0 ? '' : seconds < 10 ? `:0${seconds}` : `:${seconds}`;
        result = `${monthValue}/${dayValue}/${year} ${hoursValue}${minutesValue}${secondsValue}`;
    }
    catch (e) {
    }
    return result;
}
export function getTimeValue(hours?: number, minutes?: number, seconds?: number): string {
    try {
        const hoursValue = !hours || hours < 0 ? '' : hours < 10 ? `0${hours}` : `${hours}`;
        const minutesValue = !minutes || minutes < 0 ? '' : minutes < 10 ? `:0${minutes}` : `:${minutes}`;
        const secondsValue = !seconds || seconds < 0 ? '' : seconds < 10 ? `:0${seconds}` : `:${seconds}`;
        const result = `${hoursValue}${minutesValue}${secondsValue}`;
        return result;
    }
    catch (e) {
    }
    return undefined;
}