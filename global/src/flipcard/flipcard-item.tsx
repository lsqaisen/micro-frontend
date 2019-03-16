import { PureComponent, Component } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import * as ReactDOM from 'react-dom';
import styles from './style/index.less';
console.log(styles)

const AxisTypes = ['left', 'right', 'center'];
type AxisType = (typeof AxisTypes)[number]
export type FlipCardItemProps = {
  duration?: number;
  axis?: string;
  front?: boolean;
  back?: boolean;
  flipTimes?: number;
}

class FlipCardItem extends (PureComponent || Component)<FlipCardItemProps, any> {
  componentWillReceiveProps({ front, duration, axis }: FlipCardItemProps) {
    const { front: _front } = this.props;
    if (front) {
      (ReactDOM.findDOMNode(this) as HTMLElement).style.animation = `${styles[`tf_front_${axis}`]} ${(duration || 0) / 1000}s linear`
    } else if (_front && !front) {
      (ReactDOM.findDOMNode(this) as HTMLElement).style.animation = `${styles[`tf_back_${axis}`]} ${(duration || 0) / 1000}s linear`;
    }
  }
  componentDidMount() {
    let _front = document.getElementsByClassName(`${styles.front}`)[0] as HTMLElement;
    _front && (_front.style.transform = "rotateY(0)");
  }
  render() {
    const { front, back, style, children } = this.props;
    return (
      <figure className={`${styles.figure} ${front && styles.front} ${back && styles.back}`} style={style}>{children}</figure>
    )
  }
}

polyfill(FlipCardItem)

export default FlipCardItem;