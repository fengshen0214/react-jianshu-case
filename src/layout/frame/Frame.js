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
            hasLoginReq: false,
            myPagePreview: [],
            noteBooks: [],
            previewsName:'所有文章'
        };

        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMes = this.clearLoginMes.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changereviewsName= this.changereviewsName.bind(this);
    }

    //登录方法
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

    //注册方法
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

    //退出登录方法
    logOut() {
        $.post(`${cfg.url}/logout`)
            .done(({code})=> {
                if (code === 0) {
                    this.initMyInfo(null)
                }
            })
    }

    getPreview(data) {
        $.post(`${cfg.getPreview}`)
            .done(({code, data})=> {
                if (code === 0) {
                    this.setState({
                        myPagePreview: data
                    })
                }
            })
    }

    //previewName（就是用户页面头像下显示的那个类型）
    initMyPage(user_id,previewData,previewName){
        this.getPreview(previewData);

        $.post(`${cfg.url}/getCollection`,{
            user_id
        })
            .done(({data,code})=>{
                if(code === 0){
                    this.setState({
                        noteBooks:data
                    })
                }
        })
    }

    changereviewsName(previewsName){
        this.setState({
            previewsName
        })
    }

    //清除登录信息方法
    clearLoginMes() {
        this.setState({
            signInMsg: null,
            signUpMsg: null
        })
    }

    //登录后组装信息
    initMyInfo(myInfo) {
        if (myInfo) {
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
        let {signInAjax, signUpAjax, clearLoginMes, initMyInfo, logOut,getPreview} = this;
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
