import {combineReducers} from "redux";
import page from "./page"
import accounts from "./accounts"
import integrations from "./integrations"

export default combineReducers({page, accounts, integrations});
