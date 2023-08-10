export enum EDock {
    None = "none",
    Left = "left",
    Right = "right",
    Top = "top",
    Bottom = "bottom",
    Fill = "fill"
}

export type ItemProperty<TChildren> = {
    className?: string,
    children?: TChildren,
    dock?: EDock | string,
    id?: string,
    width?: any,
    height?: any,
    top?: any,
    left?: any,
    right?: any,
    bottom?: any
}
