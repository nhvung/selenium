import { guid8 } from '../../extensions/HashFuncs';
import { componentProps } from '../componentDefine';
import thisCss from './ProgressBar.module.scss';
function ProgressBar(props?: componentProps & {
    total: number,
    value?: number,
    showPercentage?: boolean
}) {
    const thisId = props.id ?? guid8();
    try {

        const total = props.total;
        const value = props.value ?? 0;
        const percent = total > 0 ? value * 100 / total : 0;

        let className = thisCss["ProgressBar"];
        if (props?.className) {
            className += ` ${props.className}`;
        }
        let contents = (<div id={thisId} className={className}
            title={props?.showPercentage ? `${Math.round(percent)}%` : undefined}
        >
            <div
                className={thisCss["ProgressBar-current"]}
                style={{ width: `${percent}%` }}

            >
                {/* {props?.showPercentage ? (<span className={thisCss["ProgressBar-current-percent"]}>{`${Math.round(percent)}%`}</span>) : undefined} */}
            </div>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ProgressBar;