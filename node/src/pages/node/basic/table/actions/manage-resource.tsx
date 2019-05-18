import * as React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import ManageResource from '@/components/resource/manage-resource';
import RemoveNode from '@/components/resource/remove-node';

const Join = ({ dispatch, resourceName, names, onUpdate }: any) => (
  <Button type="primary"
    onClick={() => {
      dispatch({
        type: 'resource/join',
        payload: { resource: resourceName, names },
      }).then((error: any) => {
        if (!error) {
          onUpdate!()
        }
      })
    }}
  >加入</Button>
)

export default connect(createSelector(
  [
    (props: any) => props.loading.effects['node/nodes'] || props.loading.effects['resource/get'],
  ],
  (loading) => ({ loading })
))(({ visible, node, resourceName, allResources, loading, dispatch, onUpdate, onClose }: any) => {
  return (
    <ManageResource
      visible={visible}
      loading={loading}
      onClose={onClose}
      resources={node.resources || []}
      resourceName={resourceName}
      allResources={allResources}
      actions={[
        <RemoveNode
          nodeName={node.name}
          removeCallback={onUpdate}
          onRemove={(data) => {
            return dispatch({
              type: 'resource/remove',
              payload: data
            })
          }}
        >移除</RemoveNode>,
        <Join
          dispatch={dispatch}
          names={[node.name]}
          onUpdate={onUpdate}
        />
      ]}
    />
  )
})

