import { PostDataService, GetDataService, DeleteDataService } from "../../utils/helpers";
import { SLS_API_BASE_URL } from "../../utils/shared";

export const UPDATE_USERS_DATASOURCE = "UPDATE_USERS_DATASOURCE";
export const UPDATE_USERS_LOADING = "UPDATE_USERS_LOADING";
export const UPDATE_USER_MODAL_VISIBLE = "UPDATE_USER_MODAL_VISIBLE";
export const UPDATE_USER_EDIT_DETAILS = "UPDATE_USER_EDIT_DETAILS";
export const UPDATE_USER_ADD_ACTION = "UPDATE_USER_ADD_ACTION";
export const UPDATE_ADD_USER_SUCCESS = "UPDATE_ADD_USER_SUCCESS";
export const UPDATE_ADD_USER_ERROR = "UPDATE_ADD_USER_ERROR";
export const UPDATE_ADD_USER_LOADING = "UPDATE_ADD_USER_LOADING";
export const UPDATE_ADD_USER_DRAWER_VISIBLE = "UPDATE_ADD_USER_DRAWER_VISIBLE";
export const UPDATE_USERS_DATA_COUNT = "UPDATE_USERS_DATA_COUNT";
export const REMOVE_USER_FROM_DATASOURCE = "REMOVE_USER_FROM_DATASOURCE";
export const UPDATE_REMOVE_USER_LOADING = "UPDATE_REMOVE_USER_LOADING";
export const UPDATE_SEARCH_USER_LOADING = "UPDATE_SEARCH_USER_LOADING";
export const UPDATE_SEARCH_USER_ERROR = "UPDATE_SEARCH_USER_ERROR";
export const UPDATE_SEARCH_USER_SUCCESS = "UPDATE_SEARCH_USER_SUCCESS";
export const UPDATE_SEARCH_USER_DATASOURCE = "UPDATE_SEARCH_USER_DATASOURCE";
export const APPEND_USER_TO_DATASOURCE = "APPEND_USER_TO_DATASOURCE";

export const fetch_users = (dispatch, values) => {

    return async () => {
        try {
            dispatch(update_users_loading(true));
            const result = await GetDataService(`${SLS_API_BASE_URL}/user`, {...values});

            if (result.statusCode === 200) {
                dispatch(update_user_datasource(result.data.data));
                dispatch(update_user_data_count(result.data.dataCount))
            }
        } catch (error) {
            //TODO: implement system logging
        }

        dispatch(update_users_loading(false));
    }
    
}

export const add_user = (dispatch, values) => {
    return async () => {
        try {
            dispatch(update_add_user_loading(true));
            const result = await PostDataService(`${SLS_API_BASE_URL}/user`, {...values})

            if(result.statusCode === 200){
                dispatch(update_add_user_success(result.data.message));
                dispatch(append_user_to_datasource(result.data.data));
            }else{
                dispatch(update_add_user_error(result.data.message));
            }
        } catch (error) {
            //TODO: implement system error logging
            console.log(error);
        }
        dispatch(update_add_user_loading(false));
    }
}

export const search_user = (dispatch, values) => {
    return async () => {
        dispatch(update_search_user_loading(true));
        try {

            var esc = encodeURIComponent;
            var query = Object.keys(values)
                .map(k => esc(k) + '=' + esc(values[k]))
                .join('&');
            const result = await GetDataService(`${SLS_API_BASE_URL}/user/search?${query}`);
            if (result.statusCode === 200) {
                dispatch(update_search_user_datasource(result.data.data));
            } else {
                dispatch(update_search_user_error(result.data.message));
            }
        } catch (error) {
            //TODO: implement system logging
            console.log(error)
        }
        dispatch(update_search_user_loading(false));
    }
}

export const update_add_user_loading = (value) => {
    return {
        type: UPDATE_ADD_USER_LOADING,
        payload: value
    }
}

export const update_add_user_success = (value) => {
    return {
        type: UPDATE_ADD_USER_SUCCESS,
        payload: value
    }
}

export const update_add_user_error = (value) => {
    return {
        type: UPDATE_ADD_USER_ERROR,
        payload: value
    }
}

export const update_add_user_drawer_visible = (value) => {
    return {
        type: UPDATE_ADD_USER_DRAWER_VISIBLE,
        payload: value
    }
}

export const update_user_datasource = (value) => {
    return {
        type: UPDATE_USERS_DATASOURCE,
        payload: value
    }
}

export const update_user_data_count = (value) => {
    return {
        type: UPDATE_USERS_DATA_COUNT,
        payload: value
    }
}

export const update_users_loading = (value) => {
    return {
        type: UPDATE_USERS_LOADING,
        payload: value
    }
}

export const update_user_modal_visible = (value) => {
    return {
        type: UPDATE_USER_MODAL_VISIBLE,
        payload: value
    }
}

export const update_user_edit_details = (value) => {
    return {
        type: UPDATE_USER_EDIT_DETAILS,
        payload: value
    }
}

export const update_user_add_action = (value) => {
    return {
        type: UPDATE_USER_ADD_ACTION,
        payload: value
    }
}


export const remove_user = (dispatch, data) => {
    return async () => {
        try {
            dispatch(update_remove_user_loading({ [`deleteUser${data.id}`]: true }));
            const result = await DeleteDataService(`${SLS_API_BASE_URL}/user/${data.id}`);

            if (result.statusCode === 200) {
                console.log('rom')
                dispatch(remove_user_from_datasource(data));
            }
        } catch (error) {
            //TODO: use system loging
            console.log(error);
        }

        dispatch(update_remove_user_loading({ [`deleteUser${data.id}`]: false }));


    }
}

export const remove_user_from_datasource = (value) => {
    return {
        type: REMOVE_USER_FROM_DATASOURCE,
        payload: value
    }
}

export const update_remove_user_loading = (value) => {
    return {
        type: UPDATE_REMOVE_USER_LOADING,
        payload: value
    }
}

export const update_search_user_loading = (value) => {
    return {
        type: UPDATE_SEARCH_USER_LOADING,
        payload: value
    }
}

export const update_search_user_datasource = (value) => {
    return {
        type: UPDATE_SEARCH_USER_DATASOURCE,
        payload: value
    }
}

export const update_search_user_success = (value) => {
    return {
        type: UPDATE_SEARCH_USER_SUCCESS,
        payload: value
    }
}

export const update_search_user_error = (value) => {
    return {
        type: UPDATE_SEARCH_USER_ERROR,
        payload: value
    }
}

export const append_user_to_datasource = (value) => {
    return {
        type: APPEND_USER_TO_DATASOURCE,
        payload: value
    }
}
