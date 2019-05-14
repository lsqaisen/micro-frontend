import * as React from 'react';
import Media from 'react-media';
import Layout from '@/components/global/layout';

export default class extends React.PureComponent {
  state = {
    init: false,
    _init: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ init: true })
    }, 2000)
    setTimeout(() => {
      this.setState({ _init: true })
    }, 4000)

    const loader = document.getElementById('loader');
    if (loader) loader.remove();
  }
  render() {
    const { init, _init } = this.state;
    return (
      <Media
        query="(min-width: 599px)"
        children={(matches) => (
          <Layout
            width={226}
            level={0}
            matches={!matches}
            state={init ? 'centent' : 'initially'}
            sider={<div>
              sfsfsdfdgfs
              sider
            </div>}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Layout
                level={1}
                top={128}
                width={210}
                matches={!matches}
                state={_init ? 'centent' : 'initially'}
                sider={<div>
                  4332222
                  sider333333
                </div>}
              >
                <div>asdfasdfasdf</div>
              </Layout>
            </div>
          </Layout>
        )}
      />
    )
  }
} 