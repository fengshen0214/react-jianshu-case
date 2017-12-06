/**
 * Created by fengcancan on 2017/11/29.
 */
import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';

import cfg from 'config/config.json';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previews: [],
            authors: []
        }
    }

    componentDidMount() {
        //内容列表
        $.post(`${cfg.url}/getPreview`).done(ret=> {
            if (ret.code === 0) {
                this.setState({
                    previews: ret.data
                })
            }
        });
        //作者列表
        $.post(`http://api.noods.me/getAuthor`).done(ref =>{
            if(ref.code === 0){
                this.setState({
                    authors:ref.data
                })
            }
        })
    }

    render() {
        let {previews, authors} = this.state;
        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList
                        {...{
                            previews: previews
                        }}/>
                </div>
                <div className="column four wide">
                    <Recommend
                        {...{
                            authors:authors
                        }}/>
                </div>
            </div>
        )
    }
}