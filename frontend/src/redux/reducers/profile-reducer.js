import { UPDATE_PROFILE_DATASOURCE, 
    UPDATE_PROFILE_LOADING, UPDATE_CHANGE_PASSWORD_LOADING, 
    UPDATE_CHANGE_PASSWORD_MODAL_VISIBLE, 
    UPDATE_CHANGE_EDIT_PROFILE_DRAWER_VISIBLE, 
    UPDATE_CHANGE_PASSWORD_ERROR,
    UPDATE_CHANGE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_SUCCESS} from "../actions/profile-actions";

const profileReducer = (state ={}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_DATASOURCE:
            return Object.assign({}, state, {
                datasource: payload
            });

        case UPDATE_PROFILE_LOADING:
            return Object.assign({}, state, {
                loading: payload
            });

        case UPDATE_CHANGE_PASSWORD_LOADING:
            return Object.assign({},state, {
                changePassword : {
                    loading: payload,
                    error: state.changePassword.error,
                    success: state.changePassword.success,
                    modalVisible: state.changePassword.modalVisible
                }
            });
        
        case UPDATE_CHANGE_PASSWORD_ERROR:
            return Object.assign({},state, {
                changePassword : {
                    error: payload,
                    success: state.changePassword.success,
                    loading: state.changePassword.payload,
                    modalVisible: state.changePassword.modalVisible
                }
            });
        
        case UPDATE_CHANGE_PASSWORD_SUCCESS:
            return Object.assign({},state, {
                changePassword : {
                    error: state.changePassword.error,
                    success: payload,
                    loading: state.changePassword.payload,
                    modalVisible: state.changePassword.modalVisible
                }
            });

        case UPDATE_CHANGE_PASSWORD_MODAL_VISIBLE:
            return Object.assign({}, state, {
                changePassword : {
                    loading: state.changePassword.loading,
                    modalVisible: payload
                }
            });

        case UPDATE_CHANGE_EDIT_PROFILE_DRAWER_VISIBLE:
            return Object.assign({}, state, {
                editProfile: {
                    loading: state.editProfile.loading,
                    drawerVisible: payload
                }
            });

        case UPDATE_PROFILE_ERROR:
            return Object.assign({},state,{
                error: payload
            });
        
        case UPDATE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                success: payload
            });

        default:
            return state;
    }
}

export default profileReducer;