import { PureComponent } from 'react';
import { Form, Input, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SearchSelect from '@/components/global/search-select';

const FormItem = Form.Item;

export interface SetTenantOwnerProps {
	data?: any;
	formItemLayout?: any;
	userSearch?: () => any;
}

@(Form.create() as any)
class SetTenantOwner extends PureComponent<FormComponentProps & SetTenantOwnerProps, any> {
	static readonly defaultProps = {
		form: {},
		formItemLayout: {
			labelCol: { xs: 24, md: 5 },
			wrapperCol: { xs: 24, md: 19 },
		},
	};

	render() {
		const { data, formItemLayout, form, userSearch } = this.props;
		const { getFieldDecorator } = form;
		console.log(data)
		return (
			<Form >
				<FormItem
					{...formItemLayout}
					label="名称">
					<Input placeholder='请输入空间名称' disabled value={data.name} />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="管理员">
					{getFieldDecorator('owner_id', {
						initialValue: String(data.owner_id),
						rules: [{ required: true, message: '必须给空间设置管理员!' }],
					})(
						<SearchSelect
							initFirst={true}
							dropdownMatchSelectWidth={false}
							placeholder="选择管理员"
							onSearch={(params: any = {}) => {
								return new Promise(async (resolve) => {
									let response: any[] = await userSearch!();
									console.log(response)
									resolve({
										data: response.map((v: any) => ({
											key: `${v.user_id}`,
											label: (
												<Typography>
													<Typography.Text>{v.username}</Typography.Text>
													<Typography.Text type="secondary">{`<${v.email}>`}</Typography.Text>
												</Typography>
											)
										})),
										params: null
									})
								})
							}}
						/>
					)}
				</FormItem>
			</Form>
		)
	}
}

export default SetTenantOwner;