import styles from './style/Resource.less';
import { Radio, Button, Tooltip } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import CreateResource from './CreateResource';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default ({ data, type, onCreate, onDelete, ...props }) => {
    return (
        <div className={styles[`resource`]} >
            <div className={styles[`options`]}>
                <TweenOneGroup
                    {...props}
                    component={RadioGroup}
                    enter={[
                        { width: 0, duration: 200, delay: 200, type: 'from', ease: 'easeOutQuad', },
                    ]}
                    leave={[
                        { width: 0, duration: 250, delay: 200, ease: 'easeOutQuad' },
                    ]}
                    appear={false}>
                    <RadioButton value="">所有资源</RadioButton>
                    {(data || []).map(v => (
                        <RadioButton key={v.name} value={v.name}>{v.tag}</RadioButton>
                    ))}
                </TweenOneGroup>
            </div>
            <div className={styles[`actions`]}>
                <CreateResource onSubmit={onCreate}>
                    <Button size="default" type="primary" ghost>添加资源池</Button>
                </CreateResource>
                {type === '$all' ? null :
                    type === 'builtin' ?
                        <Tooltip title="内置资源池不可被删除！" placement="topRight">
                            <Button disabled={type === 'builtin'} size="default" type="danger" ghost >删除</Button>
                        </Tooltip> :
                        <Button disabled={type === 'builtin'} size="default" type="danger" ghost onClick={onDelete} >删除</Button>}
            </div>
        </div>
    )
}