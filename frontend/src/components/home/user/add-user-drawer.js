import React from "react";
import {
    Form,
    Input,
    Select,
    Button,
    Drawer,
    Checkbox,
    Row,
    Col,
    message
} from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { add_user, update_add_user_drawer_visible, update_add_user_error, update_add_user_success } from "../../../redux/actions/user-actions";


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
            span: 20,
            offset: 4,
        },
    },
};

const AddUserDrawer = (props) => {
    const {success, error, drawerVisible, loading} = props.createUser;
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = values => {
        props.add_user(values);
    };

    const networkSelector = (
        <Form.Item name="networkCode" noStyle>
            <Select
                style={{
                    width: 90,
                }}
            >
                <Option value="233">+233</Option>
                <Option value="234">+234</Option>
            </Select>
        </Form.Item>
    );

    const messageSuccess = () => {
        
        message.success(props.createUser.success);
        props.update_add_user_success(null);
        onReset();
    };


    const messageError = () => {
        message.error(props.createUser.error);
        props.update_add_user_error(null)
    };

    return(
        <div>
            {success && messageSuccess()}
            {error && messageError()} 
            <Drawer
                title="Add New User"
                width={650}
                onClose={props.update_add_user_drawer_visible.bind(this,false)}
                visible={drawerVisible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        networkCode: '233',
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

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select>
                            <Option value="ADMIN">Administrator</Option>
                            <Option value="CLERK">Clerk</Option>
                            <Option value="SUPERVISOR">Supervisor</Option>
                            <Option value="USER">User</Option>

                        </Select>
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        <Row>
                            <Col span={24}>
                                <Checkbox checked={true} name="sendEmail">Send email I.V</Checkbox> <br />
                                <Checkbox name="sendText">Send sms I.V <span style={{color: "red"}}>(not implemented)</span></Checkbox>
                            </Col>
                            <Col offset={14} span={10} style={{textAlign: "right", display: "flex", justifyContent: "space-between"}}>
                                <Button htmlType="reset"  onClick={onReset.bind(this)}>Clear All</Button>
                                <Button type="primary" htmlType="submit">
                                    {loading && <LoadingOutlined />}
                                    Add User
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>

            </Drawer>
        </div>
    );
}

const mapPropsToState = state => {
    return {
        createUser: state.users.createUser
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        add_user: (value) => dispatch(add_user(dispatch,value)),
        update_add_user_drawer_visible: (value) => dispatch(update_add_user_drawer_visible(value)),
        update_add_user_error: (value) => dispatch(update_add_user_error(value)),
        update_add_user_success: (value) => dispatch(update_add_user_success(value))
    }
}

export default connect(mapPropsToState, mapPropsToDispatch)( AddUserDrawer);