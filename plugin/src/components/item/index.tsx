import { Tag, Button, Tooltip, Modal } from 'antd';
import Action from './action';
import styles from './style/index.less';


const ItemTypes = ['grid', 'default'];
type ItemType = (typeof ItemTypes)[number]

export type ItemProps = {
  type?: ItemType | undefined;
  plugin: any;
  onActive: () => void;
  onDel: () => void;
}

function getImg(id: string) {
  let img = null;
  try {
    img = require(`../../public/plugins/${id}.png`)
  } catch (error) {
    img = require(`../../public/plugins/none.png`)
  }
  return img;
}

export default ({ type = 'default', plugin, onActive, onDel }: ItemProps) => {
  const { status, spec } = plugin;
  return (
    <div className={`${styles.item} ${styles[status]}`}>
      <h3 className={styles.title}>{spec.name}</h3>
      <div className={styles.top}>
        <div className={styles.desc}>
          <img className={styles.img} src={getImg(spec.id)} alt={spec.name} />
          {spec.intro}
        </div>
      </div>
      <div className={styles.action}>
        <Action
          type={status === "inactive" ? "primary" : undefined}
          className={`${styles.btn} ${styles[`btn-${status}${spec.always || ''}`]}`}
          status={status}
          always={spec.always}
          onActive={onActive}
          onDel={onDel}
        />
      </div>
    </div>
  )
}