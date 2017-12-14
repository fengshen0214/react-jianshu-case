/**
 * Created by fengcancan on 2017/12/14.
 */
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName: PT.string
};

export default class MyPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                </div>
                <div className="four wide column">
                    <Aside/>
                </div>
            </div>
        )
    }
}

MyPage.propTypes = propTypes;