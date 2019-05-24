import { PureComponent, Fragment } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CpuInput from './cpu-input';
import MemInput from './mem-input';

const FormItem = Form.Item;

export interface CpuMemInputProps extends FormComponentProps {
	value?: { cpu: number, memory: number };
	formItemLayout?: any;
	sourceGroup?: any;
}

class CpuMemInput extends PureComponent<CpuMemInputProps, any> {
	static readonly defaultProps: CpuMemInputProps = {
		form: {} as any,
		formItemLayout: {
			labelCol: { xs: 24, md: 5 },
			wrapperCol: { xs: 24, md: 19 },
		},
		value: { cpu: 500, memory: 128 },
		sourceGroup: [
			{
				cpu: 500,
				memory: [128, 256, 512, 1000],
			}, {
				cpu: 1000,
				memory: [256, 512, 1000, 2000, 4000],
			}, {
				cpu: 2000,
				memory: [512, 1000, 2000, 4000, 8000],
			}, {
				cpu: 4000,
				memory: [512, 1000, 2000, 4000, 8000, 16000],
			}, {
				cpu: 8000,
				memory: [1000, 2000, 4000, 8000, 16000, 32000],
			}, {
				cpu: 16000,
				memory: [8000, 16000, 32000, 64000],
			}, {
				cpu: 32000,
				memory: [16000, 32000, 64000, 128000],
			}, {
				cpu: 64000,
				memory: [32000, 64000, 128000, 256000],
			},
		],
	}
	render() {
		const { value, sourceGroup, formItemLayout, form: { getFieldDecorator, setFieldsValue } } = this.props;
		const { cpu = 500, memory = 128 } = value!;
		const memDataSource = (sourceGroup.find((v: any) => v.cpu === cpu) || { memory: [128, 256, 512, 1000] }).memory;
		return (
			<Fragment>
				<FormItem
					{...formItemLayout}
					label="CPU核数"
					required>
					{getFieldDecorator('cpu', {
						initialValue: cpu,
					})(
						<CpuInput
							onChange={(cpu) => {
								const memory = (sourceGroup.find((v: any) => v.cpu === cpu) || { memory: [128, 256, 512, 1000] }).memory[0];
								setFieldsValue({ cpu, memory })
							}}
						/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="内存容量"
					required>
					{getFieldDecorator('memory', {
						initialValue: memory,
					})(
						<MemInput dataSource={memDataSource} />
					)}
				</FormItem>
			</Fragment>
		)
	}
}

export default CpuMemInput;