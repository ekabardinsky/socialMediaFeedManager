import {GET_SETTINGS} from "../actionTypes";

const initialState = {
    settings: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SETTINGS: {
            return {
                ...state,
                settings: action.payload
            }
        }
        default:
            return state;
    }
}
