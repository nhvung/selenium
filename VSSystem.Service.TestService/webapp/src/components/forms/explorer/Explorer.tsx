import { getElementById } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import { openFile } from '../dialog/Dialog';
import thisCss from './Explorer.module.scss';
function Explorer(props?: componentProps & {

}) {
    const thisId = props.id ?? guid8();
    const folderId = `${thisId}-folder`;
    let className = thisCss["Explorer"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    try {
        let contents = (<div id={thisId} className={className}>
            <input id={folderId} type="text" /><button onClick={() => openFile({ isFolderPicker: true, onSelected: (result) => { (getElementById(folderId) as HTMLInputElement).value = result.files[0].webkitRelativePath } })}>...</button>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Explorer;