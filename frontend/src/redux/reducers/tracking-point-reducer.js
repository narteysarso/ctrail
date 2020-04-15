import { UPDATE_ADD_TRACKING_POINT_DRAWER_VISIBLE, 
    UPDATE_EDIT_TRACKING_POINT_DRAWER_VISIBLE, 
    UPDATE_ADD_TRACKING_POINT_LOADING,
    UPDATE_EDIT_TRACKING_POINT_LOADING,
    UPDATE_TRACKING_POINT_LOADING,
     UPDATE_TRACKING_POINT_DATASOURCE,
      UPDATE_ADD_TRACKING_POINT_ERROR,
      UPDATE_EDIT_TRACKING_POINT_ERROR,
       UPDATE_ADD_TRACKING_POINT_SUCCESS, 
       UPDATE_EDIT_TRACKING_POINT_SUCCESS, 
       UPDATE_TRACKING_POINT_DATA_COUNT,
       UPDATE_REMOVE_TRACKING_POINT_LOADING,
       REMOVE_TRACKING_POINT_FROM_DATASOURCE,
       UPDATE_EDIT_TRACKING_POINT_DATASOURCE,
       UPDATE_TRACKING_POINT_DATASOURCE_ON_EDIT,
       UPDATE_SEARCH_TRACKING_POINT_DATASOURCE,
       UPDATE_SEARCH_TRACKING_POINT_SUCCESS,
       UPDATE_SEARCH_TRACKING_POINT_ERROR,
       UPDATE_SEARCH_TRACKING_POINT_LOADING} from "../actions/tracking-point-actions";

const trackingPointReducer = (state ={}, {type, payload}) => {
    
    switch (type) {
        case UPDATE_ADD_TRACKING_POINT_DRAWER_VISIBLE:
            return Object.assign({},state,{
                createTrackingPoint: {
                    drawerVisible: payload,
                    loading: state.createTrackingPoint.loading,
                    success: state.createTrackingPoint.success,
                    error: state.createTrackingPoint.error
                }
            });
            
        case UPDATE_ADD_TRACKING_POINT_LOADING:
            return Object.assign({},state,{
                createTrackingPoint: {
                    
                    drawerVisible: state.createTrackingPoint.drawerVisible,
                    loading: payload,
                    success: state.createTrackingPoint.success,
                    error: state.createTrackingPoint.error

                }
            });
        case UPDATE_EDIT_TRACKING_POINT_DRAWER_VISIBLE:
            return Object.assign({},state,{
                editTrackingPoint: {
                    drawerVisible: payload,
                    loading: state.editTrackingPoint.loading,
                    success: state.editTrackingPoint.success,
                    error: state.editTrackingPoint.error,
                    datasource: state.editTrackingPoint.datasource
                }
            });
        case UPDATE_EDIT_TRACKING_POINT_DATASOURCE:
            return Object.assign({},state,{
                editTrackingPoint: {

                    datasource: payload,
                    drawerVisible: state.editTrackingPoint.drawerVisible,
                    loading: state.editTrackingPoint.loading,
                    success: state.editTrackingPoint.success,
                    error: state.editTrackingPoint.error
                }
            });
            
        case UPDATE_EDIT_TRACKING_POINT_LOADING:
            return Object.assign({},state,{
                editTrackingPoint: {
                    datasource: state.editTrackingPoint.datasource,
                    drawerVisible: state.editTrackingPoint.drawerVisible,
                    loading: payload,
                    success: state.editTrackingPoint.success,
                    error: state.editTrackingPoint.error

                }
            });

        case UPDATE_TRACKING_POINT_LOADING:
            return Object.assign({},state,{
                loading: payload
            });
        
        case UPDATE_TRACKING_POINT_DATA_COUNT:
            return Object.assign({}, state, {
                dataCount: payload
            });

        case UPDATE_TRACKING_POINT_DATASOURCE:
            return Object.assign({}, state, {
                datasource: [...state.datasource, ...payload]
            });
        case UPDATE_REMOVE_TRACKING_POINT_LOADING:
            return Object.assign({},state,{
                ...payload,
            });

        case REMOVE_TRACKING_POINT_FROM_DATASOURCE:
            return Object.assign({}, state, {
                datasource: state.datasource.filter(item => {
                    if(item.id !== payload.id)
                    return true;
                })
            });
            
        case UPDATE_ADD_TRACKING_POINT_ERROR: 
            return Object.assign({},state,{
                createTrackingPoint: {
                    error: payload,
                    drawerVisible: state.createTrackingPoint.drawerVisible,
                    success: state.createTrackingPoint.success,
                    loading: state.createTrackingPoint.loading
                }
            });

        case UPDATE_ADD_TRACKING_POINT_SUCCESS: 
            return Object.assign({},state,{
                createTrackingPoint: {
                    success: payload,
                    drawerVisible: state.createTrackingPoint.drawerVisible,
                    error: state.createTrackingPoint.error,
                    loading: state.createTrackingPoint.loading
                }
            });

        case UPDATE_EDIT_TRACKING_POINT_ERROR: 
            return Object.assign({},state,{
                editTrackingPoint: {
                    datasource: state.editTrackingPoint.datasource,
                    error: payload,
                    drawerVisible: state.editTrackingPoint.drawerVisible,
                    success: state.editTrackingPoint.success,
                    loading: state.editTrackingPoint.loading
                }
            });

        case UPDATE_EDIT_TRACKING_POINT_SUCCESS: 
            return Object.assign({},state,{
                editTrackingPoint: {
                    datasource: state.editTrackingPoint.datasource,
                    success: payload,
                    drawerVisible: state.editTrackingPoint.drawerVisible,
                    error: state.editTrackingPoint.error,
                    loading: state.editTrackingPoint.loading
                }
            });

        case UPDATE_TRACKING_POINT_DATASOURCE_ON_EDIT:
            return Object.assign({}, state, {
                datasource : state.datasource.map(item => {
                    if(item.id === payload.id)
                        return payload
                    return item;
                })
            });

        case UPDATE_SEARCH_TRACKING_POINT_SUCCESS:
            return Object.assign({}, state, {
                searchTrackingPoint: {
                    datasource: state.searchTrackingPoint.datasource,
                    success: payload,
                    error: state.searchTrackingPoint.error,
                    loading: state.searchTrackingPoint.loading
                }
            });

        case UPDATE_SEARCH_TRACKING_POINT_DATASOURCE:
            return Object.assign({}, state, {
                searchTrackingPoint: {
                    datasource: payload,
                    success: state.searchTrackingPoint.success,
                    error: state.searchTrackingPoint.error,
                    loading: state.searchTrackingPoint.loading
                }
            });

        case UPDATE_SEARCH_TRACKING_POINT_ERROR:
            return Object.assign({}, state, {
                searchTrackingPoint: {
                    datasource: state.searchTrackingPoint.datasource,
                    success: state.searchTrackingPoint.success,
                    error: payload,
                    loading: state.searchTrackingPoint.loading
                }
            });
        case UPDATE_SEARCH_TRACKING_POINT_LOADING:
            return Object.assign({}, state, {
                searchTrackingPoint: {
                    datasource: state.searchTrackingPoint.datasource,
                    success: state.searchTrackingPoint.success,
                    loading: payload,
                    error: state.searchTrackingPoint.error
                }
            });

    
        default:
            return state;
    }
}

export default trackingPointReducer;