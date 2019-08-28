import {CHANGE_PAGE, GET_ACCOUNT_CHANNELS, GET_ACCOUNTS, GET_INTEGRATIONS} from "./actionTypes";

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

export const getAccountChannels = (channels) => ({
    type: GET_ACCOUNT_CHANNELS,
    payload: channels
});

export const getIntegrations = (integrations) => ({
    type: GET_INTEGRATIONS,
    payload: integrations
});