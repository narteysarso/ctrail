import thunk from 'redux-thunk';
import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";

import AppReducer from './reducers/app-reducer';
import UserReducer from "./reducers/user-reducer";
import ProfileReducer from "./reducers/profile-reducer";
import TrackingPointReducer from './reducers/tracking-point-reducer';

const combinedReducers = combineReducers({
    app: AppReducer,
    users: UserReducer,
    profile: ProfileReducer,
    trackingPoint: TrackingPointReducer
});

const InitialStates = {
    app: {
        login: true,
        loggingIn: false,
    },
    profile: {
        datasource : null,
        changePassword:{
            loading: false,
            modalVisible: false,
            error: null,
            success: null,
        },
        editProfile:{
            loading: false,
            drawerVisible: false,
            
        },
        loading: false
    },
    // role: {
    //     loading: false,
    //     datasource: null
    // },
    users:{
        dataCount: 0,
        loading: false,
        datasource: [],
        createUser: {
            loading: false,
            drawerVisible: false,
            success: null,
            error: null
        },
        searchUser: {
            datasource: null,
            loading: false,
            success: null,
            error: null
        }
    },
    trackingPoint:{
        createTrackingPoint: {
            loading: false,
            drawerVisible: false,
            success: null,
            error: null
        },
        editTrackingPoint: {
            datasource: {},
            loading: false,
            drawerVisible: false,
            success: null,
            error: null
        },
        searchTrackingPoint: {
            datasource: null,
            loading: false,
            success: null,
            error: null
        },
        datasource: [],
        loading: false,
        dataCount: 0
    },
    // traces:{
    //     loading: false,
    //     datasource: null
    // }
}

const middleware = [thunk];

const store = createStore(
    combinedReducers,
    InitialStates,
    applyMiddleware(...middleware)

);

export default store;