import {Route, Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';
import cfg from 'config/config.json';
import S from './style.scss';

export default class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null,
        };

        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMes = this.clearLoginMes.bind(this);
    }

    signInAjax(reqData) {
        $.post(`${cfg.url}/login`, reqData)
            .done(ret=> {
                let {code, data} = ret;
                if (code === 0) {
                    this.initMyInfo(ret.data);
                } else {
                    this.setState({signInMsg: ret});
                }
            });
    }

    signUpAjax(reqData) {
        $.post(`${cfg.url}/register`, reqData)
            .done(ret=> {
                let {code, data} =ret;
                this.setState({signUpMsg: ret});
                if (code === 0) {
                    setTimeout(()=> {
                        this.initMyInfo(ret.data);
                    })
                }
            });
    }

    clearLoginMes() {
        this.setState({
            signInMsg: null,
            signUpMsg: null
        })
    }

    initMyInfo(myInfo) {
        myInfo.avatar = cfg.url + myInfo.avatar;
        this.setState({myInfo});
    }


    render() {
        let {signInAjax, signUpAjax, clearLoginMes, initMyInfo} = this;
        let {signInMsg, signUpMsg, myInfo} = this.state;
        return (
            <div className={S.layout}>
                <Nav
                    {
                        ...{
                            myInfo
                        }
                    }/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignIn
                                {...{
                                    signInAjax,
                                    signInMsg,
                                    clearLoginMes
                                }}
                            />
                        )
                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignUp
                                {...{
                                    signUpAjax,
                                    signUpMsg,
                                    clearLoginMes
                                }}
                            />
                        )
                    )
                }/>
            </div>
        );
    }
}
