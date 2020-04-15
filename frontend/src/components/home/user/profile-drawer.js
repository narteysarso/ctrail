import React from "react";
import {
    Drawer, Button, Form,
    Input,
    Select, message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { update_change_edit_profile_drawer_visible, update_profile_success, update_profile_error, update_user } from "../../../redux/actions/profile-actions";
import PersistentStorage from "../../../utils/session-manager";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const  ProfileDrawer = (props) =>  {

    const [form] = Form.useForm();

    const onFinish = values => {
        props.update_profile(values);
    };

    const messageSuccess = () => {
        message.success(props.profile.success);
        props.update_profile_success(null);
    };


    const messageError = () => {
        message.error(props.profile.error);
        props.update_profile_error(null)
    };

    const networkSelector = (
        <Form.Item name="intlCode" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                {/* <Option value="86">+86</Option>
                <Option value="87">+87</Option> */}
            </Select>
        </Form.Item>
    );

    const {drawerVisible} = props.editProfile;
    const {loading, error, success} = props.profile;
    const {name, email, phone} = {...PersistentStorage.fetch('app'),...props.profile.datasource};
    
    return (
        <div>
            {success && messageSuccess()}
            {error && messageError()} 
            <Drawer
                title="Update Profile"
                placement="right"
                closable={true}
                onClose={() => props.update_change_edit_profile_drawer_visible(false)}
                visible={drawerVisible}
                width={500}
            >
                
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        intlCode: '233',
                        name: name,
                        email: email,
                        phone: phone
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={networkSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        
                        <Button type="primary" htmlType="submit">
                            {loading ? <LoadingOutlined /> : ""}
                            Update info
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </div>
    );
}

const mapPropsToState = state => {
    return {
        editProfile: state.profile.editProfile,
        profile: state.profile
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        update_change_edit_profile_drawer_visible : (value) => dispatch(update_change_edit_profile_drawer_visible(value)),
        update_profile_success: (value) => dispatch(update_profile_success(value)),
        update_profile_error: (value) => dispatch(update_profile_error(value)),
        update_profile: (value) => dispatch(update_user(dispatch, value))
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)( ProfileDrawer);