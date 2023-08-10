export function sleep<TValue>(ms: number, value?: TValue): Promise<TValue> {
    return new Promise((resolver) => setTimeout(() => {
        resolver(value);
    }, ms));
}