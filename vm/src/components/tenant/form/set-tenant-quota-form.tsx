import { PureComponent } from 'react';
import { Form, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormInput, { FormInputProps } from '@/components/global/forminput';

const FormItem = Form.Item;

export interface SetQuotaFormProps {
	data?: any;
	formItemLayout?: any;
	userSearch?: () => any;
}

@(FormInput({
	onValuesChange: ({ onChange = () => null }: any, _: any, allValues: any) => {
		onChange(allValues)
	}
}) as any)
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
		return (
			<Form style={{ height: "100%", overflow: "auto" }}>
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
			</Form>
		)
	}
}

export default SetQuotaForm;