import { useEffect } from 'react';
import { componentWithApiProps } from '../components/componentDefine';
import PagingTableV2 from '../components/forms/table/PagingTableV2';
import { guid8 } from '../extensions/HashFuncs';
import thisCss from './TestResult.module.scss';
import { dataResponse, rowProps } from '../components/forms/table/PagingTable';
import { getAsync } from '../extensions/HttpExtension';
import Image from '../components/forms/Image';
function TestResult(props?: componentWithApiProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["TestResult"];
    if (props?.className) {
        className += ` ${props.className}`;
    }
    let apiUrl = props.apiUrl ?? window.location.href;
    const qMarkIdx = apiUrl.indexOf('?', 0);
    if (qMarkIdx > 0) {
        apiUrl = apiUrl.substring(0, qMarkIdx);
    }
    const params = new URLSearchParams(window.location.search);
    const sessionGuid = params.get("sessionguid");

    useEffect(() => {

    }, []);

    async function loadResult(): Promise<dataResponse> {
        let result: dataResponse = {
            totalRecords: 0
        };
        //638241727412000317_99df6e95-3d20-4824-964b-d94c8831d9bf
        const url = `${apiUrl.replace('/result', '')}/api/test/result?sessionguid=${sessionGuid}`;
        result = await getAsync(url, undefined, async response => {
            if (response.status === 200) {
                const imageObjs = await response.json();
                if (imageObjs?.length > 0) {
                    const result: dataResponse = {
                        records: imageObjs.map((imageObj: any, idx: number) => {
                            const rowObj: rowProps = {
                                cells: [
                                    {
                                        element: <div className={thisCss["TestResult-name"]}>{idx + 1}. {imageObj.name}</div>,

                                    },
                                    {
                                        element: <Image src={imageObj.url} className={thisCss["TestResult-image"]} />,
                                        align: "center"
                                    }
                                ]
                            };
                            return rowObj;
                        })
                    };
                    return result;
                }


            }
        });

        return result;
    }

    try {
        let contents = (<div id={thisId} className={className}>
            <PagingTableV2
                className={`${thisId}-list`}
                noPaging
                headers={["Step", "Result"]}
                fetchData={loadResult}
            />
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default TestResult;