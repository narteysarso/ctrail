import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    Row,
    Col
} from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PersistentStorage from '../../utils/session-manager';


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

const PasswordSetupForm = (props) => {
    const [form] = Form.useForm();
    
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const networkSelector = (
        <Form.Item name="networkCode" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    
    return (

        <div style={style}>
            <Card style={{ width: "50vw" }} title="Register">
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
                        name="fullname"
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
                        name="password"
                        label="Password"
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
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
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
                        <Row>
                            <Col span={4}>
                                <Link to="/login"><a href="">Login!</a></Link>
                            </Col>
                            <Col offset={12} span={4}>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Col>
                        </Row>
                        
                        
                    </Form.Item>
                </Form>

            </Card>
        </div>
    );
};


const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
    height: "100vh"
}

const mapPropsToState = state => {
    return {
        app: state.app
    }
}

export default connect(mapPropsToState)(PasswordSetupForm);
