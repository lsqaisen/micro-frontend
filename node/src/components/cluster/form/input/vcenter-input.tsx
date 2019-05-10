import { PureComponent, Fragment } from 'react';
import { Form, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';

const FormItem = Form.Item;

interface ValueType {
	name?: string,
	password?: string | undefined,
	url?: string | undefined,
}

export type VCenterProps = FormInputProps<ValueType>

@(FormInput as any)
class VCenterInput extends PureComponent<VCenterProps, any> {
	static readonly defaultProps: VCenterProps = {
		form: {} as any,
		value: {} as any
	}
	render() {
		const { value, form } = this.props;
		const { getFieldDecorator } = form;
		const { name, password, url } = (value as ValueType);
		return (
			<Fragment>
				<FormItem required>
					{getFieldDecorator('name', {
						initialValue: name,
						rules: [{ required: true, message: '用户名不能为空!' }]
					})(
						<Input placeholder="账户名" />
					)}
				</FormItem>
				<FormItem required>
					{getFieldDecorator('password', {
						initialValue: password,
						rules: [{ required: true, message: '用户密码不能为空!' }]
					})(
						<Input placeholder="密码" type="password" />
					)}
				</FormItem>
				<FormItem required>
					{getFieldDecorator('url', {
						initialValue: url,
						rules: [{ required: true, message: '集群地址不能为空!' }]
					})(
						<Input placeholder="URL" />
					)}
				</FormItem>
			</Fragment>
		)
	}
}

export default VCenterInput;