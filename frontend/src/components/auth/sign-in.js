import React from "react";
import { Form, Input, Button, Card, message, Avatar} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from "react-router-dom";
import { login } from "../../redux/actions/app-actions";
import { connect } from "react-redux";



class SignInForm extends React.Component{

    onFinish = async values => {
       const result = await this.props.login(values);
       
       if(!result){
           message.error("Login in Failed. Invalid credentials");
       }
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render(){
        const {loggingIn, login} = this.props.app;
        console.log(login);
        return login ? <Redirect to="/home" /> : (
            <div style={style}>
                <Card style={{ width: "50vw", textAlign:"left" }} title={<span style={{fontWeight: "bolder"}} ><Avatar size={64} src="./logo.png" /> CTrail</span>}>
                    <Form id="components-form-normal-login"
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email/Phone" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={loggingIn} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

            </div>
        );
    }
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
const mapPropsToDispatch = dispatch => {
    return {
        login: (value) => dispatch(login(dispatch,value))
    }
}
export default connect(mapPropsToState,mapPropsToDispatch)(SignInForm);