import {CHANGE_PAGE, GET_ACCOUNTS} from "./actionTypes";

export const changePage = pageName => ({
    type: CHANGE_PAGE,
    payload: {
        pageName
    }
});

export const getAccounts = (accounts) => ({
    type: GET_ACCOUNTS,
    payload: accounts
});