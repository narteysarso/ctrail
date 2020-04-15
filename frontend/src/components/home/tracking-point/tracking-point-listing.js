import React from "react";
import { List, Input, Skeleton, Popconfirm } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { fetch_tracking_points, remove_tracking_points, 
    update_edit_tracking_point_drawer_visible, 
    update_edit_tracking_point_datasource, search_tracking_point } from "../../../redux/actions/tracking-point-actions";


const {Search} = Input;
class TrackingPointList extends React.Component {

    state = {
        skip: 0,
        limit: 100,
        pageSize: 20,

    }
    
    componentDidMount() {
        const datasourceCount = this.props.trackingPoint.datasource.length;
         datasourceCount < 1 && this.props.fetch_tracking_points({skip: this.state.skip, limit: this.state.limit});
    }

    onNextPage (page = 1) {
        const {dataCount, datasource} = this.props.trackingPoint;
        const NEXT_DATA_SET_COUNT = page * this.state.limit;
        if(dataCount >= NEXT_DATA_SET_COUNT && datasource.length < NEXT_DATA_SET_COUNT)
        this.setState({skip: 
            this.state.skip + (page - 1 )* this.state.limit
        }, () => this.props.fetch_tracking_points({ skip: this.state.skip, limit: this.state.limit }));
    }

    onDeleteConfirm(item){
        this.props.remove_tracking_point(item);
    }

    render() {
        const { loading, datasource, dataCount} = this.props.trackingPoint;
        const {datasource : searchDatasource} = this.props.trackingPoint.searchTrackingPoint;
        return (
           <div style={{textAlign:"left", display: "flex", flexDirection: "column"}} >
                <Search size="large" placeholder="Search: keyword, name, tags ...etc" 
                loading={this.props.trackingPoint.searchTrackingPoint.loading} 
                enterButton 
                allowClear
                value={this.state.keyword}
                onChange={(e) => {
                    
                    this.setState({keyword: e.target.value})
                }}
                onSearch={(value)=> this.props.search_tracking_point({keyword: value})}
                style={{marginBottom: "3vh"}} />

                    <List style={{backgroundColor: "#fff"}}
                        header={<div>Tracking Points</div>}
                        className="tracking-point-list"
                        loading={loading}
                        bordered
                        itemLayout="horizontal"
                        pagination={{
                            onChange: page => {
                                this.onNextPage(parseInt(page));
                            },
                            pageSize: this.state.pageSize,
                            total: dataCount
                        }}
                        dataSource={this.state.keyword && searchDatasource ? searchDatasource: datasource ?? []}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <a onClick={
                                        () => {
                                            this.props.update_edit_tracking_point_datasource(item);
                                            this.props.update_edit_tracking_point_drawer_visible(true)
                                        }} key="tracking-point-edit">edit</a>,
                                    <span>{
                                        this.props.trackingPoint[`deletePoint${item.id}`] ? <LoadingOutlined /> :
                                        <Popconfirm key="tracking-point-more" 
                                        placement="topRight"
                                        okType="danger"
                                        onConfirm={this.onDeleteConfirm.bind(this,item)}
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        title={<div>Are you sure you want to delete this？<br /> This cannot be undone!</div>} okText="Yes" cancelText="No">
                                        <a href="#">Delete</a> 
                                        </Popconfirm>}
                                    </span>
                                ]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={`Tags: ${item.tags}`}
                                    />
                                    <div>{item.description}</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                
           </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        trackingPoint: state.trackingPoint
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        fetch_tracking_points: (data) => dispatch(fetch_tracking_points(dispatch,data)),
        remove_tracking_point: (data) => dispatch(remove_tracking_points(dispatch, data)),
        update_edit_tracking_point_drawer_visible: (value) => dispatch(update_edit_tracking_point_drawer_visible(value)),
        update_edit_tracking_point_datasource: (value) => dispatch(update_edit_tracking_point_datasource(value)),
        search_tracking_point: (value) => dispatch(search_tracking_point(dispatch,value))
    }
}

export default connect(mapPropsToState, mapPropsToDispatch)(TrackingPointList);