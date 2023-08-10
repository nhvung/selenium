import { useEffect, useState } from 'react';
import { getElementById } from '../../extensions/ElementExtension';
import { guid8 } from '../../extensions/HashFuncs';
import { sleep } from '../../extensions/ThreadExtension';
import { componentProps } from '../componentDefine';
import thisCss from './Layout.module.scss';
function Layout(props?: componentProps & {
    header?: any,
    headerClassName?: string,
    footer?: any,
    footerClassName?: string,
    maxHeight?: any
}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["Layout"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const headerId = `${thisId}-header`;
    const footerId = `${thisId}-footer`;
    const contentId = `${thisId}-content`;

    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {

        const updateElements = async () => {
            await sleep(10);

            const contentDiv = getElementById(contentId) as HTMLDivElement;
            let hasHeaderOrFooter = false;
            let contentHeight = screen.availHeight - (window.outerHeight - window.innerHeight);
            if (contentDiv) {
                if (contentDiv.parentElement) {
                    var rect = contentDiv.parentElement.getBoundingClientRect();
                    contentHeight = rect.height;
                }
            }

            let top = 0, bottom = 0;
            const headerDiv = getElementById(headerId) as HTMLDivElement;
            if (headerDiv) {
                var rect = headerDiv.getBoundingClientRect();
                top = rect.height;
                contentHeight -= rect.height;
                hasHeaderOrFooter = true;
            }

            const footerDiv = getElementById(footerId) as HTMLDivElement;
            if (footerDiv) {
                var rect = footerDiv.getBoundingClientRect();
                contentHeight -= rect.height;
                bottom = rect.top;
                hasHeaderOrFooter = true;
            }

            if (props.maxHeight) {
                if (props.maxHeight < contentHeight) {
                    contentHeight = props.maxHeight;
                }
            }

            if (hasHeaderOrFooter) {
                Object.assign(contentDiv.style, {
                    top: `${top}px`,
                });
            }
            setContentHeight(contentHeight);
        };

        updateElements();

    }, []);

    try {
        let headerDiv = undefined;
        if (props.header) {
            headerDiv = (<div className={`${thisCss["Layout-header-sticky"]} ${props.headerClassName}`} id={headerId}>{props.header}</div>);
        }
        let footerDiv = undefined;
        if (props.footer) {
            footerDiv = (<div className={`${thisCss["Layout-footer-sticky"]} ${props.footerClassName}`} id={footerId}>{props.footer}</div>);
        }
        let contents = (<div
            id={thisId}
            className={className}

        >
            {headerDiv}
            <div id={contentId} style={{ maxHeight: props.maxHeight, height: contentHeight }} className={thisCss["Layout-content"]}>{props.children}</div>
            {footerDiv}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Layout;