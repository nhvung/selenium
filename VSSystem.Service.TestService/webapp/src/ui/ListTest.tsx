import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { componentWithApiProps } from '../components/componentDefine';
import { guid8 } from '../extensions/HashFuncs';
import thisCss from './ListTest.module.scss';
import PagingTableV2 from '../components/forms/table/PagingTableV2';
import { dataResponse, rowProps } from '../components/forms/table/PagingTable';
import { getAsync, postAsync } from '../extensions/HttpExtension';
import Layout from '../components/forms/Layout';
import ToolStripMenu from '../components/forms/toolstrip/ToolStripMenu';
import ToolStripItem from '../components/forms/toolstrip/ToolStripItem';
import { ConfirmButtons, DialogOptions, openDialog } from '../components/forms/dialog/Dialog';
import AddTest from './AddTest';
import { getElementById } from '../extensions/ElementExtension';
import InputSection from '../components/forms/InputSection';
import { navigate } from '../components/router/methods';
import { comboBoxItemProps } from '../components/forms/ComboBox';

function ListTest(props?: componentWithApiProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["ListTest"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    let apiUrl = props.apiUrl ?? window.location.href;
    const qMarkIdx = apiUrl.indexOf('?', 0);
    if (qMarkIdx > 0) {
        apiUrl = apiUrl.substring(0, qMarkIdx);
    }

    const [listKey, setListKey] = useState<string>(undefined);
    const selectedNamesRef = useRef<string[]>(undefined);
    const searchGalleryRef = useRef<any>(undefined);
    const paramsRef = useRef<any>(undefined);
    const creatorNameRef = useRef<string>(undefined);
    const [creators, setCreators] = useState<comboBoxItemProps[]>(undefined);

    function loadFilters() {
        const url = `${apiUrl.replace('/list', '')}/api/test/getfilters`;
        getAsync(url, undefined, async response => {
            if (response.status === 200) {
                const jsonObj = await response.json();
                if (jsonObj.creators?.length > 0) {
                    const creattorObjs: comboBoxItemProps[] = [{ value: "All", selected: true }];
                    [...jsonObj.creators].forEach(ite => creattorObjs.push({ value: ite }));
                    setCreators(creattorObjs);
                }
            }
        });
    }

    useEffect(() => {
        const accountName = localStorage.getItem('autotest-account-name');
        if (!accountName) {
            navigate('/autotest/login');
        }
        loadFilters();
        setListKey(guid8());
    }, []);

    async function fetchList(): Promise<dataResponse> {
        selectedNamesRef.current = undefined;
        let url = `${apiUrl.replace('/list', '')}/api/test/list/tasks?timezoneOffset=${timezoneOffset}`;
        if (creatorNameRef.current) {
            url += `&creator=${creatorNameRef.current}`;
        }
        return getAsync(url, undefined, async response => {
            const result: dataResponse = {};
            if (response.status === 200) {
                const jsonObjs = await response.json();
                if (jsonObjs?.length > 0) {
                    const records: rowProps[] = [];
                    Array.from<any>(jsonObjs).forEach((ite, idx) => {
                        const rowObj: rowProps = {
                            value: ite.name,
                            cells: [
                                { text: `${idx + 1}`, align: "center" },
                                { element: <div>{ite.name}</div> },
                                { element: <div>{ite.browser}</div>, align: "center" },
                                { element: <div>{ite.createdTime}</div>, align: "center" },
                                { element: <div>{ite.creator}</div>, align: "center" },

                            ]
                        };
                        records.push(rowObj);
                    });
                    result.records = records;
                }

            }
            return result;
        });
    }

    function onAdd(evt?: React.MouseEvent) {
        try {

            const dialogOpts: DialogOptions = {
                id: guid8(),
                title: "Add Test",
                body: (<AddTest id={`${thisId}-add-test`} searchGalleryRef={searchGalleryRef} />),
                zIndex: 1,
                confirmButtons: ConfirmButtons.YesNo,
                onPreAcceptHandler: onPreAdd,
                onAcceptHandler: add
            };
            openDialog(dialogOpts);
        }
        catch (e) {
            console.log(e);
        }
    }
    function onPreAdd(): boolean {
        try {
            const testParams: any = {
                browser: (getElementById(`${thisId}-add-test-browser-settings-browser-hidden`) as HTMLInputElement)?.value,
                isIncognito: (getElementById(`${thisId}-add-test-browser-settings-isincognito`) as HTMLInputElement)?.checked,
                isHeadless: (getElementById(`${thisId}-add-test-browser-settings-isheadless`) as HTMLInputElement)?.checked,
                resolution: (getElementById(`${thisId}-add-test-browser-settings-resolution-hidden`) as HTMLInputElement)?.value,
                runimmediately: (getElementById(`${thisId}-add-test-tasks-params-runimmediately`) as HTMLInputElement)?.checked,
            };

            testParams.name = (getElementById(`${thisId}-add-test-tasks-name`) as HTMLInputElement)?.value;
            testParams.url = (getElementById(`${thisId}-add-test-tasks-params-navigate-url`) as HTMLInputElement)?.value;
            testParams.login = {
                username: (getElementById(`${thisId}-add-test-tasks-params-login-username`) as HTMLInputElement)?.value,
                password: (getElementById(`${thisId}-add-test-tasks-params-login-password`) as HTMLInputElement)?.value,
                takeScreenshot: (getElementById(`${thisId}-add-test-tasks-params-login-takeascreenshot`) as HTMLInputElement)?.checked,
            };

            const chkSearchGalleryTask = (getElementById(`${thisId}-add-test-tasks-params-add-searchgallery-task-chk`) as HTMLInputElement)?.checked;
            if (chkSearchGalleryTask) {
                testParams.searchgallery = searchGalleryRef;
            }

            testParams.creatorName = localStorage.getItem('autotest-account-name');

            paramsRef.current = testParams;
            return true;
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }
    function add() {
        try {
            const url = `${apiUrl.replace('/list', '')}/api/test/add`;
            postAsync(url, paramsRef.current, undefined, async response => {
                if (response.status === 200) {
                    setListKey(guid8());
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    let runRequestObj: any = undefined;
    function onRun(evt?: React.MouseEvent) {
        try {
            runRequestObj = undefined;
            if (selectedNamesRef.current?.length > 0) {

                const skypeId = localStorage.getItem('autotest-account-skypeid');
                const message = `Do you want to run ${selectedNamesRef.current.length} selected test(s)?`;
                const dialogOpts: DialogOptions = {
                    id: guid8(),
                    title: "Run Test",
                    body: (<div className={thisCss["ListTest-popup-run"]}>
                        <div className={thisCss["ListTest-popup-run-message"]}>{message}</div>
                        <fieldset>
                            <legend>Notification (if have)</legend>
                            <div>
                                <InputSection id={`${thisId}-notify-skypeids`} inputType="text" label='Skype Ids' defaultValue={skypeId} onChange={(v, t) => { localStorage.setItem('autotest-account-skypeid', v.toString()); }} />
                            </div>
                        </fieldset>

                    </div>),
                    onAcceptHandler: runTest,
                    onPreAcceptHandler: preRunTest,
                    zIndex: 1,
                    confirmButtons: ConfirmButtons.YesNo
                };
                openDialog(dialogOpts);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    function preRunTest() {
        runRequestObj = {
            names: selectedNamesRef.current
        };
        runRequestObj.skypeids = (getElementById(`${thisId}-notify-skypeids`) as HTMLInputElement)?.value?.split(',');
        return true;
    }
    function runTest() {
        try {
            if (runRequestObj) {
                const url = `${apiUrl.replace('/list', '')}/api/test/run`;
                postAsync(url, runRequestObj, undefined, async response => {
                    if (response.status === 200) {

                    }
                });
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    function onDelete(evt?: React.MouseEvent) {
        if (selectedNamesRef.current?.length > 0) {
            const message = `Do you want to delete ${selectedNamesRef.current.length} selected test(s)?`;
            const dialogOpts: DialogOptions = {
                id: guid8(),
                title: "Delete Test",
                body: (<div>{message}</div>),
                onAcceptHandler: deleteTest,
                zIndex: 1,
                confirmButtons: ConfirmButtons.YesNo
            };
            openDialog(dialogOpts);
        }
        else {

        }
    }
    function deleteTest() {
        try {
            const url = `${apiUrl.replace('/list', '')}/api/test/delete`;
            postAsync(url, selectedNamesRef.current, undefined, async response => {
                if (response.status === 200) {
                    setListKey(guid8());
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    function search() {
        setListKey(guid8());
    }

    try {

        const menuElement: JSX.Element = (<ToolStripMenu
            id={`${thisId}-menu`}
            className={thisCss["ListTest-menu"]}
        >
            <ToolStripItem text='Menu' />
            <ToolStripItem text='Refresh' onClick={() => setListKey(guid8())} />
            <ToolStripItem text='|' />
            <ToolStripItem text='Add' onClick={onAdd} />
            <ToolStripItem text='Run' onClick={onRun} />
            <ToolStripItem text='|' />
            <ToolStripItem text='Delete' onClick={onDelete} />
        </ToolStripMenu>);

        const filtersElement: JSX.Element = creators ? (<div id={`${thisId}-filters`} className={thisCss["ListTest-filters"]}>
            <InputSection label='Creator' inputType="combobox" items={creators} onChange={(v, t) => {
                if (v == "All") {
                    creatorNameRef.current = undefined;
                }
                else {
                    creatorNameRef.current = v.toString();
                }
            }} />
            <button onClick={search}>Search</button>
        </div>) : undefined;

        let footer: JSX.Element = (<ToolStripMenu id={`${thisId}-footer`} className={thisCss["ListTest-layout-footer"]}>
            <ToolStripItem text={`Account: ${localStorage.getItem('autotest-account-name')}`} className={thisCss["ListTest-layout-footer-name"]} />
            <ToolStripItem text={`Logout`} onClick={() => navigate('/autotest/login')} />
        </ToolStripMenu>);

        const tHeaders = ["1. No.", "2. Name", "3. Browser", "4. Created Time", "5. Creator"];
        let contents = (<div id={thisId} className={className}>
            <Layout
                id={`${thisId}-layout`}
                className={thisCss["ListTest-layout"]}
                headerClassName={thisCss["ListTest-layout-header"]}
                header={menuElement}
                footer={footer}
            >
                <div className={thisCss["ListTest-layout-contents"]}>
                    {filtersElement}
                    <PagingTableV2
                        key={listKey}
                        id={`${thisId}-list`}
                        className={thisCss["ListTest-list"]}
                        headers={tHeaders}
                        noPaging
                        fetchData={fetchList}
                        includeCheckbox
                        rowCheckChange={vals => { selectedNamesRef.current = vals; }}
                        height={'86%'}
                    />
                </div>

            </Layout>

        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default ListTest;