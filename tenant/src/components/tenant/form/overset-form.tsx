import { PureComponent } from 'react';
import { Form, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export interface OverSetFormProps {
	over_set?: string | number;
	formItemLayout?: any;
}

@(Form.create() as any)
class OverSetForm extends PureComponent<FormComponentProps & OverSetFormProps, any> {
	static readonly defaultProps = {
		form: {},
		formItemLayout: {
			labelCol: { xs: 24, md: 5 },
			wrapperCol: { xs: 24, md: 19 },
		},
		over_set: '0.25',
	};

	render() {
		const { over_set, formItemLayout, form } = this.props;
		const { getFieldDecorator } = form;
		const style = {
			lineHeight: '26px',
			padding: `8px 0`,
			whiteSpace: `pre-line`,
		} as any;
		return (
			<Form>
				<FormItem
					{...formItemLayout}
					label="资源优先级">
					{getFieldDecorator('over_set', {
						initialValue: `${over_set}` || null,
						rules: [{ required: true, message: '必须指定资源优先级' }],
					})(
						<RadioGroup>
							<Radio style={style} value={`0.25`}>低：按照申请资源的25%分配，绝大部分资源都可以与其他租户共享，适用于不重要业务，核心业务慎用；</Radio>
							<Radio style={style} value={`0.5`}>中：按照申请资源的50%分配，空闲资源可以与其他租户共享，充分利用资源；</Radio>
							<Radio style={style} value={`0.75`}>高：按照申请资源的75%分配，空闲资源可以少量与其他租户共享；</Radio>
							<Radio style={style} value={`1`}>重要：按照申请资源的100%分配，空闲资源不与其他租户共享，适用于资源密集型业务；</Radio>
						</RadioGroup>
					)}
				</FormItem>
			</Form>
		)
	}
}

export default OverSetForm;