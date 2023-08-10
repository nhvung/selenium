export interface taskProps {
    takeScreenshot?: boolean,
    zIndex?: number,
    paramsRef?: any
}
export function updateParamsRef(ref: React.MutableRefObject<any>, src: any) {
    Object.assign(ref, src);
}