import React from "react";
import { Modal, Form, Input, Button , message} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import { update_change_password_modal_visible, update_password, update_change_password_error, update_change_password_success } from '../../../redux/actions/profile-actions';

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

class ChangePasswordModal extends React.Component {
    
    onFinish = values => {
        this.props.update_password(values);
    };
    
    messageSuccess = () => {
        message.success(this.props.changePassword.success);
        this.props.update_change_password_success(null);
    };

    
    messageError = () => {
        message.error(this.props.changePassword.error);
        this.props.update_change_password_error(null)
    };

    
    render() {
        const {modalVisible, loading,success,error} = this.props.changePassword;
        return (
            <div>
                {success ? this.messageSuccess() : ""}
                {error ? this.messageError(): ""}
                <Modal
                    title="Change Password"
                    visible={modalVisible}
                    footer={null}
                    onCancel={()=>this.props.change_password_modal_visible(false)}
                >
                    <Form
                        {...formItemLayout}
                        name="register"
                        onFinish={this.onFinish}
                        initialValues={{
                            networkCode: '233',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="username"
                            label="Email/Password"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input  />
                        </Form.Item>   
                        <Form.Item
                            name="password"
                            label="Current Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        
                        <Form.Item
                            name="newpassword"
                            label="New password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirme New Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your new password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                {loading ? <LoadingOutlined /> : ""}
                                Change password
                            </Button>
                        </Form.Item>
                    </Form>


                </Modal>
            </div>
        );
    }
}


const mapPropsToState = state => {
    return {
        changePassword: state.profile.changePassword
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        change_password_modal_visible: (value) => dispatch(update_change_password_modal_visible(value)),
        update_password: (value) => dispatch(update_password(dispatch,value)),
        update_change_password_error: (value) => dispatch(update_change_password_error(value)),
        update_change_password_success: (value) => dispatch(update_change_password_success(value))
    }
}
export default connect(mapPropsToState,mapPropsToDispatch)(ChangePasswordModal);