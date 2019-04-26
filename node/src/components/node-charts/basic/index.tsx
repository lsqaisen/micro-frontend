import { PureComponent, Component } from 'react';
import debounce from 'lodash.debounce';
import { DataType } from '@/components/charts/simple';
import { getMetricsRequest } from '@/services/metric';

export interface BasicProps {
  total?: number;
  used?: number;
  name: string;
  step?: number;
  dur?: number;
  type: string;
  data?: DataType[];
}

class Basic<T1, T2> extends (PureComponent || Component)<T1, T2> {
  static readonly defaultProps = {
    dur: 60 * 10,
    step: 5,
    total: 0,
    used: 0,
    data: [],
  }
  static timeHandle: NodeJS.Timeout | undefined = undefined;
  static metric = ({ name, step, dur, type, dispatch }: any) => {
    let data: getMetricsRequest = { name, step, dur, type };
    return dispatch({
      type: 'node/metric',
      payload: data
    }).then(() => Basic.timeHandle = setTimeout(debounce(
      () => Basic.metric({ name, step, dur, type, dispatch }),
      step * 1000,
      { leading: true, trailing: false }
    ), step * 1000))
  }
  constructor(props: any) {
    super(props);
    Basic.metric(props);
  }
  componentWillUnmount() {
    if (Basic.timeHandle) {
      clearTimeout(Basic.timeHandle);
      Basic.timeHandle = undefined;
    }
  }
}

export default Basic;