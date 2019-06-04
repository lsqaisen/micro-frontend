import { PureComponent, Fragment } from 'react';
import formInput, { FormInputProps } from '@/components/global/forminput';
import { Mount } from '@/services/app';
import ConfigMountInput from './config-mount-input';
import InputBasic from '../input-basic';
import { ConfigSearchHandles } from '../select-configfile';

export interface AddConfigMountsProps extends FormInputProps<Mount[]> {
  type?: 'create' | 'update' | 'edit';
}

@(formInput({
  name: 'configMounts',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.configMounts)
  }
}) as any)
export default class extends PureComponent<AddConfigMountsProps & ConfigSearchHandles, any>{
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
    onChange: () => null,
  };

  render() {
    const { ...props } = this.props;
    const Action = ({ onClick }: any) => (
      <Fragment>
        <a onClick={onClick}>添加配置项</a>
      </Fragment>
    )
    return (
      <InputBasic<Mount>
        {...props}
        width={582}
        selectType="config"
        title="配置选项"
        name="configMounts"
        btnText="添加配置项"
        grid={{
          title: { key: '配置选项', name: '配置名称', mountPath: '挂载路径', path: '文件名称' },
          grid: {
            name: { span: 5 },
            key: { span: 5 },
            mountPath: { span: 7, offset: 1 },
            path: { span: 5, offset: 1 }
          },
          transform: (key, value) => value,
        }}
        input={ConfigMountInput}
        action={<Action />}
      />
    )
  }
}