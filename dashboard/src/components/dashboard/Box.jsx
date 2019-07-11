import PropTypes from 'prop-types';
import styles from './style/index.less';
import EqualRatioBox from '../EqualRatioBox';

const Box = ({ className, title, extra, children, ...props }) => {
    return (
        <EqualRatioBox className={`${styles[`box`]} ${className || ''}`} {...props}>
            <div className={styles[`header`]}>
                <span className={styles[`title`]}>{title}</span>
                <span className={styles[`extra`]}>{extra}</span>
            </div>
            <div className={styles[`content`]}>
                {children}
            </div>
        </EqualRatioBox>
    )
}

Box.defaultProps = {
    title: '',
    extra: '',
}

Box.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default Box; 