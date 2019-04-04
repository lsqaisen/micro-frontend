import { Component, PureComponent } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Progress } from 'antd';
import { ProgressProps } from 'antd/lib/progress';

export type ProgressP = {
  show?: boolean | undefined;
  statusType?: string | undefined;
} & ProgressProps

export default class extends (Component || PureComponent)<ProgressP, any> {

  timeHandle: any = null;

  constructor(props: ProgressP) {
    super(props);
    this.state = {
      show: false,
      progress: (props.percent || 0) * 100,
    }
  }

  random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onprogress = () => {
    let { progress } = this.state;
    let timeout = this.random(progress - 6000 <= 0 ? 1000 : progress - 6000, progress - 5000 <= 0 ? 2000 : progress - 5000);
    this.timeHandle = setTimeout(() => {
      if (progress <= 3000) {
        progress += this.random(300, 500);
      } else if (progress <= 5000) {
        progress += this.random(200, 300);
      } else if (progress <= 8000) {
        progress += this.random(100, 200);
      } else if (progress < 9000) {
        progress += this.random(10, 100);
      } else if (progress < 9900) {
        progress += this.random(1, 10);
      } else {
        progress = 9900;
      }
      this.setState({ progress }, this.onprogress);
    }, timeout);
  };
  UNSAFE_componentWillReceiveProps({ show, statusType }: ProgressP) {
    if (this.props.statusType !== statusType && statusType !== 'active' && statusType !== 'inactive') {
      if (!!this.timeHandle) clearTimeout(this.timeHandle);
      this.setState({
        progress: 0,
        show: true
      }, this.onprogress);
    }
    if (this.props.statusType !== statusType && (statusType === 'active' || statusType === 'inactive')) {
      if (!!this.timeHandle) clearTimeout(this.timeHandle);
      this.setState({
        progress: 10000,
      }, () => setTimeout(() => this.setState({ show: false }), 2000))
    }
  }
  componentDidMount() {
    if (this.props.statusType !== 'active' && this.props.statusType !== 'inactive') {
      if (!!this.timeHandle) clearTimeout(this.timeHandle);
      this.setState({
        progress: this.random(3000, 7000),
        show: true
      }, this.onprogress);
    }
  }
  render() {
    const { show } = this.state;
    return (
      <QueueAnim type="alpha" duration={2000} animConfig={[{ opacity: [.2, 0] }, { opacity: [.2, 0] }]}>
        {show && <Progress key="progress" percent={this.state.progress / 100} />}
      </QueueAnim>
    )
  }
}