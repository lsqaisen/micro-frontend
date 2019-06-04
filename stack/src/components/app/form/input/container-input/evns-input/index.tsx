import { PureComponent, Fragment } from 'react';
import { Divider } from 'antd';
import formInput, { FormInputProps } from '@/components/global/forminput';
import { Env } from '@/services/app';
import EnvInput from './env-input';
import InputBasic from '../input-basic';
import { ConfigSearchHandles } from '../select-configfile';

export interface AddEvnsProps extends FormInputProps<Env[]> {
  type?: 'create' | 'update' | 'edit';
}

@(formInput({
  name: 'envs',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.envs)
  }
}) as any)
export default class extends PureComponent<AddEvnsProps & ConfigSearchHandles, any>{
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
    onChange: () => null,
  };

  render() {
    const Action = ({ onClick }: any) => (
      <Fragment>
        <a key="add" onClick={onClick}>编辑环境变量</a>
      </Fragment>
    )
    return (
      <InputBasic<Env>
        {...this.props}
        selectType="env"
        title="环境变量"
        name="envs"
        btnText="添加环境变量"
        grid={{
          title: { name: '变量名', value: '值' },
          grid: {
            name: { span: 12 },
            value: { span: 11, offset: 1 }
          },
          transform: (key, value) => value,
        }}
        input={EnvInput}
        action={<Action />}
      />
    )
  }
}