import {
    UPDATE_USERS_LOADING,
    UPDATE_USERS_DATASOURCE,
    UPDATE_USER_MODAL_VISIBLE,
    UPDATE_USER_ADD_ACTION,
    UPDATE_USER_EDIT_DETAILS,
    UPDATE_ADD_USER_DRAWER_VISIBLE,
    UPDATE_ADD_USER_ERROR,
    UPDATE_ADD_USER_SUCCESS,
    UPDATE_ADD_USER_LOADING,
    UPDATE_USERS_DATA_COUNT,
    REMOVE_USER_FROM_DATASOURCE,
    UPDATE_SEARCH_USER_ERROR,
    UPDATE_SEARCH_USER_LOADING,
    UPDATE_SEARCH_USER_DATASOURCE,
    UPDATE_SEARCH_USER_SUCCESS,
    APPEND_USER_TO_DATASOURCE
} from "../actions/user-actions";

const userReducer = (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case UPDATE_USERS_DATASOURCE:
            return Object.assign({}, state, {
                datasource: payload
            });

        case UPDATE_USERS_LOADING:
            return Object.assign({}, state, {
                loading: payload
            });

        case UPDATE_USER_MODAL_VISIBLE:
            return Object.assign({}, state, {
                userModalVisible: payload
            });

        case UPDATE_USER_EDIT_DETAILS:
            return Object.assign({}, state, payload);

        case UPDATE_USERS_DATA_COUNT:
            return Object.assign({}, state, {
                dataCount: payload
            });
            
        case UPDATE_USER_ADD_ACTION:
            return Object.assign({}, state, {
                userUpdateAction: payload
            });

        case UPDATE_ADD_USER_DRAWER_VISIBLE:
            return Object.assign({}, state, {
                createUser: {
                    drawerVisible: payload,
                    loading: state.createUser.loading,
                    success: state.createUser.success,
                    error: state.createUser.error
                }
            });

        case UPDATE_ADD_USER_ERROR:
            return Object.assign({}, state, {
                createUser: {
                    drawerVisible: state.createUser.drawerVisible,
                    loading: state.createUser.loading,
                    success: state.createUser.success,
                    error: payload
                }
            });

        case UPDATE_ADD_USER_SUCCESS:
            return Object.assign({}, state, {
                createUser: {
                    drawerVisible: state.createUser.drawerVisible,
                    loading: state.createUser.loading,
                    success: payload,
                    error: state.createUser.error
                }
            });

        case UPDATE_ADD_USER_LOADING:
            return Object.assign({}, state, {
                createUser: {
                    drawerVisible: state.createUser.drawerVisible,
                    loading: payload,
                    success: state.createUser.loading,
                    error: state.createUser.error
                }
            });

        case REMOVE_USER_FROM_DATASOURCE:
            return Object.assign({}, state, {
                datasource: state.datasource.filter(item => {
                    if (item.id !== payload.id)
                        return true;
                })
            });

        case UPDATE_SEARCH_USER_SUCCESS:
            return Object.assign({}, state, {
                searchUser: {
                    datasource: state.searchUser.datasource,
                    success: payload,
                    error: state.searchUser.error,
                    loading: state.searchUser.loading
                }
            });

        case UPDATE_SEARCH_USER_DATASOURCE:
            return Object.assign({}, state, {
                searchUser: {
                    datasource: payload,
                    success: state.searchUser.success,
                    error: state.searchUser.error,
                    loading: state.searchUser.loading
                }
            });

        case UPDATE_SEARCH_USER_ERROR:
            return Object.assign({}, state, {
                searchUser: {
                    datasource: state.searchUser.datasource,
                    success: state.searchUser.success,
                    error: payload,
                    loading: state.searchUser.loading
                }
            });
        case UPDATE_SEARCH_USER_LOADING:
            return Object.assign({}, state, {
                searchUser: {
                    datasource: state.searchUser.datasource,
                    success: state.searchUser.success,
                    loading: payload,
                    error: state.searchUser.error
                }
            });

        case APPEND_USER_TO_DATASOURCE:
            return Object.assign({}, state, {
                datasource: [...state.datasource, payload]
            });



        default:
            return state
    }
}

export default userReducer;