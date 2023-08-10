import thisCss from './Fallback.module.scss';
function Fallback(props?: any & {}) {
    try {
        let className = thisCss["Fallback"];
        if (props?.className) {
            className += ` ${props.className}`;
        }
        let contents = (<div className={className}>
            coming soon
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Fallback;