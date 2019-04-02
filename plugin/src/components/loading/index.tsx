import React from 'react';
import classNames from 'classnames';
import styles from './style/loading.less';

type LoadingProps = {
	spinning: boolean,
	fullScreen: boolean,
}

const Loading = (props: LoadingProps) => {
	const { spinning, fullScreen } = props;
	return (
		<div
			className={classNames(styles.loader, {
				[styles.hidden]: !spinning,
				[styles.fullScreen]: fullScreen,
			})}
		>
			<div className={styles.warpper}>
				<div className={styles.inner} />
				<div className={styles.text}>LOADING</div>
			</div>
		</div>
	)
}

Loading.defaultProps = {
	spinning: true,
	fullScreen: false,
}

export default Loading
