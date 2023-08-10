import { guid8 } from "../../extensions/HashFuncs";

export function navigate(path: string, target?: "new-tab" | "popup" | undefined) {
    if (path) {
        if (window.location.protocol === 'file:') {
            window.location.hash = `#${path}`;
            window.location.reload();

        }
        else {

            if (target) {
                if (target === "popup") {
                    window.open(`${path}`, guid8(), "popup");
                }
                else {
                    window.open(`${path}`, guid8());
                }
            }
            else {
                window.location.href = `${path}`;
            }
        }
    }

}