import { componentProps } from '../../components/componentDefine';
import ComboBox from '../../components/forms/ComboBox';
import InputSection from '../../components/forms/InputSection';
import { guid8 } from '../../extensions/HashFuncs';
import thisCss from './LoginTask.module.scss';
import { taskProps } from './TaskDefine';
function LoginTask(props?: componentProps & taskProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["LoginTask"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}>
            <InputSection id={`${thisId}-username`} inputType="text" label="Username / Email" />
            <InputSection id={`${thisId}-password`} inputType="password" label="Password" />
            {props.takeScreenshot ? (<InputSection id={`${thisId}-takeascreenshot`} inputType="checkbox" label="Take a screenshot" defaultChecked />) : undefined}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default LoginTask;