import { useRef } from 'react';
import { componentProps } from '../components/componentDefine';
import InputSection from '../components/forms/InputSection';
import { ConfirmButtons, DialogOptions, openDialog } from '../components/forms/dialog/Dialog';
import { getElementById } from '../extensions/ElementExtension';
import { guid8 } from '../extensions/HashFuncs';
import thisCss from './AddTest.module.scss';
import LoginTask from './Tasks/LoginTask';
import NavigateTask from './Tasks/NavigateTask';
import SearchGalleryTask from './Tasks/SearchGalleryTask';
import { taskProps, updateParamsRef } from './Tasks/TaskDefine';
function AddTest(props?: componentProps & taskProps & {
    searchGalleryRef?: any
}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["AddTest"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const zIndex = props.zIndex ?? 0;
    const searchGalleryRef = useRef<any>(undefined);



    function onAddSearchGalleryTask() {
        try {
            const dialogOpts: DialogOptions = {
                id: `${thisId}-popup-searchgallery`,
                title: "Add Search Gallery Task",
                bodyClassName: thisCss["AddTest-popup"],
                body: (
                    <SearchGalleryTask
                        id={`${thisId}-tasks-params-searchgallery`}
                        takeScreenshot
                        paramsRef={searchGalleryRef}
                        zIndex={zIndex + 2} />),
                zIndex: zIndex + 2,
                confirmButtons: ConfirmButtons.YesNo,
                onPreAcceptHandler: onPreAddSearchGalleryTask,
                onPreDenyHandler: onPreRemoveSearchGalleryTask
            };
            openDialog(dialogOpts);
        }
        catch (e) {
            console.log(e);
        }
    }
    function onPreAddSearchGalleryTask() {
        updateParamsRef(props.searchGalleryRef, searchGalleryRef);
        return true;
    }
    function onPreRemoveSearchGalleryTask() {
        try {
            const chk = getElementById(`${thisId}-tasks-params-add-searchgallery-task-chk`) as HTMLInputElement;
            if (chk) {
                chk.checked = false;
            }
            Object.assign(props.searchGalleryRef, undefined);
        }
        catch (e) {
            console.log(e);
        }
        return true;
    }

    try {
        let contents = (<div id={thisId} className={className} style={{ zIndex }}>

            <InputSection id={`${thisId}-tasks-name`} inputType="text" label='Name' />

            <fieldset id={`${thisId}-browser-settings`} className={thisCss["AddTest-browser-settings"]}>
                <legend>Browser Settings</legend>
                <div className={`${thisCss["AddTest-row"]}`}>
                    <InputSection
                        id={`${thisId}-browser-settings-browser`}
                        label='Browser'
                        inputType='combobox'
                        items={[
                            { value: "chrome", text: "Chrome", selected: true },
                            { value: "firefox", text: "Firefox" },
                            { value: "edge", text: "Edge" },
                        ]} />
                    <InputSection id={`${thisId}-browser-settings-isincognito`} label='Incognito' inputType='checkbox' defaultChecked={true} />
                    <InputSection id={`${thisId}-browser-settings-isheadless`} label='Headless' inputType='checkbox' defaultChecked={true} />
                    <InputSection
                        id={`${thisId}-browser-settings-resolution`}
                        label='Resolution'
                        inputType='combobox'
                        items={[
                            { value: 'hd', text: 'HD (1366 x 768)' },
                            { value: 'hd+', text: 'HD+ (1440 x 768)' },
                            { value: 'fullhd', text: 'Full HD (1920 x 1080)' },
                            { value: 'wuxga', text: 'Widescreen Ultra HD (1920 x 1200)', selected: true },
                            { value: 'fullhd+', text: 'Full HD+ (2160 x 1080)' },
                            { value: '2k', text: '2K (2560 x 1440)' },
                            { value: '4k', text: '4K (3840 x 2160)' },
                        ]} />
                </div>
            </fieldset>
            <fieldset id={`${thisId}-tasks-params`} className={thisCss["AddTest-tasks-params"]}>
                <legend>Tasks</legend>
                <div className={thisCss["AddTest-tasks-params"]}>
                    <NavigateTask id={`${thisId}-tasks-params-navigate`} className={thisCss["AddTest-row"]} />
                    <fieldset>
                        <legend>Login Info</legend>
                        <div><LoginTask id={`${thisId}-tasks-params-login`} className={thisCss["AddTest-row"]} takeScreenshot /></div>
                    </fieldset>
                    <fieldset>
                        <legend>Additional Actions</legend>
                        <div>
                            <InputSection id={`${thisId}-tasks-params-add-searchgallery-task-chk`} inputType="checkbox" label='Add Search Gallery' defaultChecked={false} onClick={onAddSearchGalleryTask} />
                        </div>
                    </fieldset>

                    <InputSection id={`${thisId}-tasks-params-runimmediately`} inputType="checkbox" label='Run Immediately' />
                </div>
            </fieldset>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default AddTest;