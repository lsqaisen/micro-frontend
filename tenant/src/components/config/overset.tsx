import { PureComponent } from 'react';
import { Radio, Spin } from 'antd';

const RadioGroup = Radio.Group

export interface SmtpProps {
	loading: boolean;
	setting?: boolean;
	over_set: string;
	submit: (over_set: any) => any;
}

class Smtp extends PureComponent<SmtpProps, any> {
	render() {
		const { over_set, loading, submit } = this.props;
		const style = {
			lineHeight: '26px',
			padding: `8px 0`,
			whiteSpace: `pre-line`,
		} as any;
		return (
			<div>
				<h3 style={{
					paddingLeft: 8,
					padding: '4px 8px',
					marginBottom: 16,
					height: '30px',
					lineHeight: '22px',
					borderLeft: '3px solid #2B73F8'
				}}>
					<span style={{ float: 'left', marginRight: 16 }}>默认资源优先级</span>
					{!!over_set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span>}
				</h3>
				<Spin spinning={loading}>
					<RadioGroup value={over_set} onChange={(v) => submit({ over_set: v.target.value })}>
						<Radio style={style} value={`0.25`}>低：按照申请资源的25%分配，绝大部分资源都可以与其他租户共享，适用于不重要业务，核心业务慎用；</Radio>
						<Radio style={style} value={`0.5`}>中：按照申请资源的50%分配，空闲资源可以与其他租户共享，充分利用资源；</Radio>
						<Radio style={style} value={`0.75`}>高：按照申请资源的75%分配，空闲资源可以少量与其他租户共享；</Radio>
						<Radio style={style} value={`1`}>重要：按照申请资源的100%分配，空闲资源不与其他租户共享，适用于资源密集型业务；</Radio>
					</RadioGroup>
				</Spin>
			</div>
		);
	}
}

export default Smtp;