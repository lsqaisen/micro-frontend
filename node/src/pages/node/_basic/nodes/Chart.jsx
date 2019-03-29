import styles from './style/Chart.less';
import { Charts } from '_global';

const { BarProgress } = Charts;

export default ({ max, value, ...props }) => {
    return (
        <div className={styles[`chart-box`]}>
            <div className={styles[`chart`]}>
                <BarProgress max={max} value={value}  {...props} />
            </div>
            <div className={styles[`value`]} >
                {value}%
            </div>
        </div>
    )
}