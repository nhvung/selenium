export type componentProps = {
    id?: string,
    className?: string,
    onClick?: (evt?: React.MouseEvent) => void,
    children?: any,
    style?: any,
    name?: string,
    onloaded?: () => void,
    dispose?: () => void
}

export type componentWithApiProps = {
    id?: string,
    className?: string,
    onClick?: (evt?: React.MouseEvent) => void,
    apiUrl?: string,
    children?: any,
    style?: any,
    name?: string,
    onloaded?: () => void
    dispose?: () => void,
    onUnauthorize?: (navigatePath?: string) => void
}