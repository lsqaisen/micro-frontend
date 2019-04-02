import { Icon, Modal } from 'antd';
import Button, { BaseButtonProps } from 'antd/lib/button/button'

export type ActionProps = {
  status: string;
  always: string;
  onDel: () => void;
  onActive: () => void;
} & BaseButtonProps

export default ({ status, always, onDel, onActive, ...props }: ActionProps) => {
  let btnProps: any = {};
  switch (status) {
    case 'warning':
      btnProps = {
        loading: true,
        disabled: true,
        text: "正在启动",
      }
      break;
    case 'active':
      if (always) {
        btnProps = {
          loading: false,
          disabled: true,
          text: [<Icon key="icon" type="lock" />, "锁定，不可卸载"],
        }
      } else {
        btnProps = {
          loading: false,
          disabled: false,
          onClick: () => {
            Modal.confirm({
              title: `是否卸载插件！`,
              onOk: onDel,
            })
          },
          text: "卸载",
        }
      }
      break;
    case 'inactive':
      btnProps = {
        loading: false,
        disabled: false,
        onClick: () => {
          Modal.confirm({
            title: `是否激活插件！`,
            onOk: onActive,
          })
        },
        text: "激活",
      }
      break;
    case 'installing':
      btnProps = {
        loading: false,
        disabled: false,
        onClick: () => {
          Modal.confirm({
            title: `是否停止激活插件！`,
            onOk: onDel,
          })
        },
        text: "激活中，点击取消",
      }
      break;
    case 'uninstalling':
      btnProps = {
        loading: true,
        disabled: true,
        text: "卸载中",
      }
      break;
    default: break;
  }
  return (
    <Button {...props} {...btnProps}>{btnProps.text}</Button>
  )
}