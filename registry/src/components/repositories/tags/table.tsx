import * as React from 'react';
import { PureComponent } from 'react';
import Time from 'react-time-format';
import { ColumnProps } from 'antd/lib/table';
import { Table, EllipsisTooltip } from 'library';

interface ITag {
	key: number;
	domain: string;
	project_public: boolean;
	pull_count: number;
	repository_id: number;
	repository_name: string;
	tags: string[];
	tags_count: number;
}

interface TagTableData {
	total: number;
	list?: ITag[];
}

export type TagProps = {
	users: any[];
	data: TagTableData;
	loading: boolean;
	openTags: (params: any) => void;
}

class Tags extends PureComponent<TagProps, any> {
	columns: ColumnProps<ITag>[] = [{
		title: '镜像版本',
		dataIndex: 'tag',
		onCell: () => ({
			style: {
				whiteSpace: 'nowrap',
				maxWidth: 156,
				minWidth: 82,
				cursor: 'pointer',
			}
		}),
		onCellClick: this.props.openTags,
		render: (t) => <EllipsisTooltip title={t}><a href="#" onClick={(e) => e.preventDefault()}>{t}</a></EllipsisTooltip>,
	}, {
		title: '最近使用时间',
		dataIndex: 'update_time',
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
		title: '镜像ID (SHA256)',
		dataIndex: 'digest',
		width: 266,
		onCell: () => ({
			style: {
				whiteSpace: 'nowrap',
				maxWidth: 286,
				minWidth: 116,
			}
		}),
		render: (t, r, i) => {
			return (
				<EllipsisTooltip title={t}>{t}</EllipsisTooltip>
			)
		},
	}, {
		title: '大小',
		dataIndex: 'size',
		width: 116,
		onCell: () => ({
			style: {
				whiteSpace: 'nowrap',
				maxWidth: 186,
				minWidth: 116,
			}
		}),
	}];
	render() {
		const { loading, data, children, ...props } = this.props;
		const { list, total } = data;
		return (
			<Table<ITag>
				{...props}
				pagination={{ total: Number(total) }}
				loading={loading}
				columns={this.columns}
				dataSource={list!.map((v: ITag) => ({ key: v.repository_id, ...v }))}
			>
				{children}
			</Table>
		)
	}
}

export default Tags;