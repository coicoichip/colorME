import { combineReducers } from 'redux';

import registerReducer from '../modules/register/registerReducer';

import blogReducer from '../modules/blog/blogReducer';
import baseReducer from '../modules/base/baseReducer';
//import drawerReducer from "../modules/drawer/drawerReducer";
import navigatorReducer from "../navigation/navReducer";
const rootReducer = combineReducers({
    register: registerReducer,
    blog: blogReducer,
    base: baseReducer,
    nav : navigatorReducer
});
export default rootReducer;