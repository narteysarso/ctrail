import React, {useState} from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, Tag , Tooltip, message} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { update_add_tracking_point_drawer_visible, add_tracking_point, update_add_tracking_point_success, update_add_tracking_point_error } from "../../../redux/actions/tracking-point-actions";

const { Option } = Select;

const TrackingPointDrawerForm = (props) => {
    const [form] = Form.useForm();
    let [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [input, setInput] = useState();
    const { drawerVisible, loading, success, error } = props.createTrackingPoint;
    const { update_add_tracking_point_drawer_visible } = props;


    const handleClose = removedTag => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true)
    };

    const handleInputChange = e => {
        setInputValue(e.target.value );
    };

    const handleInputConfirm = () => {
        let currentTags = tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            
            setTags([...currentTags, inputValue]);
            
        }
        
        setInputVisible(false);
        setInputValue('');
    };

    const saveInputRef = input => setInput(input);


    const onFinish = values => {
        values = { ...values, tags: (tags.join(" ")).trim().toLocaleLowerCase()};
        
        props.add_tracking_point(values);
        
    };

    const onReset = () => {
        form.resetFields();
    };

    const messageSuccess = () => {
        console.log('ccc')
        message.success(props.createTrackingPoint.success);
        props.update_add_tracking_point_success(null);
        onReset();
    };


    const messageError = () => {
        message.error(props.createTrackingPoint.error);
        props.update_add_tracking_point_error(null)
    };
    
    return (
        <div>
            {success && messageSuccess()}
            {error && messageError()} 
            <Drawer
                title="Add Tracking Point"
                width={650}
                onClose={update_add_tracking_point_drawer_visible.bind(this, false)}
                visible={drawerVisible}
                bodyStyle={{ paddingBottom: 80 }}

            >
                <Form form={form} layout="vertical" hideRequiredMark onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                name="code"
                                label="Code"
                                rules={[{ required: true, message: 'Please provide USSD code' }]}
                            >
                                <Input placeholder="Please provide USSD code" />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="latitude"
                                label="Latitude"  
                                rules={[
                                    { required: true, message: 'Please enter GPS Latitude' }
                                ]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    addonBefore="lat"
                                    addonAfter="gps"
                                    placeholder="Please enter GPS Latitude"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="longitude"
                                label="Longitude"
                                rules={[{ required: true, message: 'Please enter GPS Longitude' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    addonBefore="long"
                                    addonAfter="gps"
                                    placeholder="Please enter GPS Longitude"
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="overseer"
                                label="Owner/Overseer"
                                rules={[{ required: true, message: 'Please enter owner name' }]}
                            >
                                <Input placeholder="Please enter owner name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="overseerPhone"
                                label="Owner/Overseer Phone"
                                rules={[{ required: true, message: 'Please enter owner phone' }]}
                            >
                                <Input placeholder="Please enter owner name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gpgps"
                                label="GhanaPost GPS"
                            >
                                <Input placeholder="Please enter valid GPGPS" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="isMovable"
                                label="Type"
                                rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value={true}>Moveable</Option>
                                    <Option value={false}>Stationary</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={6}>
                        <Col span={24}>
                            <h4>Tags:</h4>
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable={true} onClose={() => handleClose(tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? (
                                    <Tooltip title={tag} key={tag}>
                                        {tagElem}
                                    </Tooltip>
                                ) : (
                                        tagElem
                                    );
                            })}
                            {inputVisible && (
                                <Input
                                    ref={saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag className="site-tag-plus" onClick={showInput}>
                                    <PlusOutlined /> New Tag
                                </Tag>
                            )}
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                
                            >
                                <Input.TextArea rows={4} placeholder="please enter tracking point description" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ float: "right" }}>
                        <Button htmlType="reset"  onClick={onReset.bind(this)}>Clear All</Button>
                        <Button htmlType="submit" type="primary">
                            {loading && <LoadingOutlined />}
                            Add Point
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}

const mapPropsToState = state => {
    return {
        createTrackingPoint: state.trackingPoint.createTrackingPoint,

    }
}

const mapPropsToDispatch = dispatch => {
    return {
        update_add_tracking_point_drawer_visible: (value) => dispatch(update_add_tracking_point_drawer_visible(value)),
        add_tracking_point: (value) => dispatch(add_tracking_point(dispatch, value)),
        update_add_tracking_point_success: (value) => dispatch(update_add_tracking_point_success(value)),
        update_add_tracking_point_error: (value) => dispatch(update_add_tracking_point_error(value))
    }
}

export default connect(mapPropsToState, mapPropsToDispatch) (TrackingPointDrawerForm);