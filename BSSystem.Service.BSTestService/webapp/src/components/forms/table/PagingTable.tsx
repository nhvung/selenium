import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { getElementById, getOrCreateTag, isInElement } from '../../../extensions/ElementExtension';
import { guid8 } from '../../../extensions/HashFuncs';
import { componentProps } from '../../componentDefine';
import thisCss from './PagingTable.module.scss';

export type dataResponse = {
    pageNumber?: number,
    totalRecords?: number,
    totalPages?: number,
    records?: rowProps[] | any[],
    ignoreRender?: boolean
};
export type dataRequest = {
    pageSize?: number,
    pageNumber?: number,
    data?: any
}
export type rowProps = {
    id?: string,
    value?: string,
    className?: string,
    cells?: cellProps[],
    onClick?: (evt?: React.MouseEvent) => void
    onDoubleClick?: (evt?: React.MouseEvent) => void,
}
export type cellProps = {
    id?: string,
    className?: string,
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    element?: any,
    text?: string,
    colSpan?: number,
    rowSpan?: number,
    onClick?: (evt?: React.MouseEvent) => void,
    onDoubleClick?: (evt?: React.MouseEvent) => void
};

export type pagingTableProps = {
    height?: any,
    maxHeight?: any,
    headers?: any[],
    itemsPerPages?: any[],
    cellSpacing?: number,
    cellPadding?: number,
    fetchData?: (req: dataRequest) => Promise<dataResponse>,
    openProcessing?: (opts: {}) => void,
    closeProcessing?: () => void,
    includeCheckbox?: boolean,
    pageSize?: number,
    pageSteps?: number,
    noPaging?: boolean,
    checkAllRowsChange?: (evt?: React.ChangeEvent<HTMLInputElement>) => void,
    checkRowChange?: (evt?: React.ChangeEvent<HTMLInputElement>) => void,
    checkRowOnClick?: boolean,
    rowCheckChange?: (values?: any[]) => void,
    pageSizeChange?: (pageSize?: number) => void,
    onLoadingMessage?: string,
    autoRefreshInterval?: () => number,
    onInitMessage?: string | JSX.Element
}

function PagingTable(props: componentProps & pagingTableProps) {

    const thisId = props?.id ?? guid8();
    let tPageSize: number = props.pageSize;
    if (!tPageSize) {
        if (props.itemsPerPages?.length > 0) {
            tPageSize = props.itemsPerPages[0];
        }
        if (!tPageSize) {
            tPageSize = 100;
        }
    }
    let [pageSize, setPageSize] = useState(tPageSize);
    let [pageNumber, setPageNumber] = useState(1);
    const [loaded, setLoaded] = useState(false);

    let totalRef: { totalPages?: number, totalRecords?: number, records?: rowProps[], pageNumber?: number } | undefined;
    let setTotalRef: any;
    [totalRef, setTotalRef] = useState(undefined);
    const noPaging = props.noPaging ?? false;

    let bodyClassName = thisCss["PagingTable-body"];
    const bodyId = `${thisId}-body`;
    let refreshTimeoutFunc: NodeJS.Timeout = undefined;
    const [bodyKey, setBodyKey] = useState<string>(guid8());

    useEffect(() => {
        try {
            if (props.fetchData) {
                const thisDiv = getElementById(thisId);
                if (thisDiv) {
                    executeFetchData();
                }
            }
        }
        catch (e) {
        }

    }, [pageSize, pageNumber]);


    async function executeFetchData() {
        try {
            const thisDiv = getElementById(thisId);
            if (!thisDiv) {
                if (refreshTimeoutFunc) {
                    clearTimeout(refreshTimeoutFunc);
                }
                if (props.dispose) {
                    props.dispose();
                }
                return;
            }
            setLoaded(false);
            if (refreshTimeoutFunc) {
                clearTimeout(refreshTimeoutFunc);
            }

            if (props.openProcessing) {
                props.openProcessing({});
            }
            props.fetchData({ pageSize, pageNumber })
                .then((resData?: dataResponse) => {

                    if (resData.ignoreRender) {
                        return;
                    }
                    else {
                        if (!totalRef || totalRef?.totalPages !== resData.totalPages || totalRef?.totalRecords !== resData.totalRecords || totalRef.pageNumber !== resData.pageNumber) {
                            setTotalRef({
                                totalPages: resData.totalPages,
                                totalRecords: resData.totalRecords,
                                records: resData.records,
                                pageNumber: resData.pageNumber
                            });
                        }
                    }
                    setLoaded(true);
                }).finally(() => {

                    if (props.closeProcessing) {
                        props.closeProcessing();
                    }
                    if (props.autoRefreshInterval) {
                        const autoRefreshInterval = props?.autoRefreshInterval();
                        if (autoRefreshInterval > 0) {
                            refreshTimeoutFunc = setTimeout(executeFetchData, autoRefreshInterval);
                        }
                    }

                });
        }
        catch (e) {
        }
    }
    function changePage(pIdx?: number) {
        if (pIdx > 0 && pIdx != pageNumber && pIdx <= totalRef?.totalPages) {
            setPageNumber(pIdx);
        }
    }
    function changePageSize(pSize: number) {
        if (pSize > 0 && pSize != pageSize) {
            setPageNumber(1);
            setPageSize(pSize);
            if (props.pageSizeChange) {
                props.pageSizeChange(pSize);
            }
        }
    }

    function chkAllRows(evt?: React.ChangeEvent<HTMLInputElement>) {
        try {
            const { checked } = evt.currentTarget;
            const chkRowClassName = `${thisCss["PagingTable-chkrow"]}`;
            var chkItemObjs = document.getElementsByClassName(chkRowClassName) as HTMLCollectionOf<HTMLInputElement>;
            if (chkItemObjs?.length > 0) {

                Array.from(chkItemObjs).forEach(ite => {
                    const iteName = ite.getAttribute("name");
                    if (iteName === thisId) {
                        ite.checked = checked;
                    }

                });
            }
            if (props.checkAllRowsChange) {
                props.checkAllRowsChange(evt);
            }
            updateCheckValues();

        }
        catch (e) {
        }
    }
    function chkRowChange(evt?: React.ChangeEvent<HTMLInputElement>) {
        try {
            const chkAllId = thisId + '-chkallrows';
            var chkAll = document.getElementById(chkAllId) as HTMLInputElement;

            if (chkAll) {
                let isChkAll = true;
                const chkRowClassName = `${thisCss["PagingTable-chkrow"]}`;
                var chkItemObjs = document.getElementsByClassName(chkRowClassName) as HTMLCollectionOf<HTMLInputElement>;

                if (chkItemObjs?.length > 0) {
                    Array.from(chkItemObjs).forEach(ite => {
                        const iteName = ite.getAttribute("name");
                        if (iteName === thisId) {
                            if (!ite.checked) {
                                isChkAll = false;
                            }
                        }

                    });
                }
                else {
                    isChkAll = false;
                }

                chkAll.checked = isChkAll;
            }
            if (props.checkRowChange) {
                props.checkRowChange(evt);
            }
            updateCheckValues();
        }
        catch (e) {
        }
    }
    function updateCheckValues() {
        try {
            if (props.includeCheckbox && props.rowCheckChange) {
                const chkRowClassName = `${thisCss["PagingTable-chkrow"]}`;
                var chkItemObjs = document.getElementsByClassName(chkRowClassName) as HTMLCollectionOf<HTMLInputElement>;
                let values = Array();
                if (chkItemObjs?.length > 0) {
                    Array.from(chkItemObjs).forEach(ite => {
                        const iteName = ite.getAttribute("name");
                        if (iteName === thisId) {
                            if (ite.checked) {
                                values.push(ite.value);
                            }
                        }

                    });
                }
                props.rowCheckChange(values);
            }
        }
        catch (e) {
        }
    }
    try {
        let className = thisCss["PagingTable"];
        if (props.className) {
            className += ` ${props.className}`;
        }

        let headerObj: JSX.Element = undefined;
        if (props?.headers?.length > 0) {
            const rowKey = `${thisId}-row-${guid8()}`;
            let headerClassName = thisCss["PagingTable-header"];
            headerObj = (<thead
                id={`${thisId}-header`}
                className={headerClassName}
            >
                <tr key={rowKey}>
                    {props.includeCheckbox ? <th className={`${thisCss["PagingTable-th-chk"]}`} align='center'><input className={`${thisCss["PagingTable-chkallrows"]}`} id={`${thisId}-chkallrows`} type="checkbox" onChange={chkAllRows} /></th> : undefined}
                    {Array.from<cellProps>(props.headers).map((header, headerIdx) => <th className={header.className} key={`${rowKey}-${headerIdx}`} colSpan={header.colSpan} rowSpan={header.rowSpan} align={header.align}>{header?.element ?? header?.text ?? header}</th>)}
                </tr>

            </thead>);
        }

        const fromRecordIdx = (pageSize * (pageNumber - 1)) + 1;
        let toRecordIdx = 0;
        if (totalRef?.totalRecords > 0) {
            toRecordIdx = Math.min(pageSize * pageNumber, totalRef?.totalRecords);
        }

        const pagingClassName = thisCss["PagingTable-paging"];
        const pagingId = `${thisId}-paging`;

        const itemsPerPageId = `${pagingId}-itemsperpage`;

        let itemsPerPageValue = props.itemsPerPages;
        if (!itemsPerPageValue) {
            itemsPerPageValue = [50, 100, 200];
        }
        let itemsPerPageObj = (<select id={itemsPerPageId} onChange={evt => changePageSize(parseInt(evt.currentTarget.value))}>
            {Array.from<any>(itemsPerPageValue).map((ite, idx) => <option key={guid8()} value={ite} selected={pageSize == ite} >{ite}</option>)}
        </select>);


        let pageStepsObj = undefined;
        if (props.pageSteps > 0) {
            const step = Math.floor(props.pageSteps / 2);
            let fromIndex = Math.max(1, pageNumber - step);
            let toIndex = Math.min(fromIndex + props.pageSteps - 1, props.pageSteps + pageNumber - 1, totalRef?.totalPages ?? 0);
            while (toIndex - fromIndex < props.pageSteps - 1) {
                if (fromIndex == 1) {
                    break;
                }
                fromIndex--;
            }
            let pageIndexes: any[] = [];
            for (var i = fromIndex; i <= toIndex; i++) {
                pageIndexes.push(i);

            }
            pageStepsObj = pageIndexes.map(p => <button key={guid8()} className={pageNumber === p ? thisCss["PagingTable-paging-active"] : ''} onClick={evt => changePage(p)}>{p}</button>);
        }

        let pagingDiv = undefined;
        let pagingHeight = 1;
        let labelRecord = undefined;
        if (totalRef?.totalRecords > 0) {
            labelRecord = (<label >from <b>{fromRecordIdx}</b> to <b>{toRecordIdx}</b> of <b>{totalRef?.totalRecords}</b> records.</label>);
            if (window.screen.availWidth < 720) {
                // labelRecord = (<><br /><label className={thisCss["PagingTable-paging-record"]}>from <b>{fromRecordIdx}</b> to <b>{toRecordIdx}</b> of <b>{totalRef?.totalRecords}</b> records.</label></>);
            }

        }

        let bodyElement = undefined;
        if (props.onInitMessage) {
            bodyElement = (<tbody id={bodyId} className={bodyClassName}><tr><td align='center' colSpan={props.headers?.length + (props.includeCheckbox ? 1 : 0)}>{props.onInitMessage}</td></tr></tbody>);
        }
        if (!loaded) {
            if (props.onLoadingMessage) {
                bodyElement = (<tbody id={bodyId} className={bodyClassName}><tr><td align='center' colSpan={props.headers?.length + (props.includeCheckbox ? 1 : 0)}>{props.onLoadingMessage}</td></tr></tbody>);
            }
        }
        else {
            bodyElement = (<tbody id={bodyId} className={bodyClassName}><tr><td align='center' colSpan={props.headers?.length + (props.includeCheckbox ? 1 : 0)}>No Record.</td></tr></tbody>);
            if (totalRef?.records?.length > 0) {
                const rowKey = `${thisId}-row-${guid8()}`;
                bodyElement = (<tbody
                    // key={bodyKey}
                    id={bodyId}
                    className={bodyClassName}
                >
                    {Array.from<rowProps>(totalRef.records).map((record, rowIdx) => {
                        if (record.cells?.length > 0) {
                            const cellKey = `${rowKey}-cell`;
                            const rowId = record.id ?? `${rowKey}-${rowIdx}`;
                            let rowObj = (<tr
                                id={rowId}
                                key={`${rowKey}-${rowIdx}`}
                                onClick={evt => {
                                    if (props.checkRowOnClick) {
                                        const chkId = `${rowId}-chk`;
                                        const chkRow = document.getElementById(chkId) as HTMLInputElement;
                                        if (chkRow) {
                                            if (!isInElement(evt, chkRow)) {
                                                chkRow.checked = !chkRow.checked;
                                                chkRowChange();
                                            }
                                        }
                                    }
                                    if (record.onClick) {
                                        record.onClick(evt);
                                    }

                                }}
                                onDoubleClick={record.onDoubleClick}
                                className={record.className}
                            >
                                {props.includeCheckbox ? <td className={`${thisCss["PagingTable-td-chk"]}`} key={cellKey} align='center'><input id={`${rowId}-chk`} name={thisId} className={`${thisCss["PagingTable-chkrow"]}`} defaultValue={rowId} type="checkbox" onChange={props.checkRowOnClick ? undefined : chkRowChange} /></td> : undefined}
                                {Array.from<cellProps>(record.cells).map((cell, colIdx) => <td
                                    className={cell.className}
                                    align={cell.align}
                                    colSpan={cell.colSpan ?? 1}
                                    rowSpan={cell.rowSpan ?? 1}
                                    key={`${cellKey}-${colIdx}`}
                                    onClick={cell.onClick}
                                    onDoubleClick={cell.onDoubleClick}
                                >{cell?.element ?? cell?.text ?? cell}</td>)}
                            </tr>);
                            return rowObj;
                        }
                        return undefined;
                    })}

                </tbody>);
            }
        }


        if ((totalRef == undefined || totalRef?.totalRecords > 0) && !noPaging) {
            pagingHeight = 30;
            if (totalRef?.totalPages > 1) {
                pagingDiv = (<div
                    id={pagingId}
                    className={pagingClassName}
                >
                    <div>&nbsp; &nbsp;Items per page:&nbsp;{itemsPerPageObj}
                        <button onClick={evt => changePage(1)}>First</button>
                        <button onClick={evt => changePage(pageNumber - 1)}>Prev</button>
                        {pageStepsObj}

                        <button onClick={evt => changePage(pageNumber + 1)}>Next</button>
                        <button onClick={evt => changePage(totalRef?.totalPages)}>Last</button>
                    </div>
                    <br></br>
                    <div className={thisCss["PagingTable-paging-record"]}>{labelRecord}</div>


                </div>);
            }
            else {
                pagingDiv = (<div
                    id={pagingId}
                    className={pagingClassName}
                >
                    &nbsp; &nbsp;Items per page:&nbsp;{itemsPerPageObj}
                    {/* {pageStepsObj} */}

                    {labelRecord}

                </div>);
            }
        }

        const heightValue = props.height ?? '100%';
        const maxHeightValue = props.maxHeight;
        let contents = (<div {...props} id={thisId} className={className}
            style={{
                height: heightValue,
                maxHeight: maxHeightValue
            }}>
            <div className='pTable' style={{ height: `calc(100% - ${pagingHeight}px)` }} >
                <table
                    id={`${thisId}-table`}
                    width={'100%'}
                    cellSpacing={props.cellSpacing ?? 0}
                    cellPadding={props.cellPadding ?? 0}
                    border={0}
                // key={tableKey}
                >
                    {headerObj}
                    {bodyElement}
                </table>
            </div>
            {pagingDiv}

        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default PagingTable;