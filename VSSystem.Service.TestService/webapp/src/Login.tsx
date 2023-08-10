import { useEffect } from 'react';
import thisCss from './Login.module.scss';
import { componentProps, componentWithApiProps } from './components/componentDefine';
import { guid8 } from './extensions/HashFuncs';
import Authenticate, { SubmitProps } from './components/forms/Authenticate';
import { postAsync } from './extensions/HttpExtension';
import { navigate } from './components/router/methods';
function Login(props?: componentWithApiProps & {}) {
    const thisId = props.id ?? guid8();
    let className = thisCss["Login"];
    if (props?.className) {
        className += ` ${props.className}`;
    }

    useEffect(() => {
        localStorage.removeItem('autotest-account-name');
        localStorage.removeItem('autotest-account-email');
        localStorage.removeItem('autotest-account-skypeid');
    }, []);

    const apiUrl = props.apiUrl ?? window.location.href;

    async function submitAsync(info?: SubmitProps) {
        const url = `${apiUrl}/api/account/gettoken`;
        return postAsync(url, info, undefined, async response => {
            if (response.status === 200) {
                const jsonAccountObj = await response.json();
                localStorage.setItem('autotest-account-name', jsonAccountObj.Name);
                localStorage.setItem('autotest-account-email', jsonAccountObj.Email);
                localStorage.setItem('autotest-account-skypeid', jsonAccountObj.SkypeId);
            }
            return response.status;
        });
    }

    try {
        let contents = (<div id={thisId} className={className}>
            <Authenticate className={thisCss["Login-form"]} submitHandler={submitAsync} successHandler={() => Promise.resolve(navigate('/autotest/list'))} logoPath='./eiq-logo-blue.webp' title='BIQ AUTOMATION TEST' />
        </div>);
        return contents;
    }
    catch (e) {
        console.log(e);
    }
}
export default Login;