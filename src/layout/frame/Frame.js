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
            hasLoginReq: false
        };

        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMes = this.clearLoginMes.bind(this);
        this.logOut = this.logOut.bind(this);
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

    logOut(){
        $.post(`${cfg.url}/logout`)
            .done(({code})=>{
                if(code === 0){
                    this.initMyInfo(null)
                }
            })
    }

    clearLoginMes() {
        this.setState({
            signInMsg: null,
            signUpMsg: null
        })
    }

    initMyInfo(myInfo) {
        if(myInfo){
            myInfo.avatar = cfg.url + myInfo.avatar;
            this.setState({myInfo});
        }
    }

    componentDidMount() {
        $.post(`${cfg.url}/autologin`)
            .done(({code, data}) => {
                if (code === 0) {
                    this.initMyInfo(data);
                }
                this.setState({hasLoginReq: true})
            });
    }


    render() {
        let {signInAjax, signUpAjax, clearLoginMes, initMyInfo,logOut} = this;
        let {signInMsg, signUpMsg, myInfo, hasLoginReq} = this.state;
        //解决登录状态刷新页面时，登录注册会闪动；
        //一旦hasLoginReq: false，就暂时让页面空白；
        if (!hasLoginReq) {
            return (<div></div>);
        }
        return (
            <div className={S.layout}>
                <Nav
                    {
                        ...{
                            myInfo,
                            logOut
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
