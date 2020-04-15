import { PostDataService, GetDataService, PutDataService, DeleteDataService } from "../../utils/helpers";
import { SLS_API_BASE_URL } from "../../utils/shared";

export const UPDATE_ADD_TRACKING_POINT_DRAWER_VISIBLE = "UPDATE_ADD_TRACKING_POINT_DRAWER_VISIBLE";
export const UPDATE_ADD_TRACKING_POINT_LOADING = "UPDATE_ADD_TRACKING_POINT_LOADING";
export const UPDATE_ADD_TRACKING_POINT_SUCCESS = "UPDATE_ADD_TRACKING_POINT_SUCCESS";
export const UPDATE_ADD_TRACKING_POINT_ERROR = "UPDATE_ADD_TRACKING_POINT_ERROR";
export const UPDATE_TRACKING_POINT_LOADING = "UPDATE_TRACKING_POINT_LOADING";
export const UPDATE_TRACKING_POINT_DATASOURCE = "UPDATE_TRACKING_POINT_DATASOURCE";
export const UPDATE_EDIT_TRACKING_POINT_LOADING = "UPDATE_EDIT_TRACKING_POINT_LOADING";
export const UPDATE_EDIT_TRACKING_POINT_DRAWER_VISIBLE = "UPDATE_EDIT_TRACKING_POINT_DRAWER_VISIBLE";
export const UPDATE_EDIT_TRACKING_POINT_ERROR = "UPDATE_EDIT_TRACKING_POINT_ERROR";
export const UPDATE_EDIT_TRACKING_POINT_SUCCESS = "UPDATE_EDIT_TRACKING_POINT_SUCCESS";
export const UPDATE_EDIT_TRACKING_POINT_DATASOURCE = "UPDATE_EDIT_TRACKING_POINT_DATASOURCE";
export const UPDATE_TRACKING_POINT_DATA_COUNT = "UPDATE_TRACKING_POINT_DATA_COUNT";
export const REMOVE_TRACKING_POINT_FROM_DATASOURCE = "REMOVE_TRACKING_POINT_FROM_DATASOURCE";
export const UPDATE_REMOVE_TRACKING_POINT_LOADING = "UPDATE_REMOVE_TRACKING_POINT_LOADING";
export const UPDATE_TRACKING_POINT_DATASOURCE_ON_EDIT = "UPDATE_TRACKING_POINT_DATASOURCE_ON_EDIT";
export const UPDATE_SEARCH_TRACKING_POINT_LOADING = "UPDATE_SEARCH_TRACKING_POINT_LOADING";
export const UPDATE_SEARCH_TRACKING_POINT_ERROR = "UPDATE_SEARCH_TRACKING_POINT_ERROR";
export const UPDATE_SEARCH_TRACKING_POINT_SUCCESS = "UPDATE_SEARCH_TRACKING_POINT_SUCCESS";
export const UPDATE_SEARCH_TRACKING_POINT_DATASOURCE = "UPDATE_SEARCH_TRACKING_POINT_DATASOURCE";


export const add_tracking_point = (dispatch, values) => {
    return async () =>{
        try{
            dispatch(update_add_tracking_point_loading(true));
            const result = await PostDataService(`${SLS_API_BASE_URL}/point`,{...values});
            if(result.statusCode === 200){
                dispatch(update_tracking_point_datasource(result.data.data));
                dispatch(update_add_tracking_point_success(result.data.message));
            }else{
                dispatch(update_add_tracking_point_error(result.data.message));
            }

        }catch(error){
            //TODO: use system loging
            console.log(error);
        }
        
        dispatch(update_add_tracking_point_loading(false));


    }
}

export const edit_tracking_point = (dispatch, values) => {
    return async () =>{
        try{
            dispatch(update_edit_tracking_point_loading(true));
            const result = await PutDataService(`${SLS_API_BASE_URL}/point`,{...values});
            if(result.statusCode === 200){
                dispatch(update_tracking_point_datasource_on_edit(result.data.data));
                dispatch(update_edit_tracking_point_success(result.data.message));
            }else{
                dispatch(update_edit_tracking_point_error(result.data.message));
            }

        }catch(error){
            //TODO: use system loging
            console.log(error);
        }
        
        dispatch(update_edit_tracking_point_loading(false));


    }
}

export const search_tracking_point = (dispatch,values) => {
    return async () => {
        dispatch(update_search_tracking_point_loading(true));
        try {

            var esc = encodeURIComponent;
            var query = Object.keys(values)
                .map(k => esc(k) + '=' + esc(values[k]))
                .join('&');
            const result = await GetDataService(`${SLS_API_BASE_URL}/point/search?${query}`);
            if(result.statusCode === 200){
                dispatch(update_search_tracking_point_datasource(result.data.data));
            }else{
                dispatch(update_search_tracking_point_error(result.data.message));
            }
        } catch (error) {
            //TODO: implement system logging
            console.log(error)
        }
        dispatch(update_search_tracking_point_loading(false));
    }
}

export const fetch_tracking_points = (dispatch, values) => {
    return async () =>{
        try{
            dispatch(update_tracking_point_loading(true));
            const result = await GetDataService(`${SLS_API_BASE_URL}/point`,values);
            
            if(result.statusCode === 200){
                dispatch(update_tracking_point_datasource(result.data.data));
                dispatch(update_tracking_point_data_count(result.data.dataCount))
            }

        }catch(error){
            //TODO: use system loging
            console.log(error);
        }
        
        dispatch(update_tracking_point_loading(false));
    }
}

export const remove_tracking_points = (dispatch, data) => {
    return async () =>{
        try{
            dispatch(update_remove_tracking_point_loading({[`deletePoint${data.id}`]: true}));
            const result = await DeleteDataService(`${SLS_API_BASE_URL}/point/${data.id}`);
            
            if(result.statusCode === 200){
                console.log('rom')
                dispatch(remove_tracking_point_from_datasource(data));
            }
        }catch(error){
            //TODO: use system loging
            console.log(error);
        }
        
        dispatch(update_remove_tracking_point_loading({ [`deletePoint${data.id}`]: false }));


    }
}

export const update_add_tracking_point_drawer_visible = (value)=>{
    return {
        type: UPDATE_ADD_TRACKING_POINT_DRAWER_VISIBLE,
        payload: value
    }
}

export const update_edit_tracking_point_drawer_visible = (value)=>{
    return {
        type: UPDATE_EDIT_TRACKING_POINT_DRAWER_VISIBLE,
        payload: value
    }
}

export const update_tracking_point_data_count = (value) => {
    return {
        type: UPDATE_TRACKING_POINT_DATA_COUNT,
        payload: value,
    }
}

export const remove_tracking_point_from_datasource = (value) =>{
    return {
        type: REMOVE_TRACKING_POINT_FROM_DATASOURCE,
        payload: value
    }
}

export const update_remove_tracking_point_loading = (value) =>{
    return {
        type: UPDATE_REMOVE_TRACKING_POINT_LOADING,
        payload: value
    }
}

export const update_add_tracking_point_loading = (value)=>{
    return {
        type: UPDATE_ADD_TRACKING_POINT_LOADING,
        payload: value
    }
}

export const update_search_tracking_point_loading = (value)=>{
    return {
        type: UPDATE_SEARCH_TRACKING_POINT_LOADING,
        payload: value
    }
}

export const update_search_tracking_point_datasource = (value)=>{
    return {
        type: UPDATE_SEARCH_TRACKING_POINT_DATASOURCE,
        payload: value
    }
}

export const update_search_tracking_point_success = (value)=>{
    return {
        type: UPDATE_SEARCH_TRACKING_POINT_SUCCESS,
        payload: value
    }
}

export const update_search_tracking_point_error = (value)=>{
    return {
        type: UPDATE_SEARCH_TRACKING_POINT_ERROR,
        payload: value
    }
}


export const update_edit_tracking_point_loading = (value)=>{
    return {
        type: UPDATE_EDIT_TRACKING_POINT_LOADING,
        payload: value
    }
}

export const update_edit_tracking_point_datasource = (value)=>{
    return {
        type: UPDATE_EDIT_TRACKING_POINT_DATASOURCE,
        payload: value
    }
}

export const update_tracking_point_loading = (value)=>{
    return {
        type: UPDATE_TRACKING_POINT_LOADING,
        payload: value
    }
}

export const update_tracking_point_datasource = (value) => {
    return {
        type: UPDATE_TRACKING_POINT_DATASOURCE,
        payload: value
    }
}
export const update_tracking_point_datasource_on_edit = (value) => {
    return {
        type: UPDATE_TRACKING_POINT_DATASOURCE_ON_EDIT,
        payload: value
    }
}

export const update_add_tracking_point_error = (value) => {
    return {
        type: UPDATE_ADD_TRACKING_POINT_ERROR,
        payload: value
    }
}

export const update_add_tracking_point_success = (value) => {
    return {
        type: UPDATE_ADD_TRACKING_POINT_SUCCESS,
        payload: value
    }
}

export const update_edit_tracking_point_error = (value) => {
    return {
        type: UPDATE_EDIT_TRACKING_POINT_ERROR,
        payload: value
    }
}

export const update_edit_tracking_point_success = (value) => {
    return {
        type: UPDATE_EDIT_TRACKING_POINT_SUCCESS,
        payload: value
    }
}

