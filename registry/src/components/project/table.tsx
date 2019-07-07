import * as React from 'react';
import { PureComponent } from 'react';
import { Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Link from 'umi/link';
import Time from 'react-time-format';
import { Table, EllipsisTooltip } from 'library';

interface IProject {
  key: number;
  OldOwnerID: number;
  administrator: boolean;
  creation_time: string;
  deleted: number;
  description: string;
  name: string;
  owner_id: number;
  owner_name: string;
  project_id: number;
  public: number;
  repo_count: number;
  type: number;
  update_time: string;
}

interface ProjectTableData {
  total: number;
  list?: IProject[];
}

export type ProjectProps = {
  users: any[];
  data: ProjectTableData;
  loading: boolean;
  actions: React.ReactNode | (() => React.ReactNode);
}

class Project extends PureComponent<ProjectProps, any> {
  columns: ColumnProps<IProject>[] = [{
    title: '仓库名称',
    dataIndex: 'name',
    width: 186,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 156,
        minWidth: 82,
      }
    }),
    render: (t, r, i) => {
      const text = r.administrator ? <Link to={`/registry/repositories?project_id=${r.project_id}&project_name=${t}`}>{t}</Link> : <span>{t}</span>
      return (
        <EllipsisTooltip title={t}>{text}</EllipsisTooltip>
      )
    },
  }, {
    title: '管理员',
    dataIndex: 'owner_name',
    width: 116,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 116,
        minWidth: 64,
      }
    }),
    render: (t, r, i) => {
      const text = r.owner_id ? t || (this.props.users.find(user => user.user_id === r.owner_id) || { username: '暂未设置' }).username : '暂未设置';
      return (
        <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
      )
    },
  }, {
    title: '备注',
    dataIndex: 'description',
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 186,
        minWidth: 116,
      }
    }),
    render: (t, r, i) => {
      return (
        <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
      )
    },
  }, {
    title: '仓库类型',
    dataIndex: 'public',
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 186,
        minWidth: 116,
      }
    }),
    render: (t) => {
      const text = t === 1 ? <span><Icon type="share-alt" />公共仓库</span> : <span><Icon type="lock" />私有仓库</span>;
      return (
        <EllipsisTooltip title={t}>{text}</EllipsisTooltip>
      )
    },
  }, {
    title: '更新时间',
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
  }];
  render() {
    const { loading, data, actions, children, ...props } = this.props;
    const { list, total } = data;
    return (
      <Table<IProject>
        {...props}
        actions={actions}
        pagination={{ total: Number(total) }}
        loading={loading}
        columns={this.columns}
        dataSource={list!.map((v: IProject) => ({ key: v.project_id, ...v }))}
      >
        {children}
      </Table>
    )
  }
}

export default Project;