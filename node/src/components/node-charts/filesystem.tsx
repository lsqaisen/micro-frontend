import { PureComponent, Component } from 'react';
import { PageHeader, Statistic } from 'antd';
import basic, { BasicProps } from './basic';

export interface FileSystemProps extends BasicProps {
  timeMask: string
}

@basic
class FileSystem extends (PureComponent || Component)<FileSystemProps, any> {
  render() {
    const { total, used } = this.props;
    return (
      <PageHeader style={{ padding: 0 }} title="磁盘使用情况">
        <Statistic
          title="磁盘使用量"
          value={window.Number((used || 0)).flowCeil(1)}
          suffix={`(${window.Number(Number((used || 0) / (total || -1) * 100).toFixed(1))}%)/ ${window.Number((total || 0)).flowCeil(1)}`}
        />
      </PageHeader>
    )
  }
}

export default FileSystem;