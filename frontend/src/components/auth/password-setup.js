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
import {  Redirect } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PersistentStorage from '../../utils/session-manager';
import { PostDataService } from '../../utils/helpers';
import { SLS_API_BASE_URL } from '../../utils/shared';


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
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const result = await PostDataService(`${SLS_API_BASE_URL}/user/set_password`, { ...values }, {
                headers: {
                    'Authorization': `Bearer ${PersistentStorage.fetch('setupToken')}`
                }
            });

            if (result.statusCode === 200) {
                PersistentStorage.store("app", result.data);
                PersistentStorage.delete("setupToken");
                setRedirect(true);
            }
        } catch (error) {
            //TODO: system loggin
            console.log(error);
        }

        setLoading(false)

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
    
    return redirect ? <Redirect to="/home" /> : (

        <div style={style}>
            <Card style={{ width: "50vw" }} title="Setup your password">
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
                        name="confirm_password"
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
                           
                            <Col offset={18} span={4}>
                                <Button type="primary" htmlType="submit">
                                   {loading && <LoadingOutlined />}
                                    Done
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
