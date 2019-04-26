import { Col } from 'antd';
import styles from './style/index.less';

export interface DescriptionProps {
  term: any,
  children: any,
  span?: string | number
}

export default ({ term, children, span = 12 }: DescriptionProps) => (
  <Col span={span}>
    <div className={styles.description}>
      <div className={styles.term}>{term}</div>
      <div className={styles.detail}>{children}</div>
    </div>
  </Col>
);