
import { PureComponent } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export interface EdutTenantFormProps {
	data?: any;
	formItemLayout?: any;
}

@(Form.create() as any)
class EdutTenantForm extends PureComponent<FormComponentProps & EdutTenantFormProps, any> {
	static readonly defaultProps = {
		form: {},
		formItemLayout: {
			labelCol: { xs: 24, md: 5 },
			wrapperCol: { xs: 24, md: 19 },
		},
	};

	render() {
		const { data, formItemLayout, form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Form >
				<FormItem
					{...formItemLayout}
					label="名称">
					<Input placeholder='请输入空间名称' disabled value={data.name} />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="备注">
					{getFieldDecorator('description', {
						initialValue: data.description,
						rules: [{ max: 500, message: '最多500个字符!' }],
					})(
						<TextArea placeholder='请输入空间描述' />
					)}
				</FormItem>
			</Form>
		)
	}
}

export default EdutTenantForm;