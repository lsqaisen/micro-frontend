import { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Dropdown, Button } from 'antd';
import { createSelector } from 'reselect';
import Loading from '@/components/global/loading';
import Table from '@/components/app/table';
import AddApp from '@/components/app/add-app';
import { createAppRequest } from '@/services/app';
import Actions from './actions';

@connect(createSelector(
  [
    (props: any) => props.app.init,
    (props: any) => props.app.data,
    (props: any) => props.app.nodes,
    (props: any) => props.app.resources,
    (props: any) => props.app.images,
    (props: any) => props.app.imagetags,
    (props: any) => props.app.secrets,
    (props: any) => props.app.configmap,
    (props: any) => props.app.poollist,
    (props: any) => props.app.pvclist,
    (_: any, { stackName }: any) => stackName,
    (props: any) => props.loading.effects[`app/get`],
  ],
  (init, data, nodes, resources, images, imagetags, secrets, configmap, poollist, pvclist, stackName, loading) => ({
    init, data, nodes, resources, images, imagetags, secrets, configmap, poollist, pvclist, stackName, loading
  })
))
export default class extends PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'app/get' });
  }
  getNodes = (search: any) => {
    return this.props.dispatch({ type: 'app/nodes', payload: search });
  }
  getResources = (search: any) => {
    return this.props.dispatch({ type: 'app/resources', payload: search });
  }
  getImages = (search: any) => {
    return this.props.dispatch({ type: 'app/images', payload: search });
  }
  getImageTags = (search: any) => {
    return this.props.dispatch({ type: 'app/imagetags', payload: search });
  }
  getSecrets = (search: any) => {
    return this.props.dispatch({ type: 'app/secrets', payload: search });
  }
  getConfigMap = (search: any) => {
    return this.props.dispatch({ type: 'app/configmap', payload: search });
  }
  getPoolList = () => {
    return this.props.dispatch({ type: 'app/poollist' });
  }
  getPvcList = () => {
    return this.props.dispatch({ type: 'app/pvclist' });
  }
  create = (data: createAppRequest) => {
    return this.props.dispatch({
      type: 'app/create',
      payload: { ...data, stack: this.props.stackName },
    })
  }
  componentDidMount() {
    this.get()
  }
  render() {
    const { init, data, stackName, loading } = this.props;
    if (!init) return <Loading />;
    return (
      <div style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: '8px',
        boxShadow: `0 2px 8px rgba(0, 0, 0, 0.09)`,
      }}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
          </div>
          <div className="fr">
            <AddApp
              form={{} as any}
              btn={(
                <Dropdown.Button
                  type="primary"
                  onClick={() => { }}
                  overlay={(
                    <Menu onClick={() => { }}>
                      <Menu.Item key="1">
                        <Icon type="plus" /> 外部服务
                    </Menu.Item>
                      <Menu.Item key="2">
                        <Icon type="vertical-align-bottom" /> 导出服务
                    </Menu.Item>
                    </Menu>
                  )}>
                  <Icon type="plus" /> 添加服务
              </Dropdown.Button>
              )}
              onNodeSearch={(search: any) => {
                return new Promise(async (resolve) => {
                  await this.getNodes(search).then(() => {
                    const { nodes } = this.props;
                    resolve(nodes);
                  });
                })
              }}
              onResourceSearch={(search: any) => {
                return new Promise(async (resolve) => {
                  await this.getResources(search).then(() => {
                    const { resources } = this.props;
                    resolve(resources);
                  });
                })
              }}
              onImageSearch={(search: any) => {
                return new Promise(async (resolve) => {
                  await this.getImages(search).then(() => {
                    const { images } = this.props;
                    resolve(images);
                  });
                })
              }}
              onImageTagSearch={(search: any) => {
                return new Promise(async (resolve) => {
                  await this.getImageTags(search).then(() => {
                    const { imagetags } = this.props;
                    resolve(imagetags);
                  });
                })
              }}
              onSecretSearch={(search: any) => {
                return new Promise(async (resolve) => {
                  await this.getSecrets(search).then(() => {
                    const { secrets } = this.props;
                    resolve(secrets);
                  });
                })
              }}
              onCfgfileSearch={(search: any) => {
                return new Promise(async (resolve) => {
                  await this.getConfigMap(search).then(() => {
                    const { configmap } = this.props;
                    console.log(configmap)
                    resolve(configmap);
                  });
                })
              }}
              onPvcPoolSearch={() => {
                return new Promise(async (resolve) => {
                  await this.getPoolList().then(() => {
                    const { poollist } = this.props;
                    resolve(poollist);
                  });
                })
              }}
              onPvcSearch={() => {
                return new Promise(async (resolve) => {
                  await this.getPvcList().then(() => {
                    const { pvclist } = this.props;
                    resolve(pvclist);
                  });
                })
              }}
              onSubmit={this.create}
            />
          </div>
        </header>
        <Table
          loading={loading}
          list={data}
          actions={(
            <Actions
              {...{ stackName, dispatch: this.props.dispatch }}
              onUpdate={this.get}
            />
          )}
        />
      </div >
    )
  }
}