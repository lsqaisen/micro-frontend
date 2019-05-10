import React, { PureComponent } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import * as ReactDOM from 'react-dom';
import styles from './style/index.less';

const AxisTypes = ['left', 'right', 'center'];
type AxisType = (typeof AxisTypes)[number]
export type FlipCardItemProps = {
  className?: string,
  duration?: number;
  axis?: AxisType;
  front?: boolean;
  back?: boolean;
  flipTimes?: number;
}

class FlipCardItem extends PureComponent<FlipCardItemProps, any> {
  static defaultProps = {
    className: ''
  }
  setParentSize = (e: HTMLElement, width: number, height: number) => {
    if (e && width && height) {
      e.style.width = `${width}px`;
      e.style.height = `${height}px`;
    }
  }
  componentWillReceiveProps({ front, duration, axis }: FlipCardItemProps) {
    const { front: _front } = this.props;
    let e = (ReactDOM.findDOMNode(this) as HTMLElement);
    if (front) {
      e.style.animation = `${styles[`tf_front_${axis}`]} ${(duration || 0) / 1000}s linear`
    } else if (_front && !front) {
      e.style.animation = `${styles[`tf_back_${axis}`]} ${(duration || 0) / 1000}s linear`;
    }
  }
  componentDidMount() {
    let _front = document.getElementsByClassName(`${styles.front}`)[0] as HTMLElement;
    // this.setParentSize(_front.parentElement, _front.offsetWidth, _front.offsetHeight);
    _front && (_front.style.transform = "rotateY(0)");
  }
  render() {
    const { className, front, back, children } = this.props;
    return (
      <figure className={`${styles.figure} ${front && styles.front} ${back && styles.back} ${className}`}>{children}</figure>
    )
  }
}

polyfill(FlipCardItem)

export default FlipCardItem;