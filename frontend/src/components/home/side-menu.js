import React from "react";
import {
    DeploymentUnitOutlined, TeamOutlined, ShareAltOutlined, LoadingOutlined, PlusOutlined, FileSearchOutlined
} from '@ant-design/icons';
import {Layout, Menu} from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {authRole} from "../../utils/helpers";
import PersistentStorage from "../../utils/session-manager";
import { update_change_password_modal_visible } from "../../redux/actions/profile-actions";
import { update_add_tracking_point_drawer_visible } from "../../redux/actions/tracking-point-actions";
import { update_add_user_drawer_visible } from "../../redux/actions/user-actions";

const { SubMenu } = Menu;
const {Sider} = Layout;


const SideMenu = (props) => {
    const appData = props.app.login ? PersistentStorage.fetch('app') : {};
    const { role } = appData ?? {};
    return(
        <Sider width={220} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub2', 'sub3']}
                style={{ height: '100%', borderRight: 0, textAlign: "left" }}
            >
                {authRole(role)? <Menu.Item key="1">
                    <Link to="/home" >
                        <ShareAltOutlined />
                        Contact Tracing
                    </Link> 
                </Menu.Item>: ""}
                <SubMenu theme="light"
                    key="sub2"
                    open={true}
                    title={
                        <span>
                        <DeploymentUnitOutlined />
                            Tracking Point
                        </span>
                    }
                >
                    <Menu.Item key="2"

                        onClick={props.update_add_tracking_point_drawer_visible.bind(this, true)}>
                        <PlusOutlined />
                        Add Tracking Point
                    </Menu.Item>
                    {authRole(role) && <Menu.Item key="3">
                        <Link to="/home/points">
                            <FileSearchOutlined />
                        Tracking Points&nbsp;&nbsp;
                        {props.trackingPoint.loading ? <LoadingOutlined /> : ""}
                        </Link>
                    </Menu.Item>}
                    
                </SubMenu>
                {authRole(role) ? <SubMenu theme="light"
                    key="sub3"
                    title={
                        <span>
                            <TeamOutlined />
                                            Users
                                        </span>
                    }
                >
                    <Menu.Item key="4" onClick={props.update_add_user_drawer_visible.bind(this,true)}>
                        <PlusOutlined />
                        Add User
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/home/users">
                            <FileSearchOutlined />
                            Users
                        </Link>
                    </Menu.Item>
                </SubMenu>
                    : ""}
            </Menu>
        </Sider>

    )
}

const mapPropsToState = state => {
    return {
        trackingPoint: state.trackingPoint,
        app: state.app
    }
}

const mapPropsToDispatch = dispatch => {
    const permFunc = authRole ? { 
        update_add_user_drawer_visible: (value) => dispatch(update_add_user_drawer_visible(value))
} : {};
    return {
        change_password_modal_visible: (value) => dispatch(update_change_password_modal_visible(value)),
        update_add_tracking_point_drawer_visible: (value) => dispatch(update_add_tracking_point_drawer_visible(value)),
        
        ...permFunc
    }
}


export default connect(mapPropsToState, mapPropsToDispatch)(SideMenu);