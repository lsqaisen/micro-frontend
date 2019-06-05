import * as React from 'react';
import { PureComponent } from 'react';
import formInput, { FormInputProps } from '@/components/global/forminput';
import { Volume } from '@/services/app';
import VolumeInput, { VolumeSearchHandles } from './volume-input';
import InputBasic from '../input-basic';

export interface AddVolumeInputsProps extends FormInputProps<Volume[]> {
  stateful: "none" | "share" | "exclusive";
  type?: 'create' | 'update' | 'edit';
}

@(formInput({
  name: 'volumes',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.volumes)
  }
}) as any)
export default class extends PureComponent<AddVolumeInputsProps & VolumeSearchHandles, any>{
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
    stateful: 'share',
    onChange: () => null,
  };

  render() {
    const { stateful, onPvcPoolSearch, onPvcSearch, ...props } = this.props;
    const Action = ({ onClick }: any) => (
      <a key="add" onClick={onClick}>添加网络挂载卷</a>
    )
    return (
      <InputBasic<Volume>
        {...props}
        title="网络挂载卷"
        name="volumes"
        btnText="添加网络挂载卷"
        grid={{
          title: stateful ? {
            claimName: '数据卷',
            mountPath: '挂载路径',
            readOnly: '读写权限'
          } : {
              pvcpool: '数据卷组',
              mountPath: '挂载路径',
              readOnly: '读写权限'
            },
          grid: {
            claimName: { span: 9 },
            pvcpool: { span: 9 },
            mountPath: { span: 10 },
            readOnly: { span: 5 }
          },
          transform: (key, value, data) => {
            let _value = stateful === 'share' ? (data.persistentVolumeClaim || {})[key] : (data.volumeClaimTemplate || {})[key];
            if (key === 'readOnly') return _value ? '只读' : '读写';
            return _value;
          },
        }}
        input={VolumeInput}
        inputProps={{ stateful, onPvcPoolSearch, onPvcSearch }}
        action={<Action />}
      />
    )
  }
}