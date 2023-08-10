import { useEffect, useState } from 'react';
import { guid8 } from '../../extensions/HashFuncs';
import { sleep } from '../../extensions/ThreadExtension';
import { componentProps } from '../componentDefine';
import thisCss from './Image.module.scss';
function Image(props?: componentProps & {
    src?: string,
    delayMiliseconds?: number,
}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["Image"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.delayMiliseconds > 0) {
            const sleepAct = async () => {
                await sleep(props.delayMiliseconds);
                setLoading(false);
            };
            sleepAct();
        }
        else {
            setLoading(false);
        }

    }, []);

    function loadded() {
        setLoaded(true);
    }
    try {
        let contents = loading ? <span id={thisId} className={className}>Loading...</span>
            : (<img draggable={false} id={thisId} className={className} src={props.src} onLoad={evt => loadded()} style={{ display: loaded ? "block" : "none" }} />);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Image;