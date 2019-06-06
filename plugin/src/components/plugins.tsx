import { List } from 'antd';
import Link from 'umi/link';
import Action from './item/action';
import Progress from './progress';
import styles from './style/plugins.less';

export type ItemProps = {
  plugins: any[];
  onActive: (id: string) => void;
  onDel: (id: string) => void;
}

function getImg(id: string) {
  let img = null;
  try {
    img = require(`../public/plugins/${id}.png`)
  } catch (error) {
    img = require(`../public/plugins/none.png`)
  }
  return img;
}

export default ({ plugins, onActive, onDel }: ItemProps) => {
  return (
    <List
      className={styles.plugins}
      itemLayout="horizontal"
      dataSource={plugins}
      renderItem={({ spec, status }) => (
        <List.Item
          className={styles[status]}
          actions={[
            <Action
              type={status === "inactive" ? "primary" : undefined}
              className={`${styles.btn} ${styles[`btn-${status}${spec.always || ''}`]}`}
              status={status}
              always={spec.always}
              onActive={async () => await onActive(spec.id)}
              onDel={async () => await onDel(spec.id)}
            />
          ]}>
          <Progress
            statusType={status}
            show={status !== 'inactive' && status !== 'active'}
          />
          <List.Item.Meta
            avatar={<img className={styles.img} src={getImg(spec.id)} alt={spec.name} />}
            title={status === "active" ? <Link to={`/${spec.id}`}>{spec.name}（{spec.id}）</Link> : `${spec.name}（${spec.id}）`}
            description={spec.intro}
          />
        </List.Item>
      )}
    />
  )
}