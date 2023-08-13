import thisCss from './App.module.scss';
import { componentWithApiProps } from './components/componentDefine';
import { guid8 } from './extensions/HashFuncs';
import { navigate } from './components/router/methods';
import { useEffect, useState } from 'react';
import Layout from './components/forms/Layout';
import { Route } from './components/router/Route';
import TestResult from './ui/TestResult';
import ListTest from './ui/ListTest';
import ToolStripMenu from './components/forms/toolstrip/ToolStripMenu';
import ToolStripItem from './components/forms/toolstrip/ToolStripItem';

function App(props: componentWithApiProps) {
    const thisId = props.id ?? guid8();

    let className = thisCss["App"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const [maxContentHeight, setMaxContentHeight] = useState(undefined);

    useEffect(() => {
        setMaxContentHeight(window.innerHeight - 35);

    }, []);

    try {


        let contents: JSX.Element = undefined;
        contents = (<div id={thisId} className={className}>
            <Layout maxHeight={maxContentHeight} id={`${thisId}-layout`} key={undefined}
                className={thisCss["App-layout"]}>
                <Route path='/autotest/main/result' element={<TestResult apiUrl={props.apiUrl} />} />
                <Route path='/autotest/main/list' element={<ListTest apiUrl={props.apiUrl} />} />
            </Layout>
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default App;