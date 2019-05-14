import { PureComponent } from 'react';
import { getMetricsRequest } from '@/services/metric';

export interface BasicProps extends getMetricsRequest {
  total?: number;
  used?: number;
  data?: any[];
  dispatch?: Function,
}

export default <T extends BasicProps>(Chart: React.ComponentClass<T, any>) => {
  return class extends PureComponent<T, any> {
    static readonly defaultProps = {
      dur: 60 * 10,
      step: 5,
      total: 0,
      used: 0,
      data: [],
    }
    state = {
      loading: false,
    }
    timeHandle: NodeJS.Timeout | undefined = undefined;
    metric = (props?: T) => {
      const { name, step, dur, type, dispatch } = props || this.props;
      this.setState({ loading: true });
      if (Array.isArray(type)) {
        return Promise.all(type.map(t => new Promise(async (resolve, reject) => {
          let data: getMetricsRequest = { name, step, dur, type: t };
          await dispatch!({
            type: 'node/metric',
            payload: data,
          })
          resolve();
        }))).then(() => {
          this.setState({ loading: false })
        })
      } else {
        let data: getMetricsRequest = { name, step, dur, type };
        return dispatch!({
          type: 'node/metric',
          payload: data,
        }).then(() => {
          this.setState({ loading: false })
        })
      }
    }
    interval = (step: number) => {
      if (this.timeHandle) clearInterval(this.timeHandle);
      this.timeHandle = setInterval(() => {
        if (!this.state.loading) this.metric();
      }, step! * 1000)
    }
    UNSAFE_componentWillReceiveProps(props: T) {
      const { name, step, dur, type } = props;
      const { name: _name, step: _step, dur: _dur, type: _type } = this.props;
      if (name !== _name || step !== _step || dur !== _dur || JSON.stringify(type) !== JSON.stringify(_type)) {
        this.metric(props);
        this.interval(Number(step!));
      }
    }
    componentWillUnmount() {
      if (this.timeHandle) {
        clearInterval(this.timeHandle);
        this.timeHandle = undefined;
      }
    }
    componentDidMount() {
      this.metric(this.props)
      const { step } = this.props;
      this.interval(Number(step!));
    }
    render() {
      const { dur } = this.props;
      let timeMask = 'm:s';
      if (dur <= 3600) {
        timeMask = 'm:s';
      } else if (dur <= 3600 * 24) {
        timeMask = 'H:m';
      } else if (dur <= 3600 * 24 * 7) {
        timeMask = 'D日H时';
      }
      return (
        <Chart timeMask={timeMask}  {...this.props} />
      )
    }
  }
}