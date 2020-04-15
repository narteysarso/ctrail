import React from "react";
import { List, Input, Skeleton, Row, Col, DatePicker, Slider, message, Divider, Card} from 'antd';
import moment from 'moment';
import { GetDataService, PostDataService, authRole } from "../../utils/helpers";
import { SLS_API_BASE_URL } from "../../utils/shared";
import PersistentStorage from "../../utils/session-manager";


const { RangePicker } = DatePicker;
const { Search } = Input;
const endDate = new Date();
const startDate = new Date();
const DAYS_BIAS = 15;
const TIME_BIAS = 60 * 60 ;
startDate.setDate((endDate.getDate() - DAYS_BIAS));

class Tracing extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            showPage: false,
            pageSize: 20,
            timeBias: 2,
            maxHours: 24,
            dateRange: [startDate, endDate],
            searching: false,
            listHeader: "",
            tracing: false,
            traceData: []
        }
    }
    
    onNextPage(page = 1) {
       
    }

    onDeleteConfirm(item) {
        
    }

    componentDidMount(){
        const app = PersistentStorage.fetch('app')
        if(app && authRole(app['role'])){
            this.setState({showPage: true});
        }
    }

    onSearch = async () =>{
        const { dateRange, timeBias, keyword } = this.state
        if(!dateRange || !timeBias || !keyword){
            message.error('Please provide all search values');
        }
        this.setState({searching: true});
        //make api request for all places contact has visited
        const result = await GetDataService(`${SLS_API_BASE_URL}/log/contacts`,
        {startDate: dateRange[0].getTime(), endDate: dateRange[1].getTime(), phone: keyword},
        {headers: {'Authorization': `Bearer ${PersistentStorage.fetch('app')['token']}`}});
        this.setState({ searching: false });

        //fetch data and count places contact has visited
        const data = result.data ? result.data.data: null;
        if(data){
            const len = data.length;
            this.setState({ listHeader: `${this.state.keyword} has visited ${len} place(s)` });

            const points = data.map((point) => point.pointId);
            const times = data.map(point => ({[point.id]: point.createdAt }))
            this.setState({tracing: true});
            const traceResult = await PostDataService(`${SLS_API_BASE_URL}/log/trace`,
                { points, times, timeBias: this.state.timeBias * TIME_BIAS },
                { headers: { 'Authorization': `Bearer ${PersistentStorage.fetch('app')['token']}` } });
            this.setState({ tracing: false });
            const traceData = traceResult.data ? traceResult.data.data : null;
            this.setState({traceData});
        }

    }

    render() {
        return this.state.showPage ? (
            <Row gutter={8} style={{ height: "100vh" }}>
                <Col xs={24} md={16} >
                    <List style={{ backgroundColor: "#fff", textAlign: "left" }}
                        header={<div><h4>Tracing</h4><h3>{this.state.listHeader}</h3></div>}
                        sub
                        className="tracing-list"
                        loading={false}
                        bordered
                        itemLayout="horizontal"
                        pagination={{
                            onChange: page => {
                                this.onNextPage(parseInt(page));
                            },
                            pageSize: this.state.pageSize,
                            total: 0
                        }}
                        dataSource={this.state.traceData}
                        renderItem={item => (
                            <List.Item >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={item.phone}
                                        description={`Date: ${(new Date(item.createdAt)).toUTCString()}`}
                                    />
                                    <div>{item.description}</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={24} md={8} style={{ backgroundColor: "#fff", padding: "1vh" }}>
                    <Card title="Trace Contact" >
                        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <Search size="large" placeholder="Search: keyword, name, tags ...etc"
                                loading={this.state.searching}
                                enterButton
                                allowClear
                                value={this.state.keyword}
                                onChange={(e) => {
                                    this.setState({ keyword: e.target.value })
                                }}
                                onSearch={this.onSearch}
                                style={{ marginBottom: "3vh" }} />
                            <Divider />
                            <h4>Date Range</h4>
                            <RangePicker
                                defaultValue={[moment(this.state.dateRange[0]), moment(this.state.dateRange[1])]}
                                format="DD-MM-YYYY"
                                onChange={(date) => { this.setState({dateRange: date})}}
                            />
                            <Divider />
                            <h4>Time bias (in hours)</h4>
                            <Slider defaultValue={this.state.timeBias}
                                tooltipVisible
                                tooltipPlacement="bottom"
                                tipFormatter={(value) => `${value} hour(s)`}
                                max={this.state.maxHours}
                                onChange={(value) => this.setState({timeBias: value })}
                                dots={true} />
                        </div>
                    </Card>             
                </Col>
            </Row>
        ): "";
    }
}



export default Tracing;