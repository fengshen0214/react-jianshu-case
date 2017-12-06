/**
 * Created by cc on 2017/11/17.
 */
import {Link,NavLink} from 'react-router-dom';
import $ from './style.scss';


export default function Nav() {
    return(
        <div className={`ui fixed secondary pointing menu ${$.nav}`}>
            <div className='ui container'>
                {/*exact 路由严格匹配地址，只要 地址相同，就会匹配到*/}
                <Link to='/' className={`header item`}>Noods</Link>
                <NavLink to='/' exact className={`item`} activeClassName='active'>首页</NavLink>
                <div className="menu right">
                    <NavLink to='/sign_in' className={`item`} activeClassName='active'>登录</NavLink>
                    <NavLink to='/sign_up' className={`item`} activeClassName='active'>注册</NavLink>
                    <NavLink to='/write' className={`item`} activeClassName='active'>写文章</NavLink>
                </div>
            </div>
        </div>
    )
}