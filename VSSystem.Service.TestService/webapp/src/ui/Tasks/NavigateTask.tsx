import { componentProps } from '../../components/componentDefine';
import InputSection from '../../components/forms/InputSection';
import { guid8 } from '../../extensions/HashFuncs';
import thisCss from './NavigateTask.module.scss';
import { taskProps } from './TaskDefine';

function NavigateTask(props?: componentProps & taskProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["NavigateTask"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}>
            <InputSection id={`${thisId}-url`} className={thisCss["NavigateTask-url"]} contentEditable label='Url' inputType="combobox" items={[
                { value: "https://14.161.7.248:4431/ballisticsearch", text: "https://14.161.7.248:4431/ballisticsearch", selected: true },
                "https://sandbox.evidenceiq.com/biq",
                "https://login.evidenceiq.com/biq"
            ]} />
            {props.takeScreenshot ? (<InputSection id={`${thisId}-takeascreenshot`} inputType="checkbox" label="Take a screenshot" />) : undefined}
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default NavigateTask;