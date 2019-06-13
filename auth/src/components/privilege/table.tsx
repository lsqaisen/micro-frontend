import { PureComponent } from 'react';
import { Tree, Spin } from 'antd';
const TreeNode = Tree.TreeNode;

export enum PrivilegeType {
  '全局' = 1, '主机管理', '应用管理', '应用市场', '存储', '镜像管理', '网络', '日志', '监控告警', '认证授权', '空间', '容器主机',
}

interface TreeData {
  label: string | number | React.ReactNode,
  value: string | number | React.ReactNode,
  key: string,
  title: string | number | React.ReactNode,
  children?: TreeData[]
}

interface PrivilegeData {
  creation_time: string;
  description: string;
  is_builtin: boolean;
  joint_id: number;
  module_id: number;
  name: string;
  verb: string;
}

export interface PrivilegeTableProps {
  loading: boolean;
  privileges: PrivilegeData[];
  data: PrivilegeData[];
}

function renderTreeNodes(data: TreeData[]) {
  return data.map((item) => {
    if (!!item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
}

export function transition(data: PrivilegeData[]) {
  let treeData = [];
  let prilist: { [key: string]: TreeData[] } = {};
  data.forEach(item => {
    const obj = {
      label: item.name,
      value: item.joint_id,
      key: `${item.joint_id}`,
      title: item.description,
    }
    if (prilist[item['module_id']]) {
      prilist[item['module_id']].push(obj)
    } else {
      prilist[item['module_id']] = [obj];
    }
  });
  const other: TreeData = {
    label: '其他',
    value: "其他",
    key: "其他",
    title: "其他",
    children: []
  }
  Object.keys(prilist).map(v => {
    const type = PrivilegeType[Number(v)];
    if (type) {
      treeData.push({
        label: type,
        value: type,
        key: type,
        title: type,
        children: prilist[v]
      })
    } else {
      other.children = other.children!.concat(prilist[v])
    }
  })
  if (other.children!.length) {
    treeData.push(other)
  }
  return treeData;
}

class PriTree extends PureComponent<PrivilegeTableProps, any> {
  state = {
    treeData: [],
    remove_privileges: [] as string[],
    autoExpandParent: true,
  }

  onCheck = (checkedKeys: string[]) => {
    this.setState({
      remove_privileges: this.props.data.filter(v => checkedKeys.indexOf(`${v.joint_id}`) == -1).map(v => `${v.joint_id}`)
    })
  }

  UNSAFE_componentWillReceiveProps({ data }: PrivilegeTableProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(data)) {
      this.setState({ treeData: transition(this.props.data) })
    }
  }

  componentDidMount() {
    this.setState({ treeData: transition(this.props.data) })
  }

  render() {
    const { privileges, loading } = this.props;
    const { treeData, autoExpandParent, remove_privileges } = this.state;

    return <Spin spinning={loading}>
      <Tree
        multiple
        checkable
        autoExpandParent={autoExpandParent}
        checkedKeys={privileges.filter(v => remove_privileges.indexOf(`${v.joint_id}`) == -1).concat(privileges).map(v => `${v.joint_id}`)}
        onCheck={this.onCheck as any}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </Spin>
  }
}


export default PriTree;