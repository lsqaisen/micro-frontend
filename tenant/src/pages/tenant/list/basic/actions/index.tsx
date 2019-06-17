import * as React from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import DeleteTenant from '@/components/tenant/delete-tenant';

interface ActionsProps {
  data: any;
  update?: () => void;
  dispatch: React.Dispatch<any>
  onClick: (key: string) => void;
}

export default connect()(
  ({ data, update = () => null, dispatch, onClick, ...props }: ActionsProps) => {
    return (
      <React.Fragment>
        <Menu.Item {...props} onClick={() => onClick('edit')}>编辑</Menu.Item>
        <Menu.Divider {...props} />
        <Menu.Item {...props} onClick={() => onClick('quota')}>配额设置</Menu.Item>
        <Menu.Item {...props} onClick={() => onClick('owenr')}>管理员设置</Menu.Item>
        <Menu.Item {...props} onClick={() => onClick('overset')}>资源优先级</Menu.Item>
        <Menu.Divider {...props} />
        <DeleteTenant
          key="delete"
          data={data}
          btn={<Menu.Item {...props} style={{ color: '#ff5242' }} />}
          deleteCallback={update}
          onDelete={() => {
            return dispatch({
              type: `${MODEL}_tenant/delete`,
              payload: data.project_id
            })
          }}
        > 删除</DeleteTenant>
      </React.Fragment >
    )
  }
)
