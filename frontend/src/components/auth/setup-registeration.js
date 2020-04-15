import React from "react";
import { Result} from 'antd';
import {Redirect} from 'react-router-dom';
import { SmileOutlined,LoadingOutlined } from '@ant-design/icons';
import { PostDataService } from "../../utils/helpers";
import {SLS_API_BASE_URL} from "../../utils/shared";
import PersistentStorage from "../../utils/session-manager";

class SetupRegistration extends React.Component {
    
    state ={
        redirect: false
    }
    async componentDidMount(){
        const token = this.props.match.params.token;
        const result = await PostDataService(`${SLS_API_BASE_URL}/user/setup_account`,null, { headers :{
            'Authorization': `Bearer ${token}`}});
        
        // console.log(result);
        if(result.statusCode === 200){
            // console.log(this.props)
            PersistentStorage.store('setupToken',result.data.token.toString());
            this.setState({redirect: true})
            // this.props.history.go('/register')
            
        }
    }

    render(){
        return this.state.redirect ? <Redirect to="/setup_password" /> : (
            <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Result
                    icon={<SmileOutlined />}
                    title="Welcome, we are working on your application!"
                    extra={<LoadingOutlined style={{ fontSize: "10vw", color: "#1890ff" }} />}

                />
            </div>
            
        );
    }
}

export default SetupRegistration;