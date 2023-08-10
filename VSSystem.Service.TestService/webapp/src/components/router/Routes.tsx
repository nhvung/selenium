
export function Routes(props: {
    children?: any,
    onValidating?: () => boolean,
    fallback?: () => any
}): JSX.Element {

    let isValid = true;
    if (props.onValidating) {
        isValid = props.onValidating();
    }
    let contents = undefined;
    if (isValid) {
        contents = (props.children);
    }
    else {
        if (props.fallback) {
            contents = props.fallback();
        }
    }
    return contents;

}