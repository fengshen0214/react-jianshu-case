/**
 * Created by cc on 2017/11/17.
 */
import {Link, NavLink} from 'react-router-dom';
import $ from './style.scss';
let propTypes = {
    myInfo: PT.object,
    logOut:PT.func
};

export default function Nav(props) {
    let {myInfo,logOut} = props;
    let userLink = null;
    if (myInfo) {
        userLink = (
            <NavLink to="my_page" className={`${$.avatar} item`} activeClassName='active'>
                <img src={myInfo.avatar} className="ui image avatar" alt=""/>
                <div className={$.dropDown}>
                    <p onClick={(ev) =>{
                        ev.stopPropagation();
                        ev.preventDefault();
                        logOut();
                    }}>注销</p>
                </div>
            </NavLink>
        );
    } else {
        userLink = [
            (<NavLink to='/sign_in' className={`item`} activeClassName='active' key={1}>登录</NavLink>),
            (<NavLink to='/sign_up' className={`item`} activeClassName='active' key={2}>注册</NavLink>)
        ];
    }
    return (
        <div className={`ui fixed secondary pointing menu ${$.nav}`}>
            <div className='ui container'>
                {/*exact 路由严格匹配地址，只要 地址相同，就会匹配到*/}
                <Link to='/' className={`header item`}>Noods</Link>
                <NavLink to='/' exact className={`item`} activeClassName='active'>首页</NavLink>
                <div className="menu right">
                    {userLink}
                    <NavLink to='/write' className={`item`} activeClassName='active'>写文章</NavLink>
                </div>
            </div>
        </div>
    )
}

Nav.propTypes = propTypes;