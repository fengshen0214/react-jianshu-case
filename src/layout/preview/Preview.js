/**
 * Created by fengcancan on 2017/11/29.
 */
import {Link} from 'react-router-dom';
import $ from './style.scss';
let proptypes = {
    article_id: PT.number,
    article_title: PT.string,
    previewContent: PT.string,
    user_id: PT.number,
    user_name: PT.string,
    collection_id: PT.number,
    collection_name: PT.string,
    linked: PT.number,
    createdAt: PT.string,
    avatar: PT.string
}

export default function Preview(props) {
    let {
        article_id,
        article_title,
        previewContent,
        user_id,
        user_name,
        linked,
        createdAt,
        avatar,
        viewer,
        history,
        initMyPage,
        user_intro
    }= props;
    createdAt = new Date(createdAt).toLocaleString();
    return (
        <div className={`${$.note}`}>
            <div className="ui divider hidden"></div>
            <div className={`${$.content}`}>
                <div className={`${$.author}`}>
                    <Link to="/" className="avatar"
                          onClick={
                              ev=> {
                                  ev.preventDefault();
                                  ev.stopPropagation();
                                  history.push('my_page', {
                                      userInfo: {
                                          id: user_id,
                                          username: user_name,
                                          avatar,
                                          user_intro
                                      }
                                  });
                                  initMyPage({user_id}, '所有文章', user_id);
                              }
                          }>
                        <img src={avatar} alt="" className="ui avatar image"/>
                    </Link>
                    <div className={`${$.name}`}>
                        <Link to="/">{user_name}</Link>
                        <span className="time">{createdAt}</span>
                    </div>
                </div>
                <Link to="" className={$.title}>{article_title}></Link>
                <p className={$.abstract}>{previewContent}</p>
                <div className={$.meta}>{props.children}</div>
            </div>
        </div>
    );
}
Preview.propTypes = proptypes;
