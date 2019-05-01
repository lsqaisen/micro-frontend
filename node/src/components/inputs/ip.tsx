import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import Inputmask from 'inputmask';

class IPInput extends PureComponent<any, any> {
  componentDidMount() {
    Inputmask({ alias: 'ip', placeholder: " " }).mask(ReactDOM.findDOMNode(this))
  }
  render() {
    return (
      <Input {...this.props} />
    )
  }
}

export default IPInput;