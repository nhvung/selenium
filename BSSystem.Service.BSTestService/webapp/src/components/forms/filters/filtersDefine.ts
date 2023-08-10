export type itemFilterProps = {
    id?: string,
    key?: string,
    name?: string,
    checked?: boolean,
    element?: any
};

export function sortItemFilter(item1: itemFilterProps, item2: itemFilterProps) {
    return item1?.name?.localeCompare(item2?.name, undefined, { sensitivity: 'accent' });
}