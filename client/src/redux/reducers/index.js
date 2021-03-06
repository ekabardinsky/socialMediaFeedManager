import {combineReducers} from "redux";
import page from "./page"
import accounts from "./accounts"
import integrations from "./integrations"
import videos from "./videos"
import settings from "./settings"
import publishQueue from "./publishQueue"

export default combineReducers({page, accounts, integrations, videos, settings, publishQueue});
