import { PureComponent, Fragment, cloneElement } from 'react';
import { Drawer, Table, Button, Icon } from 'antd';
import SearchSelect from '@/components/global/search-select';
import { getConfigMapRequest } from '@/services/configfile';

export interface ConfigSearchHandles {
  onCfgfileSearch: (search: getConfigMapRequest) => any;
}

export interface SelectConfigFileProps extends ConfigSearchHandles {
  type: 'env' | 'config';
  btn?: React.ReactNode;
  onChange: (value: any) => void;
}

class SelectConfigFile extends PureComponent<SelectConfigFileProps, any> {
  static readonly defaultProps = {
    onCfgfileSearch: () => null,
  }
  static readonly columns = [{
    title: '变量名',
    dataIndex: 'key',
  }, {
    title: '变量值',
    dataIndex: 'value',
  }];
  state = {
    visible: false,
    name: '',
    selectedRowKeys: [],
    data: [],
  }
  _onClose = (e: any) => {
    if (!!e) e.preventDefault();
    this.setState({
      visible: false,
    }, () => {
      const { name, data, selectedRowKeys } = this.state;
      if (this.props.type === 'config') {
        this.props.onChange(data
          .filter((v: any) => !!selectedRowKeys.find(key => v.key === key))
          .map((v: any) => {
            return {
              name,
              key: v.key,
              mountPath: undefined,
              path: undefined,
            }
          }));
      } else {
        this.props.onChange(data
          .filter((v: any) => !!selectedRowKeys.find(key => v.key === key))
          .map((v: any) => {
            return {
              name: v.key,
              value: v.value,
            }
          }));
      }
    })

  }

  onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { visible } = this.state;
    const { type = "env", btn, onCfgfileSearch } = this.props;
    const { data, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record: any) => ({
        disabled: type === 'env' ? record.value.split('\n').filter((v: any) => !!v).length > 1 : record.value.split('\n').filter((v: any) => !!v).length < 2,
      }),
    };
    return (
      <Fragment>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button style={{ width: "100%" }} type="dashed" onClick={() => { this.setState({ visible: true }) }}>读取挂载配置</Button>}
        <Drawer
          title="挂载配置"
          width={582}
          visible={visible}
          bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
          onClose={() => this.setState({ visible: false })}

        >
          <div style={{ padding: 16 }}>
            <SearchSelect
              style={{ maxWidth: '100%', width: 280 }}
              placeholder="选择配置选项"
              onSearch={(params: any = {}) => {
                const { page = 1, itemsPerPage = 10 }: any = params;
                let request: getConfigMapRequest = { page, itemsPerPage };
                return new Promise(async (resolve, reject) => {
                  let { data, total }: any = await onCfgfileSearch!(request);
                  resolve({
                    data: data.map((config: any) => ({
                      key: JSON.stringify({ [`${config.name}`]: config.formatData }),
                      label: `${config.name}`
                    })),
                    params: total <= itemsPerPage * page ? null : {
                      page: page + 1,
                      itemsPerPage,
                    }
                  })
                })
              }}
              onChange={(jsonData: any) => {
                let data = JSON.parse(jsonData);
                this.setState({ name: Object.keys(data)[0], data: Object.values(data)[0] })
              }}
            />
          </div>
          <Table
            rowSelection={rowSelection}
            columns={SelectConfigFile.columns}
            dataSource={data}
          />
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button disabled={selectedRowKeys.length <= 0} onClick={this._onClose} type="primary"> 确认 </Button>
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

export default SelectConfigFile;