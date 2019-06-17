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
		return (
			isShow ?
				<Form>
					<FormItem
						{...formItemLayout}
						label="单Pod CPU核数">
						{getFieldDecorator('podCpu', {
							initialValue: setQuotaData.podCpu || '未设置',
							// rules: [{ required: true, message: '该项必须填写' }, { validator: check }],
						})(
							<Input size={'large'} readOnly="true" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="单Pod内存">
						{getFieldDecorator('podMem', {
							initialValue: setQuotaData.podMem || '未设置',
							// rules: [{ required: true, message: '该项必须填写' }, { validator: checkPodMem }],
						})(
							<Input size={'large'} readOnly="true" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="Pods总数">
						{getFieldDecorator('podNum', {
							initialValue: setQuotaData.podNum || '未设置',
							// rules: [{ required: true, message: '该项必须填写' }, { validator: check }],
						})(
							<Input size={'large'} readOnly="true" />
						)}
					</FormItem>
					<FormItem label='单存储最大容量：' {...formItemLayout}>
						{getFieldDecorator('volumeCap', {
							initialValue: setQuotaData.volumeCap || '未设置',
						})(<Input readOnly="true" />)}
					</FormItem>
					<FormItem label='存储卷上限：' {...formItemLayout}>
						{getFieldDecorator('volumeNum', {
							initialValue: setQuotaData.volumeNum || '未设置',
							// rules: [{ required: true, message: '该项必须填写' }, { validator: check }]
						})(<Input readOnly="true" />)}
					</FormItem>
					<FormItem label='最大存储总容量：' {...formItemLayout}>
						{getFieldDecorator('totalVolumeCap', {
							initialValue: setQuotaData.totalVolumeCap || '未设置',
							// rules: [{ required: true, message: '该项必须填写' }, { validator: checkTotalVolumeCap }]
						})(<Input readOnly="true" />)}
					</FormItem>
				</Form>
				:
				<Form>
					<FormItem
						{...formItemLayout}
						style={{ 'marginBottom': '12px' }}
						label="单Pod CPU核数">
						{getFieldDecorator('podCpu', {
							initialValue: setQuotaData.podCpu || '',
							rules: [{ required: true, message: '该项必须填写' }, { validator: checkCpu }],
						})(
							<Input size={'large'} placeholder="请输入" addonAfter="个" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						style={{ 'marginBottom': '12px' }}
						label="单Pod内存">
						{getFieldDecorator('podMem', {
							initialValue: parseInt(setQuotaData.podMem) || '',
							rules: [{ required: true, message: '该项必须填写' }, { validator: checkPodMem }],
						})(
							<Input size={'large'} placeholder="请输入" addonAfter="Gi" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						style={{ 'marginBottom': '12px' }}
						label="Pods总数">
						{getFieldDecorator('podNum', {
							initialValue: setQuotaData.podNum || '',
							rules: [{ required: true, message: '该项必须填写' }, { validator: check }],
						})(
							<Input size={'large'} placeholder="请输入" addonAfter="个" />
						)}
					</FormItem>
					<FormItem label='单存储最大容量：' {...formItemLayout} style={{ 'marginBottom': '12px' }}>
						{getFieldDecorator('volumeCap', {
							initialValue: parseInt(setQuotaData.volumeCap) || '',
							rules: [{ required: true, message: '该项必须填写' }, { validator: check }]
						})(<Input placeholder='请输入' addonAfter="Gi" />)}
					</FormItem>
					<FormItem label='存储卷上限：' style={{ 'marginBottom': '12px' }} {...formItemLayout}>
						{getFieldDecorator('volumeNum', {
							initialValue: setQuotaData.volumeNum || '',
							rules: [{ required: true, message: '该项必须填写' }, { validator: check }]
						})(<Input placeholder='请输入' addonAfter="个" />)}
					</FormItem>
					<FormItem label='最大存储总容量：' style={{ 'marginBottom': '12px' }} {...formItemLayout}>
						{getFieldDecorator('totalVolumeCap', {
							initialValue: parseInt(setQuotaData.totalVolumeCap) || '',
							rules: [{ required: true, message: '该项必须填写' }, { validator: checkTotalVolumeCap }]
						})(<Input placeholder='请输入' addonAfter="Gi" />)}
					</FormItem>
					{createSpace ? <FormItem
						style={{ 'marginBottom': '12px' }}
						{...formItemLayout}
						label="资源优先级">
						{getFieldDecorator('over_set', {
							initialValue: null,
							// rules: [{ required: true, message: '该项输入不能为空' }],
						})(
							<RadioGroup>
								<Radio style={radioStyle} value={`0.25`}>低：按照申请资源的25%分配，绝大部分资源都可以与其他租户共享，适用于不重要业务，核心业务慎用；</Radio>
								<Radio style={radioStyle} value={`0.5`}>中：按照申请资源的50%分配，空闲资源可以与其他租户共享，充分利用资源；</Radio>
								<Radio style={radioStyle} value={`0.75`}>高：按照申请资源的75%分配，空闲资源可以少量与其他租户共享；</Radio>
								<Radio style={radioStyle} value={`1`}>重要：按照申请资源的100%分配，空闲资源不与其他租户共享，适用于资源密集型业务；</Radio>
							</RadioGroup>
						)}
					</FormItem> : ''}
				</Form>
		)
	}
}

export default SetTenantOwner;