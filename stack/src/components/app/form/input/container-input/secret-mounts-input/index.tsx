import { PureComponent, Fragment } from 'react';
import formInput, { FormInputProps } from '@/components/global/forminput';
import { Mount } from '@/services/app';
import SecretMountInput from './secret-mount-input';
import InputBasic from '../input-basic';

export interface AddSecretMountsProps extends FormInputProps<Mount[]> {
  type?: 'create' | 'update' | 'edit';
}

@(formInput({
  name: 'secretMounts',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.secretMounts)
  }
}) as any)
export default class extends PureComponent<AddSecretMountsProps, any>{
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
    onChange: () => null,
  };

  render() {
    const Action = ({ onClick }: any) => (
      <Fragment>
        <a key="add" onClick={onClick}>添加证书挂载卷</a>
      </Fragment>
    )
    return (
      <InputBasic<Mount>
        {...this.props}
        width={582}
        title="证书挂载卷"
        name="secretMounts"
        btnText="添加证书挂载卷"
        grid={{
          title: { key: '证书选项', name: '证书名称', mountPath: '挂载路径', path: '指定挂载名称' },
          grid: {
            name: { span: 5 },
            key: { span: 5 },
            mountPath: { span: 7, offset: 1 },
            path: { span: 5, offset: 1 }
          },
          transform: (key, value) => value,
        }}
        input={SecretMountInput}
        action={<Action />}
      />
    )
  }
}