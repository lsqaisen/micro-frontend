import { PureComponent } from 'react';
import * as reqwest from 'reqwest';
import SearchSelect, { SearchSelectProps } from './index';


const fakeDataUrl = 'https://randomuser.me/api/?results=2&inc=name,gender,email,nat&noinfo';

class Test extends PureComponent<SearchSelectProps, any> {
  fetchData = (page: number, callback: any) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res: any) => {
        callback({
          results: res.results.map((v: any) => ({ value: v.email, label: v.email, key: v.email })),
          total: 10,
        });
      },
    });
  };

  render() {
    return (
      <SearchSelect
        threshold={10}
        style={{ width: 180 }}
        height={60}
        asyncSearch={this.fetchData}
        placeholder="xxxxx"
      />
    )
  }
}

export default Test;