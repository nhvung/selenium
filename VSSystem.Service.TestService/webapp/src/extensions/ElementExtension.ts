import React from "react";
import { Root } from "react-dom/client";
import { guid8 } from "./HashFuncs";
import { sleep } from "./ThreadExtension";

export function getOrCreateDiv(id?: string, parentContaner?: HTMLElement): HTMLDivElement {
    try {
        if (!id) {
            id = guid8();
        }
        let div = document.getElementById(id) as HTMLDivElement;
        if (!div) {
            div = document.createElement("div");
            div.id = id;
            if (parentContaner) {
                parentContaner.appendChild(div);
            }
            else {
                document.body.appendChild(div);
            }

        }
        return div;
    }
    catch (e) {
    }
    return null;
}
export function getOrCreateTag(id?: string, tagName?: keyof HTMLElementTagNameMap, parentContaner?: HTMLElement, remove?: boolean) {
    try {
        if (!id) {
            id = guid8();
        }
        let div = document.getElementById(id);
        if (div) {
            if (remove) {
                div.remove();
                div = undefined;
            }
        }

        if (!div) {
            div = document.createElement(tagName);
            div.id = id;

            if (parentContaner) {
                parentContaner.appendChild(div);
            }
            else {
                document.body.appendChild(div);
            }
            div.focus();
        }
        return div;
    }
    catch (e) {
    }
    return null;
}
export function removeElement(id?: string) {
    try {
        const elementObj = document.getElementById(id);
        if (elementObj) {
            elementObj.remove();
        }
    }
    catch (e) {
    }
}
export function showElementRelative(element: HTMLElement, evt: React.MouseEvent, position?: "top" | "right", deltaMarginValue?: number) {
    try {
        // await sleep(1);
        var rect = evt.currentTarget.getBoundingClientRect();
        var elementRect = element.getBoundingClientRect();

        let posX = rect.x;
        let posY = rect.y + rect.height + 5;


        if (position === "right") {
            posX = rect.right + 2 + deltaMarginValue;
            posY = rect.top;
        }

        const screenHeight = screen.availHeight - (window.outerHeight - window.innerHeight);
        const screenWidth = screen.availWidth - (window.outerWidth - window.innerWidth);

        if (rect.bottom + elementRect.height >= screenHeight) {
            posY = rect.bottom - elementRect.height - rect.height - 5;
            if (position === "right") {
                posY = posY + rect.height + 5 + deltaMarginValue;
            }
        }
        if (rect.right + elementRect.width >= screenWidth) {
            posX = rect.right - elementRect.width;
            if (position === "right") {
                posX = posX - elementRect.width - 2 - deltaMarginValue;
            }
        }
        if (posX < 0) { posX = 0; }
        if (posY < 0) { posY = 0; }
        Object.assign(element.style, {
            left: `${posX}px`,
            top: `${posY}px`,
        });
    }
    catch (e) {
    }
}
export async function showElementRelativeTarget(element?: HTMLElement, target?: Element | string, position?: "top" | "right") {
    try {
        await sleep(1);
        let targetObj: Element = undefined;
        const targetType = typeof (target);
        if (targetType == "object") {
            try {
                targetObj = target as Element;
            }
            catch (e) {
            }
        }
        if (!targetObj) {
            targetObj = document.getElementById(target as string);
        }
        if (targetObj) {
            var rect = targetObj.getBoundingClientRect();
            var elementRect = element.getBoundingClientRect();
            let posX = rect.x;
            let posY = rect.y + rect.height + 5;

            if (position === "right") {
                posX = rect.right + 2;
                posY = rect.top;
            }

            const screenHeight = screen.availHeight - (window.outerHeight - window.innerHeight);
            const screenWidth = screen.availWidth - (window.outerWidth - window.innerWidth);

            if (rect.bottom + elementRect.height >= screenHeight) {
                posY = rect.bottom - elementRect.height - rect.height - 5;
                if (position === "right") {
                    posY = posY + rect.height + 5;
                }
            }
            if (rect.right + elementRect.width >= screenWidth) {
                posX = Math.min(rect.right - elementRect.width, rect.left);
                if (position === "right") {
                    posX = posX - elementRect.width - 2;
                }
            }

            if (posX < 0) { posX = 0; }
            if (posY < 0) { posY = 0; }

            Object.assign(element.style, {
                left: `${posX}px`,
                top: `${posY}px`,
            });
        }
    }
    catch (e) {
    }
}

export function getElementById(id?: string) {
    return document.getElementById(id);
}
export function updateTitle(title: string) {
    return document.title = title;
}

export function isInElement(evt: React.MouseEvent, element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top && evt.clientY <= rect.bottom;
}
export function isInElementV2(evt: MouseEvent | React.MouseEvent, element: HTMLElement): boolean {
    try {
        const rect = element.getBoundingClientRect();
        return evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top && evt.clientY <= rect.bottom;
    }
    catch (e) {
        console.log(e);
    }
    return false;
}

export function getChildren(props: any): JSX.Element[] {
    let result: JSX.Element[] = [];
    try {
        if (props.children) {
            if (Array.isArray(props.children)) {
                Array.from(props.children).forEach((ite: any) => result.push(ite));
            }

            if (result.length == 0) {
                result.push(props.children);
            }
        }
    }
    catch (e) {
    }
    return result;
}

export function keydownNumber(evt: React.KeyboardEvent<HTMLInputElement>, maxLength?: number) {
    try {
        const keyCode = evt.which;
        if (keyCode === 0 || keyCode === 37 || keyCode === 39 || keyCode === 8 || keyCode === 9) {
            return;
        }
        else if (keyCode === 190 || keyCode === 110) {
            if (evt.currentTarget.value.indexOf(evt.key) >= 0) {
                evt.preventDefault();
            }
        }
        else if (keyCode == 47) {
            evt.preventDefault();
        }
        else if (keyCode < 96 && (keyCode < 48 || keyCode > 56)) {
            evt.preventDefault();
        }
        else if (keyCode < 96 || keyCode > 105) {
            evt.preventDefault();
        }
        else {
            if (maxLength > 0) {
                if (evt.currentTarget.value.length > maxLength) {
                    evt.preventDefault();
                }
            }
        }
    }
    catch (e) {
    }
}

export type ElementType<T extends Iterable<any>> = T extends Iterable<infer E> ? E : never;