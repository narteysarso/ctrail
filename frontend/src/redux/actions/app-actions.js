import { PostDataService } from "../../utils/helpers";
import { update_profile_datasource } from "./profile-actions";
import PersistentStorage from "../../utils/session-manager";
import { SLS_API_BASE_URL } from "../../utils/shared";


export const APP_LOGGING_IN = "APP_LOGGING_IN";
export const APP_LOGGING_OUT = "APP_LOGGING_OUT";
export const UPDATE_APP_LOGIN = "UPDATE_APP_LOGIN";

export const update_logging_in = (value) => {
    
    return {
        type: APP_LOGGING_IN,
        payload: value
    }
}
export const update_logging_out = (value) => {
    
    return {
        type: APP_LOGGING_OUT,
        payload: value
    }
}
export const update_app_login = (value) => {
    return {
        type: UPDATE_APP_LOGIN,
        payload: value
    }
}

export const login = (dispatch, data) => {
    
    return async () => {
        
        try {
            dispatch(update_logging_in(true));
            const result = await PostDataService(`${SLS_API_BASE_URL}/login`, { username: data.username, password: data.password });
            const loggedIn = result.statusCode === 200;
           if(loggedIn){
               
               PersistentStorage.store("app",result.data);
               dispatch(update_app_login(true))
            }else{
               dispatch(update_app_login(false));
               
            }
            dispatch(update_logging_in(false));
            return loggedIn;
            
        } catch (err) {
            dispatch(update_logging_in(false));
            console.log(err)
        }
        
        
        return false;
    }
}

export const logout = (dispatch) => {
    return async () => {

        dispatch(update_logging_out(true));
        
        try {
            const result = await PostDataService(`${SLS_API_BASE_URL}/logout`);
            
            if (result.statusCode === 200 || result.statusCode === 401) {
                
                PersistentStorage.delete("app");
                dispatch(update_app_login(false));
            }else if(result.statusCode === 500){
                console.log(result)
                if(result.data.message == 'jwt expired'){
                    PersistentStorage.delete("app");
                    dispatch(update_app_login(false));
                }
            }
            
        } catch (err) {
            console.log(err)
        }
        
        dispatch(update_logging_out(false));
    }
}