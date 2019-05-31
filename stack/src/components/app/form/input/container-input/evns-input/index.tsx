import { PureComponent, Fragment } from 'react';
import { Divider } from 'antd';
import formInput, { FormInputProps } from '@/components/global/forminput';
import { Env } from '@/services/app';
import EnvInput from './env-input';
import InputBasic from '../input-basic';

export interface AddEvnsProps extends FormInputProps<Env[]> {
  type?: 'create' | 'update' | 'edit';
}

@(formInput({
  name: 'envs',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.envs)
  }
}) as any)
export default class extends PureComponent<AddEvnsProps, any>{
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
    onChange: () => null,
  };

  render() {
    const { value } = this.props;
    const Action = ({ onClick }: any) => (
      <Fragment>
        <a key="add" onClick={onClick}>编辑</a>
        {(value! || []).length <= 0 && <Fragment>
          <Divider type="vertical" />
          <a key="load" onClick={(e) => {
            e.preventDefault();
            this.setState({ visible: true });
          }}>读取配置</a>
        </Fragment>}
      </Fragment>
    )
    return (
      <InputBasic<Env>
        {...this.props}
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