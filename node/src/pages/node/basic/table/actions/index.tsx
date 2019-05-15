import { Menu, Modal } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import styles from './style/index.less';


export default connect(createSelector(
  [
    (props: any) => !!props.loading.effects[`node/modifyStatus`],
  ],
  (modifyStatusLoading) => ({ modifyStatusLoading })
))(({ clusterName, resourceName, name, allocatable, dispatch }: any) => (
  <Menu
    className={styles.actions}
    onClick={({ key }) => {
      switch (key) {
        case "0":
          Modal.confirm({
            title: `主机${name}`,
            content: `是否${allocatable ? '开启调度' : '进行维护'}?`,
            okText: '是',
            cancelText: '否',
            onOk() {
              return new Promise(async (resolve, reject) => {
                const error: any = await dispatch({
                  type: 'node/modifyStatus',
                  payload: {
                    name,
                    allocatable: allocatable ? 'uncordon' : 'drain',
                  }
                });;
                if (!error) {
                  resolve()
                } else {
                  reject(error)
                }
              })
            },
          })
          return;
        case "1":
          return;
        case "2":
          Modal.confirm({
            title: `主机${name}`,
            content: `是否将主机${name}从资源池${resourceName}移除?`,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
              return new Promise(async (resolve, reject) => {
                console.log(name, clusterName, resourceName)
                const error: any = await dispatch({
                  type: 'resource/remove',
                  payload: { name, clusterName, resourceName }
                });;
                if (!error) {
                  resolve()
                } else {
                  reject(error)
                }
              })
            },
          })
          return;
      }
    }}>
    <Menu.Item key="0">{allocatable ? '开启调度' : '维护'}</Menu.Item>
    <Menu.Item key="1">资源池</Menu.Item>
    <Menu.Item key="2">移除</Menu.Item>
  </Menu>
))
