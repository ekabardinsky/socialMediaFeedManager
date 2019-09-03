import {GET_PUBLISHING_QUEUE_ITEMS} from "../actionTypes";

const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PUBLISHING_QUEUE_ITEMS: {
            return {
                ...state,
                items: action.payload
            }
        }
        default:
            return state;
    }
}
