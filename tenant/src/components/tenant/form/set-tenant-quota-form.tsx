import { PureComponent } from 'react';
import { Form, Input, InputNumber, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SearchSelect from '@/components/global/search-select';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export interface SetQuotaFormProps {
	data?: any;
	formItemLayout?: any;
	userSearch?: () => any;
}

@(Form.create() as any)
class SetQuotaForm extends PureComponent<FormComponentProps & SetQuotaFormProps, any> {
	static readonly defaultProps = {
		data: {},
		form: {},
		formItemLayout: {
			labelCol: { xs: 24, md: 7 },
			wrapperCol: { xs: 24, md: 17 },
		},
	};

	render() {
		const { data, formItemLayout, form } = this.props;
		const { getFieldDecorator } = form;
		const style = {
			lineHeight: '26px',
			padding: `8px 0`,
			whiteSpace: `pre-line`,
		} as any;
		return (
			<Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
				<FormItem
					{...formItemLayout}
					label="单Pod CPU核数">
					{getFieldDecorator('podCpu', {
						initialValue: data.podCpu,
						rules: [{
							required: true, message: '不能为空'
						}],
					})(
						<InputNumber
							style={{ width: 280, maxWidth: '100%' }}
							placeholder="请输入CPU核数"
							min={1}
							max={1000}
							formatter={value => `${value}个`}
							parser={value => value!.replace('个', '')}
						/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="单Pod内存">
					{getFieldDecorator('podMem', {
						initialValue: data.podMem,
						rules: [{ required: true, message: '不能为空' }],
					})(
						<InputNumber
							style={{ width: 280, maxWidth: '100%' }}
							placeholder="请输入单Pod内存"
							min={1}
							max={64}
							formatter={value => `${value}Gi`}
							parser={value => value!.replace('Gi', '')}
						/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="Pods总数">
					{getFieldDecorator('podNum', {
						initialValue: data.podNum,
						rules: [{ required: true, message: '不能为空' }],
					})(
						<InputNumber
							style={{ width: 280, maxWidth: '100%' }}
							placeholder="请输入Pods总数"
							min={1}
							max={1000}
							formatter={value => `${value}个`}
							parser={value => value!.replace('个', '')}
						/>
					)}
				</FormItem>
				<FormItem
					label='单存储最大容量'
					{...formItemLayout}
				>
					{getFieldDecorator('volumeCap', {
						initialValue: data.volumeCap,
						rules: [{ required: true, message: '不能为空' }]
					})(
						<InputNumber
							style={{ width: 280, maxWidth: '100%' }}
							placeholder="请输入单存储最大容量"
							min={1}
							max={256}
							formatter={value => `${value}Gi`}
							parser={value => value!.replace('Gi', '')}
						/>
					)}
				</FormItem>
				<FormItem
					label='存储卷上限'
					{...formItemLayout}
				>
					{getFieldDecorator('volumeNum', {
						initialValue: data.volumeNum,
						rules: [{ required: true, message: '该项必须填写' }]
					})(
						<InputNumber
							style={{ width: 280, maxWidth: '100%' }}
							placeholder="请输入存储卷上限"
							min={1}
							max={1000}
							formatter={value => `${value}个`}
							parser={value => value!.replace('个', '')}
						/>
					)}
				</FormItem>
				<FormItem
					label='最大存储总容量'
					{...formItemLayout}
				>
					{getFieldDecorator('totalVolumeCap', {
						initialValue: data.totalVolumeCap,
						rules: [{ required: true, message: '该项必须填写' }]
					})(
						<InputNumber
							style={{ width: 280, maxWidth: '100%' }}
							placeholder="请输入单存储最大容量"
							min={1}
							max={1000000}
							formatter={value => `${value}Gi`}
							parser={value => value!.replace('Gi', '')}
						/>
					)}
				</FormItem>
				{false ? <FormItem
					{...formItemLayout}
					label="资源优先级">
					{getFieldDecorator('over_set')(
						<RadioGroup>
							<Radio style={style} value={`0.25`}>低：按照申请资源的25%分配，绝大部分资源都可以与其他租户共享，适用于不重要业务，核心业务慎用；</Radio>
							<Radio style={style} value={`0.5`}>中：按照申请资源的50%分配，空闲资源可以与其他租户共享，充分利用资源；</Radio>
							<Radio style={style} value={`0.75`}>高：按照申请资源的75%分配，空闲资源可以少量与其他租户共享；</Radio>
							<Radio style={style} value={`1`}>重要：按照申请资源的100%分配，空闲资源不与其他租户共享，适用于资源密集型业务；</Radio>
						</RadioGroup>
					)}
				</FormItem> : ''}
			</Form>
		)
	}
}

export default SetQuotaForm;