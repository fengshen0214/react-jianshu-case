/**
 * Created by fengcancan on 2017/11/29.
 */

import {Link} from 'react-router-dom';
export default function Author({user}) {
    let {user_name,avatar} = user;
    avatar = 'http://api.noods.me'+avatar;
    return (
        <div className="item">
            <Link to="/" class="ui mini avatar image">
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>
    );
}