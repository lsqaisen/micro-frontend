import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { ColumnProps, TableProps } from 'antd/lib/table';
import Time from 'react-time-format';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';

interface IAudit {
	key: number;
	createTime: string;
	desc: string;
	httpCode: number;
	id: number;
	module: string;
	namespace: string;
	object: string;
	reqBody: string;
	reqURL: string;
	respBody: string;
	type: string;
	userName: string;
}

export interface AuditProps extends TableProps<IAudit> {
	type?: number,
	data: IAudit[];
	loading: boolean;
	actions: React.ReactNode | (() => React.ReactNode);
}

class Audit extends PureComponent<AuditProps, any> {
	state = {
		selectIndex: 0,
		visible: false,
	}
	columns: ColumnProps<IAudit>[] = [
		{
			title: '操作模块',
			dataIndex: 'module',
			width: 126,
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					maxWidth: 96,
				}
			}),
			render: (t, r, i) => {
				return (
					<EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>
				)
			},
		}, {
			title: '操作类型',
			dataIndex: 'type',
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					minWidth: 78,
					maxWidth: 116,
				}
			}),
			render: (t, r, i) => {
				return (
					<EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>
				)
			},
		}, {
			title: '操作对象',
			dataIndex: 'object',
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					minWidth: 78,
					maxWidth: 116,
				}
			}),
			render: (t, r, i) => {
				return (
					<EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>
				)
			},
		}, {
			title: '操作时间',
			dataIndex: 'createTime',
			width: 136,
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					minWidth: 78,
					maxWidth: 136,
				}
			}),
			render: (t, r, i) => <Time value={new Date(t)} format="YYYY-MM-DD  HH:mm" />,
		}, {
			title: '操作者',
			dataIndex: 'auditName',
			width: 116,
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					minWidth: 64,
					maxWidth: 116,
				}
			}),
			render: (t, r, i) => {
				return (
					<EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>
				)
			},
		}, {
			title: '操作空间',
			dataIndex: 'namespace',
			width: 126,
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					minWidth: 78,
					maxWidth: 136,
				}
			}),
			render: (t, r, i) => {
				return (
					<EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>
				)
			},
		}, {
			title: '状态码',
			dataIndex: 'httpCode',
			width: 64,
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					minWidth: 64,
					maxWidth: 64,
				}
			}),
			render: (t, r, i) => {
				return (
					<span style={{
						color: String(t).startsWith('1') ||
							String(t).startsWith('2') ||
							String(t).startsWith('3') ? '#00cc00' : '#ff0000'
					}}>{t}</span>
				)
			},
		}, {
			title: '操作详情',
			dataIndex: 'desc',
			onCell: () => ({
				style: {
					whiteSpace: 'nowrap',
					maxWidth: 96,
				}
			}),
			render: (t, r, i) => {
				return (
					<EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>
				)
			},
		}, {
			title: '操作',
			dataIndex: '',
			fixed: 'right',
			width: 84,
			className: "tc",
			onCell: () => {
				return {
					style: {
						minWidth: 84,
					}
				}
			},
			render: (_, r, i) => (
				<a className="ant-dropdown-link" href="#" onClick={(e) => {
					e.preventDefault();
					this.setState({ visible: true, selectIndex: i });
				}}>
					详情
			</a>
			),
		}
	];
	render() {
		const { loading, data, actions, children, ...props } = this.props;
		const { selectIndex, visible } = this.state;
		return (
			<Fragment>
				<Table<IAudit>
					loading={loading}
					columns={this.columns}
					dataSource={data!.map((v: IAudit, i: number) => ({ key: i, ...v }))}
					{...props}
				/>
				{children && React.cloneElement(children as any, {
					visible,
					audit: data![selectIndex] || {},
					onClose: () => { this.setState({ selectIndex: 0, visible: false }) },
				})}
			</Fragment>
		)
	}
}

export default Audit;

