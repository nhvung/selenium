export async function hash(clearText: string, hashName: string) {
    try {
        const encodedText = new TextEncoder().encode(clearText);

        const hexValue = await crypto.subtle.digest(hashName, encodedText)
            .then(bytes2hex)
            .catch(() => '');
        return hexValue;
    }
    catch (e) {
        console.log(e);
    }
}

export function bytes2hex(buffer: ArrayBuffer): string {
    try {
        const bufferBytes = Array.from(new Uint8Array(buffer));
        const hex = bufferBytes.map((b) => b.toString(16).padStart(2, '0')).join('');
        return hex;
    }
    catch (e) {
    }
    return '';
}

export function guid() {
    try {
        const baseNumber = 16;
        let timeNow = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-1517-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (timeNow + Math.random() * baseNumber) % baseNumber | 0;
            timeNow = Math.floor(timeNow / baseNumber);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(baseNumber);
        });
        return uuid;
    }
    catch (e) {
        return '';
    }

}
export function guid8(): string {
    let result = guid().substring(28);
    return result;
}