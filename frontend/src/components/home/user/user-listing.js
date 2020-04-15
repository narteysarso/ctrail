import React from "react";
import { List, Input, Skeleton, Popconfirm, Divider } from 'antd';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { connect } from "react-redux";
import { fetch_users, remove_user, search_user } from "../../../redux/actions/user-actions";

const {Search} = Input;
class UserList extends React.Component {

    state = {
        skip: 0,
        limit: 100,
        pageSize: 20,

    }

    componentDidMount() {
        const datasourceCount = this.props.users.datasource.length;
        datasourceCount < 1 && this.props.fetch_users({ skip: this.state.skip, limit: this.state.limit });
    }

    onNextPage(page = 1) {
        const { dataCount, datasource } = this.props.users;
        const NEXT_DATA_SET_COUNT = page * this.state.limit;
        if (dataCount >= NEXT_DATA_SET_COUNT && datasource.length < NEXT_DATA_SET_COUNT)
            this.setState({
                skip:
                    this.state.skip + (page - 1) * this.state.limit
            }, () => this.props.fetch_users({ skip: this.state.skip, limit: this.state.limit }));
    }

    onDeleteConfirm(item) {
        this.props.remove_user(item);
    }

    render() {
        const { loading, datasource, dataCount } = this.props.users;
        const { datasource: searchDatasource } = this.props.users.searchUser;
        return (
            <div style={{ textAlign: "left", display: "flex", flexDirection: "column" }} >
                <Search size="large" placeholder="Search: keyword, name, email ...etc"
                    loading={this.props.users.searchUser.loading}
                    enterButton
                    allowClear
                    value={this.state.keyword}
                    onChange={(e) => {

                        this.setState({ keyword: e.target.value })
                    }}
                    onSearch={(value) => this.props.search_user({ keyword: value })}
                    style={{ marginBottom: "3vh" }} />

                <List style={{ backgroundColor: "#fff" }}
                    header={<div>Users</div>}
                    className="user-list"
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
                    dataSource={this.state.keyword && searchDatasource ? searchDatasource : datasource ?? []}
                    renderItem={item => (
                        <List.Item
                            actions={[

                                <span>{
                                    this.props.users[`deleteUser${item.id}`] ? <LoadingOutlined /> :
                                        <Popconfirm key="user-more"
                                            placement="topRight"
                                            okType="danger"
                                            onConfirm={this.onDeleteConfirm.bind(this, item)}
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
                                    description={<span> 
                                        Email: {item.email} <Divider type="vertical"/>
                                        Phone: {item.phone} <Divider type="vertical" />
                                        Role: {item.role} <Divider type="vertical" />
                                        </span>}
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
        users: state.users
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        fetch_users: (value) => dispatch(fetch_users(dispatch,value)),
        remove_user: (value) => dispatch(remove_user(dispatch,value)),
        search_user: (value) => dispatch(search_user(dispatch,value))
    }
}
export default connect(mapPropsToState, mapPropsToDispatch)(UserList);