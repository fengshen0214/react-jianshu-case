/**
 * Created by fengcancan on 2017/12/1.
 */
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';
let propTypes = {
    signUpAjax: PT.func,
    SignUpMsg: PT.object,
    clearLoginMes:PT.func
};


export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        this.props.clearLoginMes();
    }

    render() {
        let {signUpAjax, signUpMsg}=this.props;
        return (
            <EntryPanel>
                <SignUpPanel
                    {...{
                        signUpAjax,
                        signUpMsg
                    }}/>
            </EntryPanel>
        )
    }
}

SignUp.propTypes = propTypes;