import { PureComponent, Component } from 'react';
import { Tooltip } from 'antd';

class EllipsisTooltip extends (PureComponent || Component)<any, any> {
  state = {
    visible: false
  }
  handleVisibleChange = (visible) => {
    if (this.container.clientWidth < this.container.scrollWidth) {
      this.setState({
        visible: visible
      })
    }
  }
  render() {
    return (
      <Tooltip visible={this.state.visible} onVisibleChange={this.handleVisibleChange} title={this.props.title}>
        <div ref={node => this.container = node} style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}>{this.props.children}</div>
      </Tooltip>
    )
  }
}

export default EllipsisTooltip;