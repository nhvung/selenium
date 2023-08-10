import { guid8 } from "./HashFuncs";

enum httpMethodMap {
    GET = "get",
    POST = "post",
    PUT = "put",
    OPTIONS = "options",
    DELETE = "delete"
}
function httpActionAsync(url: string, method?: httpMethodMap | string, data?: any, headers?: any, onSuccess?: (response: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    try {
        const reqConfig: RequestInit = {
            method,
            headers,
            body: JSON.stringify(data),
        };

        return fetch(url, reqConfig)
            .then(onSuccess)
            .catch(onError)
            .finally(onFinally);
    }
    catch (e) {
        console.log(e);
        if (onError) {
            return onError(e);
        }
    }
}

export function postAsync(url: string, data?: any, headers?: any, onSuccess?: (response?: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    return httpActionAsync(url, httpMethodMap.POST, data, headers, onSuccess, onError, onFinally);
}
export function getAsync(url: string, headers?: any, onSuccess?: (response?: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    return httpActionAsync(url, httpMethodMap.GET, undefined, headers, onSuccess, onError, onFinally);
}
export function optionAsync(url: string, data?: any, headers?: any, onSuccess?: (response?: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    return httpActionAsync(url, httpMethodMap.OPTIONS, data, headers, onSuccess, onError, onFinally);
}
export function putAsync(url: string, data?: any, headers?: any, onSuccess?: (response?: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    return httpActionAsync(url, httpMethodMap.PUT, data, headers, onSuccess, onError, onFinally);
}
export function deleteAsync(url: string, data?: any, headers?: any, onSuccess?: (response?: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    return httpActionAsync(url, httpMethodMap.DELETE, data, headers, onSuccess, onError, onFinally);
}

export async function uploadFilesAsync(url: string, fileList?: FileList | File[], headers?: HeadersInit, onSuccess?: (response: Response) => Promise<any>, onError?: (error: any) => Promise<any>, onFinally?: () => void) {
    try {
        if (fileList?.length > 0) {
            for (var i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const reqHeaders: HeadersInit = new Headers(headers);
                let fileType = file.type;
                if (fileType == '') {
                    fileType = 'application/octet-stream';
                }
                reqHeaders.set("Content-Type", fileType);
                reqHeaders.set("Content-Length", `${file.size}`);
                reqHeaders.set("FileName", file.name);

                const reqConfig: RequestInit = {
                    method: 'post',
                    headers: reqHeaders,
                    body: file,
                };
                await fetch(url, reqConfig)
                    .then(onSuccess)
                    .catch(onError);
            }
            if (onFinally) {
                onFinally();
            }
        }

    }
    catch (e) {
        console.log(e);
        if (onError) {
            return onError(e);
        }
    }
}