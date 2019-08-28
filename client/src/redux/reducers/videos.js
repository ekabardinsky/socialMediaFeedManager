import {GET_VIDEOS} from "../actionTypes";

const initialState = {
    videos: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOS: {
            return {
                ...state,
                videos: action.payload
            }
        }
        default:
            return state;
    }
}
