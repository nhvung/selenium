import { useEffect } from "react";

export function Route(props:
    {
        path?: string,
        prefixPath?: string,
        element?: any,
        redirectPath?: string,
        aliasPath?: string,
        children?: any,
        onloaded?: () => void
    }) {


    useEffect(() => {
        if (props.onloaded) {
            props.onloaded();
        }
    }, []);

    let contents = undefined;
    try {

        let tPath = `${window.location.pathname}`;
        if (window.location.protocol == 'file:') {
            tPath = '/';
            if (window.location.hash) {
                tPath = window.location.hash.substring(1);
            }
        }

        if (tPath) {
            while (tPath.startsWith('/')) {
                tPath = tPath.substring(1);
            }
            while (tPath.endsWith('/')) {
                tPath = tPath.substring(0, tPath.length - 1);
            }

            tPath = `/${tPath}`;
        }

        tPath += "/";

        let aliasPath = props.aliasPath;
        if (aliasPath) {
            while (aliasPath.startsWith('/')) {
                aliasPath = aliasPath.substring(1);
            }
            while (aliasPath.endsWith('/')) {
                aliasPath = aliasPath.substring(0, aliasPath.length - 1);
            }
            aliasPath = `/${aliasPath}`;
            if (tPath.indexOf(aliasPath) === 0) {
                tPath = `/${tPath.substring(aliasPath.length)}`;
            }
        }

        if (tPath.localeCompare(`${props.path}/`, undefined, { sensitivity: 'accent' }) === 0) {
            if (props.redirectPath) {
                window.location.pathname = props.redirectPath;
                return undefined;
            }
            contents = (<>{props.element ?? props.children}</>);
        }
        else if (tPath.startsWith(`${props.prefixPath}/`)) {
            if (props.redirectPath) {
                window.location.pathname = props.redirectPath;
                return undefined;
            }
            contents = (<>{props.element ?? props.children}</>);
        }
    }
    catch (e) {
    }

    return contents;
}