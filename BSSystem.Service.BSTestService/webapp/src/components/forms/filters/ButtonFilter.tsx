import { guid8 } from '../../../extensions/HashFuncs';
import baseCss from './FilterItem.module.scss';
import thisCss from './ButtonFilter.module.scss';
import React from 'react';
import { componentProps } from '../../componentDefine';

function ButtonFilter(props: componentProps & FilterItemProps & {
    onClick?: (evt: React.MouseEvent) => void
}) {
    let id = props.id ?? guid8();
    let className = `${baseCss.FilterItem ?? ''} ${thisCss["ButtonFilter"]} ${props.children ? thisCss["ButtonFilter-element"] : undefined}`;
    function onClick(evt: React.MouseEvent) {
        try {
            if (props.onClick) {
                props.onClick(evt);
            }
        }
        catch (e) {
        }
    }
    try {
        let contents = (<button id={id} key={id} className={className} onClick={onClick}>
            {props.children ?? (<span className={thisCss['content']}>{props.text}</span>)}
        </button >);
        return contents;
    }
    catch (e) {
    }
}

export default ButtonFilter;