import React from "react";
import {connect} from 'react-redux';
import { Redirect, Route } from "react-router-dom";
import { Layout, Menu,Avatar} from 'antd';
import {
     LockOutlined,SettingOutlined,
    UserOutlined, LogoutOutlined, LoadingOutlined} from '@ant-design/icons';
import { logout, update_app_login } from "../../redux/actions/app-actions";
import ChangePasswordModal from "./user/change-password-modal";
import ProfileDrawer from "./user/profile-drawer";
import { update_change_edit_profile_drawer_visible, update_change_password_modal_visible } from "../../redux/actions/profile-actions";
import TrackingPointDrawer from "./tracking-point/tracking-point-drawer";
import SideMenu from "./side-menu";
import TrackingPointListing from "./tracking-point/tracking-point-listing";
import PersistentStorage from "../../utils/session-manager";
import TrackingPointEditDrawer from "./tracking-point/tracking-point-edit-drawer";
import AddUserDrawer from "./user/add-user-drawer";
import UserListing from "./user/user-listing";
import Tracing from "./tracing";

const { SubMenu } = Menu;
const { Header, Content } = Layout;

class Home extends React.Component{
    state = {login: false}
    
    componentDidMount() {
        const app = PersistentStorage.fetch("app");
        if (app)
            this.props.update_app_login(true)
        else
            this.props.update_app_login(false)
    }
    render(){
        if (!this.props.app.login){
            console.log(this.props.app.login)
            return <Redirect to="/login" />
        }
        
        return (

            <div id="#components-layout-top-side">
                
                <ChangePasswordModal />
                <ProfileDrawer />
                <TrackingPointDrawer />
                <TrackingPointEditDrawer />
                <AddUserDrawer />
                <Layout style={{ height: "100vh" }}>
                        <Header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div className="logo">
                            <Avatar style={{backgroundColor: "#fff",padding: ".2vw"}} size={40} src="./logo.png" />
                        </div>
                        <Menu theme="dark" mode="horizontal" >
                                <SubMenu theme="light"
                                    key="sub1"
                                    title={
                                        <span>
                                            <SettingOutlined />
                                        settings
                                        </span>
                                    }
                                >
                                    <Menu.Item key="1"
                                    onClick={()=>this.props.change_password_modal_visible(true)}>
                                        <LockOutlined />
                                        change password
                                    </Menu.Item>
                                    <Menu.Item key="2"
                                    onClick={() => this.props.update_change_edit_profile_drawer_visible(true)}>
                                        <UserOutlined />
                                        edit profile
                                    </Menu.Item>
                                    <Menu.Item 
                                    key="4" 
                                    onClick={() => this.props.logout()}>
                                        {this.props.app.loggingOut ? <LoadingOutlined /> : <LogoutOutlined />}
                                        logout
                                    </Menu.Item>
                                </SubMenu>
                        </Menu>
                    </Header>
                    <Layout>
                        <SideMenu />
                        <Layout style={{ padding: '0 24px 24px' }}>

                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Route exact={true} path="/home/" render={() => <Tracing />} />
                                <Route path="/home/points" render={() =><TrackingPointListing />} />
                                <Route path="/home/users" render={() =><UserListing />} />
                    </Content>
                        </Layout>
                    </Layout>
                </Layout>

            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        app: state.app,
        trackingPoint: state.trackingPoint
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        logout: () => dispatch(logout(dispatch)),
        update_app_login: (value) => dispatch(update_app_login(value)),
        update_change_edit_profile_drawer_visible: (value) => dispatch(update_change_edit_profile_drawer_visible(value)),
        change_password_modal_visible: (value) => dispatch(update_change_password_modal_visible(value))
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)(Home);