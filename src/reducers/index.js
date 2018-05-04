import { combineReducers } from 'redux';
import loginReducer from '../modules/login/loginReducer';
import registerReducer from '../modules/register/registerReducer';

import blogReducer from '../modules/blog/blogReducer';
import baseReducer from '../modules/base/baseReducer';
//import drawerReducer from "../modules/drawer/drawerReducer";
import navigatorReducer from "../navigation/navReducer";
const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    blog: blogReducer,
    base: baseReducer,
    nav : navigatorReducer
});
export default rootReducer;