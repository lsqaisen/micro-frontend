import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty'

export default ({ style, ...props }: EmptyProps) => (
  <div style={{ width: '100%', height: 240, position: 'relative' }}>
    <Empty style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)', ...style }} {...props} />
  </div>
)