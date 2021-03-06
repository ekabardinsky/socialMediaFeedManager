import {GET_ACCOUNT_PUBLISHING_TYPES, GET_VIDEOS} from "../actionTypes";

const initialState = {
    videos: [],
    publishTypes: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOS: {
            return {
                ...state,
                videos: action.payload ? action.payload.sort((one, two) => two.feed.taken_at - one.feed.taken_at) : action.payload
            }
        }
        case GET_ACCOUNT_PUBLISHING_TYPES: {
            return {
                ...state,
                publishTypes: action.payload
            }
        }
        default:
            return state;
    }
}
