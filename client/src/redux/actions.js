import {
    CHANGE_PAGE,
    GET_ACCOUNT_CHANNELS, GET_ACCOUNT_PUBLISHING_TYPES,
    GET_ACCOUNTS,
    GET_INTEGRATIONS,
    GET_SETTINGS,
    GET_VIDEOS
} from "./actionTypes";

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

export const getVideos = (videos) => ({
    type: GET_VIDEOS,
    payload: videos
});

export const getSettings = (settings) => ({
    type: GET_SETTINGS,
    payload: settings
});

export const getAccountPublishingTypes = (types) => ({
    type: GET_ACCOUNT_PUBLISHING_TYPES,
    payload: types
});