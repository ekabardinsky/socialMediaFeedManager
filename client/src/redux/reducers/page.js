import {CHANGE_PAGE} from "../actionTypes";

const currentPath = window.location.pathname.replace("/", "");

const initialState = {
    pageName: currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : "Accounts"
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE: {
            const {pageName} = action.payload;
            return {
                ...state,
                pageName
            };
        }
        default:
            return state;
    }
}
