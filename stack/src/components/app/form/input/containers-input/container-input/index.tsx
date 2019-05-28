
import { PureComponent } from 'react';
import { Form, Switch, Select, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import { Container } from '@/services/app';

const Option = Select.Option;
const FormItem = Form.Item;

export interface ContainerInputProps extends FormInputProps<Container> {
	formItemLayout?: any;
}

@(FormInput() as any)
class ContainerInput extends PureComponent<ContainerInputProps, any> {
	static readonly defaultProps: ContainerInputProps = {
		form: {} as any,
		value: {
			protocol: 'TCP',
			servicePort: undefined,
			containerPort: undefined,
		} as any,
		formItemLayout: {
			labelCol: { xs: 24, md: 5 },
			wrapperCol: { xs: 24, md: 19 },
		}
	}

	render() {
		const { value, form, formItemLayout } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Form>
				<FormItem
					{...formItemLayout}
					label="容器名称"
					required>
					{getFieldDecorator('name', {
						initialValue: value!.name,
						validateFirst: true,
						rules: [
							{ required: true, message: '容器名称必须填写' },
						]
					})(
						<Input placeholder="请输入容器名称" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="镜像">
					{getFieldDecorator('image', {
						initialValue: value!.image,
						rules: [
							{ required: true, message: '镜像必须选择' },
							{ pattern: /^.+:.+$/, message: '必须选择镜像tag' },
						]
					})(
						// <ImagesSelect
						// 	imagesSearch={imagesSearch}
						// 	tagsSearch={tagsSearch}
						// />
						<Input />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="启动命令">
					{getFieldDecorator('command', {
						initialValue: value!.command,
					})(
						<Input placeholder="容器启动命令" />
					)}
				</FormItem>
				<div style={{ width: "50%", float: 'left' }}>
					<FormItem
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 18 }}
						label="-i(stdin)参数">
						{getFieldDecorator('stdin', {
							initialValue: value!.stdin,
						})(
							<Switch checkedChildren={'开'} unCheckedChildren={'关'} />
						)}
					</FormItem>
				</div>
				<div style={{ width: "50%", float: 'left' }}>
					<FormItem
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 18 }}
						label="-tty参数">
						{getFieldDecorator('tty', {
							initialValue: value!.tty,
						})(
							<Switch checkedChildren={'开'} unCheckedChildren={'关'} />
						)}
					</FormItem>
				</div>
			</Form>
		)
	}
}

export default ContainerInput;