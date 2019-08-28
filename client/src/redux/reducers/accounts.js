import {GET_ACCOUNTS} from "../actionTypes";

const initialState = {
    accounts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACCOUNTS: {
            return {
                ...state,
                accounts: action.payload
            }
        }
        default:
            return state;
    }
}
