import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import baseCss from './FilterItem.module.scss';
import thisCss from './LabelFilter.module.scss';

function LabelFilter(props: componentProps & FilterItemProps) {

    let id = props.id ?? guid8();
    let className = `${baseCss.FilterItem ?? ''} ${thisCss.LabelFilter ?? ''}`;

    try {
        let contents = (<label id={id} className={className}>{props.text ?? props.children}</label>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}

export default LabelFilter;