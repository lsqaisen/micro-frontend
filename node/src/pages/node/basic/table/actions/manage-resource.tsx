import * as React from 'react';
import { Drawer, List, Button, Modal, Tag } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import reomve from '@/components/resource/remove-node';

export default connect(createSelector(
  [
    (props: any) => props.loading.effects['node/nodes'] || props.loading.effects['resource/get'],
  ],
  (loading) => ({ loading })
))(class extends React.PureComponent<any, any> {
  state = {
    visible: false,
  }
  render() {
    const { node: { name, resources }, resourceName, allResources, loading, dispatch, onUpdate } = this.props;
    const { visible } = this.state;
    return (
      <React.Fragment>
        <span onClick={() => this.setState({ visible: true })}>资源池</span>
        <Drawer
          visible={visible}
          title="资源池管理"
          width={500}
          placement="right"
          onClose={() => this.setState({ visible: false })}
        >
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={allResources}
            renderItem={(item: any) => (
              <List.Item actions={[
                resources.indexOf(item.name) !== -1 ?
                  <Button type="danger" onClick={() => {
                    reomve({
                      nodeName: name,
                      resourceName: item.name,
                      onOk() {
                        return new Promise(async (resolve, reject) => {
                          dispatch({
                            type: 'resource/remove',
                            payload: { name, resource: item.name }
                          }).then((error: any) => {
                            if (!error) {
                              onUpdate!()
                              resolve()
                            } else {
                              reject(error)
                            }
                          })
                        })
                      },
                    });
                  }}>移除</Button> :
                  <Button type="primary"
                    onClick={() => {
                      dispatch({
                        type: 'resource/join',
                        payload: { resource: item.name, names: [name] },
                      }).then((error: any) => {
                        if (!error) {
                          onUpdate!()
                        }
                      })
                    }}
                  >加入</Button>
              ]}>
                <List.Item.Meta
                  title={<React.Fragment>
                    {item.name === resourceName && <Tag color="#87d068">当前</Tag>}
                    {`${item.tag}(${item.name})`}
                  </React.Fragment>}
                  description={item.desc}
                />
              </List.Item >
            )}
          />
        </Drawer>
      </React.Fragment>
    )
  }
})