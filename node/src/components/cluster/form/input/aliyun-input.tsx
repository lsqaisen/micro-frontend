import { PureComponent, Component, Fragment } from 'react';
import { Form, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/forminput';

const FormItem = Form.Item;

interface ValueType {
	key?: string,
	secret?: string,
}

export type AliyunProps = FormInputProps<ValueType>

@(FormInput as any)
class AliyunInput extends (PureComponent || Component)<AliyunProps, any> {
	static readonly defaultProps: AliyunProps = {
		form: {} as any,
		value: {} as any
	}
	render() {
		const { value, form } = this.props;
		const { getFieldDecorator } = form;
		const { key = '', secret = '' } = (value as ValueType) || {};
		return (
			<Fragment>
				<FormItem required>
					{getFieldDecorator('key', {
						initialValue: key,
						rules: [{ required: true, message: 'key不能为空！!' }]
					})(
						<Input placeholder="key" />
					)}
				</FormItem>
				<FormItem required>
					{getFieldDecorator('secret', {
						initialValue: secret,
						rules: [{ required: true, message: 'secret不能为空!' }]
					})(
						<Input placeholder="secret" />
					)}
				</FormItem>
			</Fragment>
		)
	}
}

export default AliyunInput;