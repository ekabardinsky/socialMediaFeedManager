import {GET_ACCOUNT_CHANNELS, GET_INTEGRATIONS} from "../actionTypes";

const initialState = {
    newAccount: {
        channels: []
    },
    integrations: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACCOUNT_CHANNELS: {
            return {
                ...state,
                newAccount: {
                    ...state.newAccount,
                    channels: action.payload
                }
            }
        }
        case GET_INTEGRATIONS: {
            return {
                ...state,
                integrations: action.payload
            }
        }
        default:
            return state;
    }
}
