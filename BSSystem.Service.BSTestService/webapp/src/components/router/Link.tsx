import { guid8 } from "../../extensions/HashFuncs";
import { componentProps } from "../componentDefine";
import { navigate } from "./methods";

function Link(props?: componentProps & {
    path?: string,
    onMouseEnter?: any
}) {
    const thisId = props.id ?? guid8();
    let path = props.path;
    function onClick() {
        navigate(path);
    }
    try {
        let contents = (<a
            id={thisId}
            onClick={onClick}
            {...props}
        >
            {props.children}
        </a>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Link;