/**
 * Created by fen212gcancan on 2017/11/29.
 */
import {Link} from 'react-router-dom';
import Preview from './Preview';
import S from './style.scss';

export default function PreviewList(props) {
    let {previews} = props;
    previews = previews.map((elt, i)=> {
        let {
            id:article_id,
            article_title,
            createdAt,
            preview:previewContent,
            collection_name,
            collection_id,
            user_id,
            user
        }= elt;
        let {avatar, user_name, user_intro}= user;
        avatar = 'http://api.noods.me'+avatar;
        return (
            <Preview {...{
                article_id,
                article_title,
                previewContent,
                user_id,
                user_name,
                createdAt,
                avatar,
                user_intro
            }}
                     key={i}>
                <Link to="" className={S.tag}> {collection_name}</Link>
            </Preview>
        );
    });
    return (
        <div>
            {previews}
        </div>
    );
};