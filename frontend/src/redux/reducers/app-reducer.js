import {
    APP_LOGGING_IN,
    UPDATE_APP_LOGIN,
    APP_LOGGING_OUT
} from "../actions/app-actions";

const appReducer = (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case APP_LOGGING_IN:
            return Object.assign({}, state, {
                loggingIn: payload
            });
        case APP_LOGGING_OUT:
            return Object.assign({}, state, {
                loggingOut: payload
            });
        case UPDATE_APP_LOGIN:
            return Object.assign({}, state, {
                login: payload
            });

        default:
            return state;
    }
}


export default appReducer;