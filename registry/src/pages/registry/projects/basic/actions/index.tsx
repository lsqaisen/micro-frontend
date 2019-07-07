import * as React from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import DeleteTenant from '@/components/project/delete';

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
        <Menu.Item {...props} onClick={() => onClick('owenr')}>设置管理员</Menu.Item>
        <Menu.Divider {...props} />
        <DeleteTenant
          key="delete"
          data={data}
          btn={<Menu.Item {...props} style={{ color: '#ff5242' }} />}
          deleteCallback={update}
          onDelete={() => {
            return dispatch({
              type: `${MODEL}_project/delete`,
              payload: data.project_id
            })
          }}
        > 删除</DeleteTenant>
      </React.Fragment >
    )
  }
)
