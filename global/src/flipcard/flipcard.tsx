import * as React from 'react';
import ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import Item from './flipcard-item';
import styles from './style/index.less';

const { PureComponent, Component } = React;

const AxisTypes = ['left', 'right', 'center'];
type AxisType = (typeof AxisTypes)[number]
export type FlipCardProps = {
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  axis?: AxisType;
  defaultFlipKey?: string;
  flipKey?: string;
}

type FlipCardState = {
  animation: boolean;
  back?: string | undefined;
  front?: string | undefined;
}

class FlipCard extends (PureComponent || Component)<FlipCardProps, FlipCardState> {
  static Item: typeof Item;
  static defaultProps = {
    axis: 'center',
    duration: 1000,
  }
  constructor(props: FlipCardProps) {
    super(props);
    this.state = {
      animation: false,
      back: undefined,
      front: props.defaultFlipKey || props.flipKey,
    }
  }

  flip = (back: string | undefined, front: string | undefined) => {
    const { duration } = this.props;
    const { animation } = this.state;
    !animation && this.setState({
      animation: true,
      back,
      front,
    }, () => {
      setTimeout(() => { this.setState({ animation: false }) }, duration)
    })
  }

  componentWillReceiveProps(nextProps: FlipCardProps) {
    if (this.state.front !== nextProps.flipKey) {
      this.flip(this.state.front, nextProps.flipKey)
    }
  }

  componentDidMount() {
    console.log(3)
  }

  render() {
    const { className, duration, axis, style, children } = this.props;
    const { back, front } = this.state;
    return (
      <section
        className={`${styles.flip_box} ${styles[`flip_${axis}`]} `}
        style={{ ...(style || {}) }}
      >
        {React.Children.map(children, (child: any, i) => {
          return React.cloneElement(child, {
            ref: `${child.key || i}`,
            duration,
            axis,
            style: { marginTop: `-${100 * i}%` },
            front: `${child.key || i}` === front,
            back: `${child.key || i}` === back,
          })
        })}
      </section>
    )
  }
}

polyfill(FlipCard)

export default FlipCard;