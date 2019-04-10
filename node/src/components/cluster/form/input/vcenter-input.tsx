import { PureComponent, Component, Fragment } from 'react';
import { Form, Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import { FormComponentProps } from 'antd/lib/form'

const FormItem = Form.Item;

type ValueType = {
	name?: string | undefined,
	password?: string | undefined,
	url?: string | undefined,
}

@(Form.create({
	onFieldsChange: (props, fields) => {
		console.log(props, fields)
	},
	onValuesChange: ({ onChange = (v: any) => { } }: InputProps, changedValues, allValues) => {
		
		onChange(Object.assign({}, changedValues, allValues) as any);
	}
}) as any)
class VCenterInput extends (PureComponent || Component)<InputProps & FormComponentProps & any, any> {
	render() {
		const { value = {}, form } = this.props;
		const { getFieldDecorator } = form;
		const { name = undefined, password = undefined, url = undefined } = (value as ValueType) || {};
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