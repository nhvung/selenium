import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './DatabaseInfo.module.scss';
import TextFilter from '../filters/TextFilter';
import { getElementById } from '../../../extensions/ElementExtension';
import { DatabaseProps } from './Define';


function DatabaseInfo(props?: componentProps & {
    onChange?: (info?: DatabaseProps) => void
}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["DatabaseInfo"];

    function onChange() {
        try {
            const txtServer = getElementById(`${thisId}-server`) as HTMLInputElement;
            const txtPort = getElementById(`${thisId}-port`) as HTMLInputElement;
            const txtUsername = getElementById(`${thisId}-username`) as HTMLInputElement;
            const txtPassword = getElementById(`${thisId}-password`) as HTMLInputElement;
            const txtDatabase = getElementById(`${thisId}-database`) as HTMLInputElement;

            if (props.onChange) {
                props.onChange({ Server: txtServer?.value, Port: txtPort?.value, Username: txtUsername?.value, Password: txtPassword?.value, Database: txtDatabase?.value });
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}>
            <div className={thisCss["DatabaseInfo-input"]}>
                <label>Server:</label>
                <TextFilter id={`${thisId}-server`} text='' onChange={onChange} onClear={onChange} />
            </div>
            <div className={thisCss["DatabaseInfo-input"]} >
                <label>Port:</label>
                <TextFilter id={`${thisId}-port`} text='' type="number" min={0} step={1} onChange={onChange} onClear={onChange} />
            </div>
            <div className={thisCss["DatabaseInfo-input"]} >
                <label>Username:</label>
                <TextFilter id={`${thisId}-username`} text='' onChange={onChange} onClear={onChange} />
            </div>
            <div className={thisCss["DatabaseInfo-input"]} >
                <label>Password:</label>
                <TextFilter id={`${thisId}-password`} text='' type="password" onChange={onChange} onClear={onChange} />
            </div>
            <div className={thisCss["DatabaseInfo-input"]} >
                <label>Database:</label>
                <TextFilter id={`${thisId}-database`} text='' onChange={onChange} onClear={onChange} />
            </div>

        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default DatabaseInfo;