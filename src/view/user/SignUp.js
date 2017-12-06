/**
 * Created by fengcancan on 2017/12/1.
 */
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';
let propTypes = {
    signUpAjax:PT.func,
    SignUpMsg:PT.object
};


export default class SignUp extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {signUpAjax,SignUpMsg}=this.props;
        return (
            <EntryPanel>
                <SignUpPanel
                    {...{
                        signUpAjax,
                        SignUpMsg
                    }}/>
            </EntryPanel>
        )
    }
}

SignUp.propTypes = propTypes;