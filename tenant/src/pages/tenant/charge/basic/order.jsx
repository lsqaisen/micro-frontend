import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { DatePicker, Button, Radio } from 'antd';
import Order from 'tenant/charge/Order';
import { SearchSelect } from '_global';
import { tenants, downloadOrder } from 'services/tenant';
const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType === 1,
        props => props.charge.order,
        props => !!props.loading.effects[`charge/order`],
    ],
    (admin, order, loading) => ({ admin, order, loading }),
))(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'consume',
            time_from: "",
            time_to: "",
            tenant_name: "",
            page: 1,
            page_size: 10,
        };
        [`order`]
            .forEach(m => this[m] = this[m].bind(this));
    }
    async order(type, time_from, time_to, tenant_name, page, page_size) {
        const { dispatch } = this.props;
        await dispatch({
            type: 'charge/order',
            payload: { type, time_from, time_to, tenant_name, page, page_size }
        });
        await this.setState({ type, time_from, time_to, tenant_name, page, page_size });
    }
    componentDidMount() {
        const { type, time_from, time_to, tenant_name, page, page_size } = this.state;
        this.order(type, time_from, time_to, tenant_name, page, page_size);
    }
    render() {
        const {
            admin, loading,
            order: { data: { items = [], total = 0 }, err = null },
        } = this.props;
        const { type, time_from, time_to, tenant_name, page, page_size } = this.state;
        return (
            <div>
                <div style={{ marginBottom: 16, overflow: 'hidden' }}>
                    <div style={{ float: 'left' }}>
                        <Button type="primary" ghost style={{ marginRight: 16 }} onClick={() => downloadOrder({ page, page_size: total })}>下载报表</Button>
                        <Button type="primary" ghost style={{ marginRight: 16 }} loading={loading} onClick={() => this.order(type, time_from, time_to, tenant_name, page, page_size)}>刷新</Button>
                    </div>
                    <div style={{ float: 'right' }}>
                        <RadioGroup style={{ marginRight: 16 }} onChange={(e) => this.order(e.target.value, time_from, time_to, tenant_name, 1, page_size)} defaultValue={type}>
                            <RadioButton value="consume">消费记录</RadioButton>
                            <RadioButton value="order">订单记录</RadioButton>
                        </RadioGroup>
                        {admin ? <SearchSelect
                            allowClear
                            style={{ width: '140px', marginRight: 16 }}
                            placeholder='工作空间'
                            onChange={(tenant_name) => this.setState({ tenant_name })}
                            onSearch={(params) => {
                                const { page = 1, page_size = 10 } = params || {};
                                return new Promise(async (resolve, reject) => {
                                    try {
                                        let response = await tenants({ page, page_size });
                                        if (response.err) {
                                            reject(response.err)
                                        } else {
                                            resolve({
                                                data: ((response.data || {}).projectList || []).map(v => ({
                                                    key: v.name,
                                                    label: `${v.name}`
                                                })),
                                                params: (response.data || {}).total <= page_size * page ? null : {
                                                    page: page + 1,
                                                    page_size,
                                                }
                                            })
                                        }
                                    } catch (error) {
                                        reject(error)
                                    }
                                })
                            }}
                        /> : null}
                        <RangePicker
                            style={{ marginRight: 16, width: '240px' }}
                            onChange={(date, dateString) => {
                                this.setState({
                                    time_from: dateString[0],
                                    time_to: dateString[1]
                                })
                            }}
                        />
                        <Button type="primary" ghost style={{ marginRight: 16 }} loading={loading} onClick={() => this.order(type, time_from, time_to, tenant_name, page, page_size)}>搜索</Button>
                    </div>
                </div>
                <Order
                    type={type}
                    locale={{
                        emptyText: err || '暂无数据',
                    }}
                    loading={loading}
                    data={items.map((v, i) => ({ ...v, key: i }))}
                    pagination={{
                        total: Number(total || 0),
                        current: page,
                        pageSize: page_size,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onChange: (page, page_size) => this.order(type, time_from, time_to, tenant_name, page, page_size),
                        onShowSizeChange: (page, page_size) => this.order(type, time_from, time_to, tenant_name, page, page_size),
                        showTotal: total => `共 ${total} 条`,
                    }}
                />
            </div >
        )
    }
})