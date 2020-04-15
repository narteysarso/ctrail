import { PostDataService } from "../../utils/helpers";
import { SLS_API_BASE_URL} from "../../utils/shared"
import PersistentStorage from "../../utils/session-manager";
export const UPDATE_PROFILE_DATASOURCE = "UPDATE_PROFILE_DATASOURCE";
export const UPDATE_PROFILE_LOADING = "UPDATE_PROFILE_LOADING";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_CHANGE_PASSWORD_LOADING = "UPDATE_CHANGE_PASSWORD_LOADING";
export const UPDATE_CHANGE_PASSWORD_ERROR = "UPDATE_CHANGE_PASSWORD_ERROR";
export const UPDATE_CHANGE_PASSWORD_SUCCESS = "UPDATE_CHANGE_PASSWORD_SUCCESS";
export const UPDATE_CHANGE_PASSWORD_MODAL_VISIBLE = "UPDATE_CHANGE_PASSWORD_MODAL_VISIBLE";
export const UPDATE_CHANGE_EDIT_PROFILE_DRAWER_VISIBLE = "UPDATE_CHANGE_EDIT_PROFILE_DRAWER_VISIBLE";

export const update_password = (dispatch, data) => {
    return async function(){
        dispatch(update_change_password_loading(true));

        try {
            const result = await PostDataService(`${SLS_API_BASE_URL}/user/password` , { ...data });

            if (result.statusCode === 200) {
                dispatch(update_change_password_success(result.data.message))
            } else {
                dispatch(update_change_password_error(result.data.message))
            }

        } catch (err) {
            console.log(err)
        }

        dispatch(update_change_password_loading(false));

    }
}

export const update_user = (dispatch, data) => {
    return async function(){
        dispatch(update_profile_loading(true));

        try {
            const result = await PostDataService(`${SLS_API_BASE_URL}/user/update` , { ...data });

            if (result.statusCode === 200) {
                dispatch(update_profile_datasource(result.data.data))
                PersistentStorage.store("app",{...PersistentStorage.fetch("app"),...result.data.data});
            } else {
                dispatch(update_profile_error(result.data.message))
            }

        } catch (err) {
            console.log(err)
        }

        dispatch(update_profile_loading(false));

    }
}


export const update_profile_datasource = (value) => {
    return{
        type: UPDATE_PROFILE_DATASOURCE,
        payload: value
    }
}

export const update_profile_loading = (value) => {
    return{
        type: UPDATE_PROFILE_LOADING,
        payload: value
    }
}

export const update_change_password_loading = (value) => {
    return {
        type: UPDATE_CHANGE_PASSWORD_LOADING,
        payload: value
    }
}

export const update_change_password_modal_visible = (value) => {
    return {
        type: UPDATE_CHANGE_PASSWORD_MODAL_VISIBLE,
        payload: value
    }
}
export const update_profile_error = (value) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        payload: value
    }
}
export const update_profile_success = (value) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: value
    }
}
export const update_change_password_error = (value) => {
    return {
        type: UPDATE_CHANGE_PASSWORD_ERROR,
        payload: value
    }
}
export const update_change_password_success = (value) => {
    return {
        type: UPDATE_CHANGE_PASSWORD_SUCCESS,
        payload: value
    }
}

export const update_change_edit_profile_drawer_visible = (value) => {
    return {
        type: UPDATE_CHANGE_EDIT_PROFILE_DRAWER_VISIBLE,
        payload: value
    }
}