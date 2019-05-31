import { PureComponent, Fragment } from 'react';
import formInput, { FormInputProps } from '@/components/global/forminput';
import { HostMount } from '@/services/app';
import HostMountInput from './host-mount-input';
import InputBasic from '../input-basic';

export interface AddHostMountsProps extends FormInputProps<HostMount[]> {
  type?: 'create' | 'update' | 'edit';
}

@(formInput({
  name: 'hostMounts',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.hostMounts)
  }
}) as any)
export default class extends PureComponent<AddHostMountsProps, any>{
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
    onChange: () => null,
  };

  render() {
    const Action = ({ onClick }: any) => (
      <Fragment>
        <a key="add" onClick={onClick}>添加本地挂载卷</a>
      </Fragment>
    )
    return (
      <InputBasic<HostMount>
        {...this.props}
        title="本地挂载卷"
        name="hostMounts"
        btnText="添加本地挂载卷"
        grid={{
          title: { mountPath: '挂载路径', readOnly: '读写权限' },
          grid: {
            mountPath: { span: 19 },
            readOnly: { span: 5 }
          },
          transform: (key, value) => {
            if (key === 'readOnly') return value ? '只读' : '读写';
            return value;
          },
        }}
        input={HostMountInput}
        action={<Action />}
      />
    )
  }
}